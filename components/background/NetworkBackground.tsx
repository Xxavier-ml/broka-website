"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";

/**
 * BROKA's living network, in real 3D, behind every page.
 *
 * Nodes float in a volume in front of a perspective camera, so near ones are
 * larger, brighter and move faster than far ones. Links fade with distance,
 * "deals" travel along them as bright packets and ring the node they reach,
 * hubs breathe, and a starfield sits far behind. The camera sways toward the
 * pointer and flies down through the network as the page scrolls.
 *
 * Raw WebGL rather than a 3D library: this runs on every page, and three.js
 * would add ~170 KB of download on phones for what is two shaders and three
 * buffers. The canvas paints its own indigo nebula (opaque), so the additive
 * glow never depends on how a browser composites a transparent canvas.
 *
 * Cheap by construction: node counts scale with the screen, the maths is a
 * few thousand multiplications a frame, the loop stops while the tab is
 * hidden, and under prefers-reduced-motion it draws one still frame. If
 * WebGL is unavailable the CSS gradient on .netbg is the background.
 */

// ── Palette (linear-ish RGB, 0..1) ──────────────────────────────────────────
type RGB = [number, number, number];
const VIOLET: RGB = [0.6, 0.45, 1.0];
const LILAC: RGB = [0.78, 0.7, 1.0];
const BLUE: RGB = [0.35, 0.52, 1.0];
const CYAN: RGB = [0.3, 0.85, 1.0];
const ORCHID: RGB = [0.82, 0.42, 1.0];
// Weighted like the mockup: mostly violet, then blue and cyan accents.
const NODE_COLORS: RGB[] = [VIOLET, VIOLET, VIOLET, LILAC, LILAC, BLUE, BLUE, CYAN, CYAN, ORCHID];
const STAR_COLORS: RGB[] = [LILAC, LILAC, BLUE, [0.85, 0.88, 1.0]];

// ── Camera ──────────────────────────────────────────────────────────────────
const F = 1 / Math.tan((60 / 2) * (Math.PI / 180)); // vertical fov 60°
const PIVOT = 4.2; // depth the camera sways around
const Z_NEAR = 1.3;
const Z_FAR = 8.6;
const STAR_NEAR = 9.5;
const STAR_FAR = 14;
const SCROLL_TO_WORLD = 0.0017; // world units per CSS pixel scrolled

// ── Shaders ─────────────────────────────────────────────────────────────────
const NEBULA_VS = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

// The app's near-black navy sky (#010521 in the mockup), with faint violet
// and blue haze drifting in the corners. Haze is sized in units of the
// screen's SHORTER side: sized by height, a tall phone got haze wider than
// the screen and the whole page turned violet. The colour on the page is
// meant to come from the glowing network, not from the sky.
const NEBULA_FS = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uShift;
float blob(vec2 p, vec2 c, float r) { vec2 d = p - c; return exp(-dot(d, d) / (r * r)); }
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float m = min(uRes.x, uRes.y);
  vec2 span = uRes / m;              // screen size in shorter-side units
  vec2 p = uv * span + vec2(0.0, uShift);
  vec3 col = mix(vec3(0.004, 0.006, 0.040), vec3(0.010, 0.020, 0.105), smoothstep(-0.1, 1.05, uv.y));
  float t = uTime;
  col += vec3(0.22, 0.10, 0.62) * 0.15 * blob(p, vec2(0.08 * span.x + 0.04 * sin(t * 0.05), span.y * 0.96 + 0.04 * cos(t * 0.04)), 0.55);
  col += vec3(0.06, 0.16, 0.62) * 0.13 * blob(p, vec2(span.x * 0.95 + 0.05 * cos(t * 0.043), span.y * 0.14 + 0.04 * sin(t * 0.05)), 0.6);
  col += vec3(0.30, 0.12, 0.60) * 0.06 * blob(p, vec2(span.x * 0.6 + 0.07 * sin(t * 0.031), span.y * 0.55 + 0.05 * sin(t * 0.037)), 0.5);
  // Darker toward the edges, as in the mockup.
  vec2 q = (uv - 0.5) * vec2(span.x / max(span.x, span.y), span.y / max(span.x, span.y)) * 2.0;
  col *= mix(1.0, 0.55, smoothstep(0.55, 1.35, length(q)));
  gl_FragColor = vec4(col, 1.0);
}`;

// Upscales the quarter-resolution sky (linear filtering keeps it smooth) and
// dithers it, so the soft gradients do not band.
const BLIT_FS = `
precision mediump float;
uniform sampler2D uTex;
uniform vec2 uRes;
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec3 col = texture2D(uTex, uv).rgb;
  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  gl_FragColor = vec4(col + (n - 0.5) / 255.0, 1.0);
}`;

// Points: x, y (clip space), size (device px), r, g, b, intensity, kind.
const POINT_VS = `
attribute vec2 aPos;
attribute float aSize;
attribute vec4 aColor;
attribute float aKind;
varying vec4 vColor;
varying float vKind;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
  gl_PointSize = aSize;
  vColor = aColor;
  vKind = aKind;
}`;

// kind 0: a glowing node - white-hot core, coloured glow, wide faint halo.
// kind 1: an expanding ring (a packet arriving).
const POINT_FS = `
precision mediump float;
varying vec4 vColor;
varying float vKind;
void main() {
  vec2 q = gl_PointCoord * 2.0 - 1.0;
  float d = length(q);
  if (d > 1.0) discard;
  vec3 col;
  if (vKind < 0.5) {
    float core = 1.0 - smoothstep(0.0, 0.16, d);
    float glow = exp(-d * d * 9.0);
    float halo = exp(-d * 3.4) * 0.32;
    col = vColor.rgb * (glow * 1.1 + halo) + vec3(core) * 0.95;
  } else {
    float ring = 1.0 - smoothstep(0.0, 0.1, abs(d - 0.8));
    col = vColor.rgb * ring + vColor.rgb * exp(-d * d * 4.0) * 0.15;
  }
  col *= vColor.a * (1.0 - smoothstep(0.82, 1.0, d));
  gl_FragColor = vec4(col, 1.0);
}`;

// Lines are drawn as thin quads so they can be wider than 1 device pixel and
// soft-edged: x, y, r, g, b, alpha, edge (-1..1 across the width).
const LINE_VS = `
attribute vec2 aPos;
attribute vec4 aColor;
attribute float aEdge;
varying vec4 vColor;
varying float vEdge;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
  vColor = aColor;
  vEdge = aEdge;
}`;

const LINE_FS = `
precision mediump float;
varying vec4 vColor;
varying float vEdge;
void main() {
  float e = 1.0 - abs(vEdge);
  gl_FragColor = vec4(vColor.rgb * vColor.a * e * e, 1.0);
}`;

// ── Types ───────────────────────────────────────────────────────────────────
interface Node {
  x: number;
  y: number;
  z: number; // negative: in front of the camera
  vx: number;
  vy: number;
  vz: number;
  r: number; // world radius of the whole sprite
  color: RGB;
  hub: boolean;
  phase: number;
  speed: number;
  // Projected this frame.
  sx: number;
  sy: number;
  depth: number;
  scale: number; // device px per world unit at this depth
  vis: number; // 0 when behind the camera or faded out
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: RGB;
  phase: number;
}

interface Packet {
  a: number;
  b: number;
  t: number;
  speed: number;
  color: RGB;
}

interface Ring {
  node: number;
  t: number;
  color: RGB;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]!;
const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

function compile(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram | null {
  const make = (type: number, src: string) => {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const v = make(gl.VERTEX_SHADER, vs);
  const f = make(gl.FRAGMENT_SHADER, fs);
  const p = gl.createProgram();
  if (!v || !f || !p) return null;
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.linkProgram(p);
  return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
}

export function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // the CSS gradient stays as the background

    const nebula = compile(gl, NEBULA_VS, NEBULA_FS);
    const points = compile(gl, POINT_VS, POINT_FS);
    const lines = compile(gl, LINE_VS, LINE_FS);
    const blit = compile(gl, NEBULA_VS, BLIT_FS);
    if (!nebula || !points || !lines || !blit) return;

    // The sky is soft and moves slowly: draw it at quarter resolution into a
    // texture, refresh that every few frames, and stretch it over the screen.
    // Full-resolution per frame was the single biggest cost on weak GPUs.
    const skyTex = gl.createTexture();
    const skyFbo = gl.createFramebuffer();
    let skyW = 0;
    let skyH = 0;
    let skyAge = 99;
    canvas.dataset.ready = "1";

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const pointBuf = gl.createBuffer();
    const lineBuf = gl.createBuffer();

    const loc = {
      nPos: gl.getAttribLocation(nebula, "aPos"),
      nRes: gl.getUniformLocation(nebula, "uRes"),
      nTime: gl.getUniformLocation(nebula, "uTime"),
      nShift: gl.getUniformLocation(nebula, "uShift"),
      bPos: gl.getAttribLocation(blit, "aPos"),
      bTex: gl.getUniformLocation(blit, "uTex"),
      bRes: gl.getUniformLocation(blit, "uRes"),
      pPos: gl.getAttribLocation(points, "aPos"),
      pSize: gl.getAttribLocation(points, "aSize"),
      pColor: gl.getAttribLocation(points, "aColor"),
      pKind: gl.getAttribLocation(points, "aKind"),
      lPos: gl.getAttribLocation(lines, "aPos"),
      lColor: gl.getAttribLocation(lines, "aColor"),
      lEdge: gl.getAttribLocation(lines, "aEdge"),
    };

    const maxPointSize = (gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE) as Float32Array)[1] || 64;

    type Nav = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    const nav = navigator as Nav;
    const lowPower =
      nav.connection?.saveData === true ||
      (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2) ||
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2);
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    // ── State ───────────────────────────────────────────────────────────────
    let W = 0; // device px
    let H = 0;
    let cssW = 0;
    let dpr = 1;
    let aspect = 1;
    let XR = 6; // half-width of the node volume, world units
    let YR = 5.4;
    let SXR = 9;
    let SYR = 8.6;
    let linkDist = 1.3;
    let nodes: Node[] = [];
    let stars: Star[] = [];
    const packets: Packet[] = [];
    const rings: Ring[] = [];
    let links: number[] = []; // flat pairs of node indices, rebuilt each frame
    let pointData = new Float32Array(0);
    let lineData = new Float32Array(0);
    let maxPackets = 10;
    let spriteCap = 180; // device px; set per screen in sizeCanvas

    let camX = 0;
    let camY = 0;
    let camYTarget = 0;
    let yaw = 0;
    let pitch = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, px: -1, py: -1, on: false };
    let time = 0;
    let spawnIn = 0.6;
    let raf = 0;
    let running = false;
    let last = 0;

    function sizeCanvas() {
      const rect = canvas!.getBoundingClientRect();
      cssW = rect.width || window.innerWidth;
      const cssH = rect.height || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, cssW < 760 ? 1.5 : 1.75, lowPower ? 1 : 3);
      W = Math.max(1, Math.round(cssW * dpr));
      H = Math.max(1, Math.round(cssH * dpr));
      // Assigning a canvas size, even the same one, clears it; phones fire
      // resize whenever the address bar moves, so only resize on a change.
      if (canvas!.width !== W) canvas!.width = W;
      if (canvas!.height !== H) canvas!.height = H;
      gl!.viewport(0, 0, W, H);
      const sw = Math.max(1, Math.round(W / 4));
      const sh = Math.max(1, Math.round(H / 4));
      if (sw !== skyW || sh !== skyH) {
        skyW = sw;
        skyH = sh;
        gl!.bindTexture(gl!.TEXTURE_2D, skyTex);
        gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, skyW, skyH, 0, gl!.RGBA, gl!.UNSIGNED_BYTE, null);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, skyFbo);
        gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, skyTex, 0);
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
        skyAge = 99;
      }
      aspect = W / H;
      spriteCap = 110 * dpr;
      const halfTanH = 1 / F;
      XR = Z_FAR * halfTanH * aspect + 1.4;
      YR = Z_FAR * halfTanH + 1.6;
      SXR = STAR_FAR * halfTanH * aspect + 1;
      SYR = STAR_FAR * halfTanH + 2;
    }

    function populate() {
      const small = cssW < 760;
      let count = small ? 175 : cssW < 1200 ? 200 : 250;
      let starCount = small ? 150 : 300;
      if (lowPower) {
        count = Math.round(count * 0.55);
        starCount = Math.round(starCount * 0.5);
      }
      linkDist = small ? 1.4 : 1.5;
      maxPackets = small ? 6 : lowPower ? 5 : 12;

      nodes = Array.from({ length: count }, () => {
        const hub = Math.random() < 0.12;
        // Biased toward mid-far depths: many small nodes, a few big near ones.
        const depth = Z_NEAR + 0.4 + (Z_FAR - Z_NEAR - 0.4) * Math.pow(Math.random(), 0.75);
        return {
          x: rand(-XR, XR),
          y: rand(-YR, YR),
          z: -depth,
          vx: rand(-0.06, 0.06),
          vy: rand(-0.05, 0.05),
          vz: rand(-0.05, 0.05),
          // A little larger on phones, where the same world size reads as specks.
          r: (hub ? rand(0.2, 0.3) : rand(0.07, 0.12)) * (small ? 1.2 : 1),
          color: hub ? pick([VIOLET, LILAC, VIOLET, CYAN]) : pick(NODE_COLORS),
          hub,
          phase: rand(0, Math.PI * 2),
          speed: rand(0.6, 1.6),
          sx: 0,
          sy: 0,
          depth,
          scale: 1,
          vis: 1,
        };
      });
      stars = Array.from({ length: starCount }, () => ({
        x: rand(-SXR, SXR),
        y: rand(-SYR, SYR),
        z: -rand(STAR_NEAR, STAR_FAR),
        size: rand(1.2, 2.8),
        color: pick(STAR_COLORS),
        phase: rand(0, Math.PI * 2),
      }));
      packets.length = 0;
      rings.length = 0;

      const maxPoints = count + starCount + maxPackets + 24 + 2;
      pointData = new Float32Array(maxPoints * 8);
      // links + packet trails + pointer links, 6 vertices of 7 floats each
      lineData = new Float32Array((1600 + maxPackets + 10) * 6 * 7);
    }

    /** World -> screen for the current camera. Writes into the node. */
    const cosSin = { cy: 1, sy: 0, cp: 1, sp: 0 };
    function project(x: number, y: number, z: number, out: { sx: number; sy: number; depth: number; scale: number }) {
      const rx = x - camX;
      const ry = y - camY;
      const rz = z + PIVOT;
      const x1 = rx * cosSin.cy + rz * cosSin.sy;
      const z1 = -rx * cosSin.sy + rz * cosSin.cy;
      const y1 = ry * cosSin.cp - z1 * cosSin.sp;
      const z2 = ry * cosSin.sp + z1 * cosSin.cp;
      const depth = PIVOT - z2;
      out.depth = depth;
      if (depth < 0.2) return false;
      out.sx = (x1 * F) / depth / aspect;
      out.sy = (y1 * F) / depth;
      out.scale = (F * (H / 2)) / depth;
      return true;
    }

    // ── Simulation ──────────────────────────────────────────────────────────
    function step(dt: number) {
      time += dt;
      // Camera: scroll flies down through the volume; pointer and a slow idle
      // sway turn it a little, which is what makes the depth readable.
      camY += (camYTarget - camY) * (1 - Math.pow(0.0005, dt));
      pointer.x += (pointer.tx - pointer.x) * (1 - Math.pow(0.02, dt));
      pointer.y += (pointer.ty - pointer.y) * (1 - Math.pow(0.02, dt));
      const yawT = pointer.x * 0.14 + Math.sin(time * 0.07) * 0.06;
      const pitchT = -pointer.y * 0.09 + Math.sin(time * 0.053 + 1.3) * 0.035;
      yaw += (yawT - yaw) * (1 - Math.pow(0.05, dt));
      pitch += (pitchT - pitch) * (1 - Math.pow(0.05, dt));
      camX = Math.sin(time * 0.041) * 0.25;

      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.z += n.vz * dt;
        if (n.x < -XR) n.x += 2 * XR;
        else if (n.x > XR) n.x -= 2 * XR;
        // Keep the volume centred on the camera as it scrolls: wrap in y.
        if (n.y < camY - YR) n.y += 2 * YR;
        else if (n.y > camY + YR) n.y -= 2 * YR;
        if (n.z > -Z_NEAR) n.z = -Z_FAR;
        else if (n.z < -Z_FAR) n.z = -Z_NEAR;
      }
      for (const s of stars) {
        if (s.y < camY - SYR) s.y += 2 * SYR;
        else if (s.y > camY + SYR) s.y -= 2 * SYR;
      }

      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]!;
        p.t += p.speed * dt;
        if (p.t >= 1) {
          rings.push({ node: p.b, t: 0, color: p.color });
          packets.splice(i, 1);
        }
      }
      for (let i = rings.length - 1; i >= 0; i--) {
        rings[i]!.t += dt / 1.5;
        if (rings[i]!.t >= 1) rings.splice(i, 1);
      }
      spawnIn -= dt;
      if (spawnIn <= 0 && packets.length < maxPackets && links.length) {
        spawnIn = rand(0.18, 0.6);
        const k = Math.floor(Math.random() * (links.length / 2)) * 2;
        const flip = Math.random() < 0.5;
        const a = links[flip ? k + 1 : k]!;
        const b = links[flip ? k : k + 1]!;
        if (nodes[a]!.vis > 0.3 && nodes[b]!.vis > 0.3) {
          packets.push({ a, b, t: 0, speed: rand(0.35, 0.75), color: pick([CYAN, LILAC, VIOLET, CYAN]) });
        }
      }
    }

    // ── Drawing ─────────────────────────────────────────────────────────────
    let pc = 0; // floats written into pointData
    let lc = 0; // floats written into lineData
    function pushPoint(x: number, y: number, size: number, c: RGB, a: number, kind: number) {
      if (pc + 8 > pointData.length || a <= 0.003) return;
      pointData[pc++] = x;
      pointData[pc++] = y;
      pointData[pc++] = Math.min(size, maxPointSize, spriteCap);
      pointData[pc++] = c[0];
      pointData[pc++] = c[1];
      pointData[pc++] = c[2];
      pointData[pc++] = a;
      pointData[pc++] = kind;
    }
    function pushLine(
      x0: number, y0: number, x1: number, y1: number,
      c0: RGB, c1: RGB, a0: number, a1: number, halfWidthPx: number,
    ) {
      if (lc + 42 > lineData.length) return;
      // Normal in pixel space, converted back to clip space.
      const dxp = (x1 - x0) * W;
      const dyp = (y1 - y0) * H;
      const len = Math.hypot(dxp, dyp) || 1;
      const nx = ((-dyp / len) * halfWidthPx * 2) / W;
      const ny = ((dxp / len) * halfWidthPx * 2) / H;
      const v = (x: number, y: number, c: RGB, a: number, e: number) => {
        lineData[lc++] = x;
        lineData[lc++] = y;
        lineData[lc++] = c[0];
        lineData[lc++] = c[1];
        lineData[lc++] = c[2];
        lineData[lc++] = a;
        lineData[lc++] = e;
      };
      v(x0 + nx, y0 + ny, c0, a0, 1);
      v(x0 - nx, y0 - ny, c0, a0, -1);
      v(x1 + nx, y1 + ny, c1, a1, 1);
      v(x1 + nx, y1 + ny, c1, a1, 1);
      v(x0 - nx, y0 - ny, c0, a0, -1);
      v(x1 - nx, y1 - ny, c1, a1, -1);
    }

    /** How visible something at this depth is: fades in from the near plane and out into the fog. */
    const depthFade = (d: number) => smooth(Z_NEAR - 0.2, Z_NEAR + 0.9, d) * (1 - smooth(Z_FAR - 2.2, Z_FAR, d) * 0.85);

    const tmp = { sx: 0, sy: 0, depth: 0, scale: 0 };
    function draw() {
      cosSin.cy = Math.cos(yaw);
      cosSin.sy = Math.sin(yaw);
      cosSin.cp = Math.cos(pitch);
      cosSin.sp = Math.sin(pitch);

      for (const n of nodes) {
        if (!project(n.x, n.y, n.z, tmp)) {
          n.vis = 0;
          continue;
        }
        n.sx = tmp.sx;
        n.sy = tmp.sy;
        n.depth = tmp.depth;
        n.scale = tmp.scale;
        const onScreen = Math.abs(n.sx) < 1.25 && Math.abs(n.sy) < 1.25;
        n.vis = onScreen ? depthFade(n.depth) : 0;
      }

      // Pointer in clip space, and how strongly each node is lit by it.
      const pxClip = pointer.on ? (pointer.px / cssW) * 2 - 1 : -9;
      const pyClip = pointer.on ? 1 - (pointer.py / (H / dpr)) * 2 : -9;
      const litRadius = 170 * dpr; // device px

      // Links.
      links = [];
      lc = 0;
      const L2 = linkDist * linkDist;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        if (a.vis <= 0) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          if (b.vis <= 0) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 >= L2) continue;
          links.push(i, j);
          const f = 1 - Math.sqrt(d2) / linkDist;
          const alpha = Math.pow(f, 1.1) * 0.95 * Math.min(a.vis, b.vis);
          const near = 1 - smooth(1.5, 7, (a.depth + b.depth) / 2);
          pushLine(a.sx, a.sy, b.sx, b.sy, a.color, b.color, alpha, alpha, (1.0 + near * 1.3) * dpr);
        }
      }

      // Pointer joins the mesh (mouse only).
      if (pointer.on) {
        for (const n of nodes) {
          if (n.vis <= 0.2) continue;
          const dxp = ((n.sx - pxClip) * W) / 2;
          const dyp = ((n.sy - pyClip) * H) / 2;
          const d = Math.hypot(dxp, dyp);
          if (d < litRadius) {
            const f = 1 - d / litRadius;
            pushLine(pxClip, pyClip, n.sx, n.sy, LILAC, n.color, f * 0.1, f * 0.55 * n.vis, 0.9 * dpr);
          }
        }
      }

      // Packet trails.
      const lerp3 = (a: Node, b: Node, t: number) => {
        project(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t, tmp);
        return { x: tmp.sx, y: tmp.sy, scale: tmp.scale, depth: tmp.depth };
      };
      const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      const heads: { x: number; y: number; scale: number; depth: number; color: RGB; vis: number }[] = [];
      for (const p of packets) {
        const a = nodes[p.a]!;
        const b = nodes[p.b]!;
        const vis = Math.min(a.vis, b.vis);
        if (vis <= 0) continue;
        const e = ease(p.t);
        const head = lerp3(a, b, e);
        const tail = lerp3(a, b, Math.max(0, e - 0.22));
        pushLine(tail.x, tail.y, head.x, head.y, p.color, p.color, 0, 0.95 * vis, 1.5 * dpr);
        heads.push({ ...head, color: p.color, vis });
      }

      // Points: stars, nodes, packets, rings.
      pc = 0;
      for (const s of stars) {
        if (!project(s.x, s.y, s.z, tmp)) continue;
        if (Math.abs(tmp.sx) > 1.05 || Math.abs(tmp.sy) > 1.05) continue;
        const tw = 0.45 + 0.55 * Math.sin(time * 0.9 + s.phase) ** 2;
        pushPoint(tmp.sx, tmp.sy, s.size * 3 * dpr, s.color, 0.55 * tw, 0);
      }
      for (const n of nodes) {
        if (n.vis <= 0) continue;
        const breathe = n.hub ? 1 + 0.12 * Math.sin(time * n.speed * 1.4 + n.phase) : 1;
        const tw = 0.7 + 0.3 * Math.sin(time * n.speed + n.phase);
        let boost = 0;
        if (pointer.on) {
          const d = Math.hypot(((n.sx - pxClip) * W) / 2, ((n.sy - pyClip) * H) / 2);
          if (d < litRadius) boost = 1 - d / litRadius;
        }
        const size = 2 * n.r * n.scale * breathe * (1 + boost * 0.5);
        const intensity = (n.hub ? 1.05 : 0.8) * tw * n.vis + boost * 0.45;
        pushPoint(n.sx, n.sy, Math.max(size, 3 * dpr), n.color, intensity, 0);
      }
      for (const h of heads) {
        pushPoint(h.x, h.y, Math.max(0.34 * h.scale, 14 * dpr), h.color, 1.15 * h.vis, 0);
      }
      for (const r of rings) {
        const n = nodes[r.node]!;
        if (n.vis <= 0) continue;
        // A small ripple where a deal lands: grows a little and fades fast.
        const size = Math.min((0.12 + r.t * 0.55) * n.scale, 70 * dpr);
        pushPoint(n.sx, n.sy, size, r.color, Math.pow(1 - r.t, 1.6) * 0.8 * n.vis, 1);
      }

      // ── GL ──
      gl!.disable(gl!.BLEND);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, quad);
      if (++skyAge >= 4) {
        skyAge = 0;
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, skyFbo);
        gl!.viewport(0, 0, skyW, skyH);
        gl!.useProgram(nebula);
        gl!.enableVertexAttribArray(loc.nPos);
        gl!.vertexAttribPointer(loc.nPos, 2, gl!.FLOAT, false, 0, 0);
        gl!.uniform2f(loc.nRes, skyW, skyH);
        gl!.uniform1f(loc.nTime, time);
        gl!.uniform1f(loc.nShift, camY * 0.04);
        gl!.drawArrays(gl!.TRIANGLES, 0, 3);
        gl!.disableVertexAttribArray(loc.nPos);
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
        gl!.viewport(0, 0, W, H);
      }
      gl!.useProgram(blit);
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, skyTex);
      gl!.uniform1i(loc.bTex, 0);
      gl!.uniform2f(loc.bRes, W, H);
      gl!.enableVertexAttribArray(loc.bPos);
      gl!.vertexAttribPointer(loc.bPos, 2, gl!.FLOAT, false, 0, 0);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      gl!.disableVertexAttribArray(loc.bPos);

      gl!.enable(gl!.BLEND);
      gl!.blendFunc(gl!.ONE, gl!.ONE); // light adds up, like glow does

      if (lc > 0) {
        gl!.useProgram(lines);
        gl!.bindBuffer(gl!.ARRAY_BUFFER, lineBuf);
        gl!.bufferData(gl!.ARRAY_BUFFER, lineData.subarray(0, lc), gl!.DYNAMIC_DRAW);
        const stride = 7 * 4;
        gl!.enableVertexAttribArray(loc.lPos);
        gl!.vertexAttribPointer(loc.lPos, 2, gl!.FLOAT, false, stride, 0);
        gl!.enableVertexAttribArray(loc.lColor);
        gl!.vertexAttribPointer(loc.lColor, 4, gl!.FLOAT, false, stride, 8);
        gl!.enableVertexAttribArray(loc.lEdge);
        gl!.vertexAttribPointer(loc.lEdge, 1, gl!.FLOAT, false, stride, 24);
        gl!.drawArrays(gl!.TRIANGLES, 0, lc / 7);
        gl!.disableVertexAttribArray(loc.lPos);
        gl!.disableVertexAttribArray(loc.lColor);
        gl!.disableVertexAttribArray(loc.lEdge);
      }

      if (pc > 0) {
        gl!.useProgram(points);
        gl!.bindBuffer(gl!.ARRAY_BUFFER, pointBuf);
        gl!.bufferData(gl!.ARRAY_BUFFER, pointData.subarray(0, pc), gl!.DYNAMIC_DRAW);
        const stride = 8 * 4;
        gl!.enableVertexAttribArray(loc.pPos);
        gl!.vertexAttribPointer(loc.pPos, 2, gl!.FLOAT, false, stride, 0);
        gl!.enableVertexAttribArray(loc.pSize);
        gl!.vertexAttribPointer(loc.pSize, 1, gl!.FLOAT, false, stride, 8);
        gl!.enableVertexAttribArray(loc.pColor);
        gl!.vertexAttribPointer(loc.pColor, 4, gl!.FLOAT, false, stride, 12);
        gl!.enableVertexAttribArray(loc.pKind);
        gl!.vertexAttribPointer(loc.pKind, 1, gl!.FLOAT, false, stride, 28);
        gl!.drawArrays(gl!.POINTS, 0, pc / 8);
        gl!.disableVertexAttribArray(loc.pPos);
        gl!.disableVertexAttribArray(loc.pSize);
        gl!.disableVertexAttribArray(loc.pColor);
        gl!.disableVertexAttribArray(loc.pKind);
      }
    }

    // ── Loop ────────────────────────────────────────────────────────────────
    function frame(now: number) {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      step(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }
    function still() {
      // Reduced motion: one settled frame, no drift, no scroll flight.
      time = 12;
      draw();
    }

    let lastW = 0;
    function onResize() {
      const prevW = lastW;
      sizeCanvas();
      lastW = cssW;
      // A phone's address bar showing or hiding changes only the height:
      // keep the same nodes. A real width change (rotation, window resize)
      // repopulates for the new shape.
      if (!prevW || Math.abs(cssW - prevW) / prevW > 0.2) populate();
      if (reduced) still();
    }
    const onScroll = () => {
      if (!reduced) camYTarget = -window.scrollY * SCROLL_TO_WORLD;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.on = true;
      pointer.px = e.clientX;
      pointer.py = e.clientY;
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onLeave = () => {
      pointer.on = false;
      pointer.tx = 0;
      pointer.ty = 0;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
      delete canvas.dataset.ready;
    };

    onResize();
    onScroll();
    camY = camYTarget;
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (finePointer && !reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onLost);

    if (reduced) still();
    else {
      // Settle the simulation a little so the first frame already has packets and links.
      for (let i = 0; i < 24; i++) {
        step(0.05);
        draw();
      }
      start();
    }

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
    };
  }, [reduced]);

  return (
    <div className="netbg" aria-hidden="true">
      <canvas ref={ref} className="netbg-canvas" />
    </div>
  );
}
