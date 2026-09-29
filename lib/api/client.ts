// Reading from the BROKA API, from the server. The website is read-only: it
// only ever issues GET requests to public endpoints, so there is nothing to
// authenticate and no secret in this file. Responses are cached for
// `revalidate` seconds, so a page shared into a busy group costs the API one
// request a minute, not one per visitor.
//
// Never import this from a client component: the fetches are meant to run on
// the server, where the cache lives and the API's address is not exposed.

/**
 * The BROKA API (the Azure Container App). Render (broka-dbjd.onrender.com)
 * stays up as a fallback; switch to it with BROKA_API_URL, a redeploy and no
 * code change. Same defaults as the store front end in the main repository.
 */
export const API_URL = (
  process.env.BROKA_API_URL?.trim() ||
  "https://broka-api.redhill-7a4b8acc.southafricanorth.azurecontainerapps.io"
).replace(/\/+$/, "");

/** The API answered with an error, or did not answer at all. */
export class ApiUnavailableError extends Error {
  constructor(readonly status: number | null, message: string) {
    super(message);
    this.name = "ApiUnavailableError";
  }
}

// A sleeping free-tier host can take a while on the first request after a nap.
const TIMEOUT_MS = 20_000;

export const REVALIDATE_SECONDS = 60;

/**
 * GET a JSON path from the API. Returns null for a 404 (the thing does not
 * exist), throws ApiUnavailableError for any other failure so a page can tell
 * "not found" apart from "the API is down".
 */
export async function apiGet<T>(
  path: string,
  { revalidate = REVALIDATE_SECONDS, tags = [] }: { revalidate?: number; tags?: string[] } = {},
): Promise<T | null> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate, tags },
    });
  } catch (err) {
    throw new ApiUnavailableError(null, `BROKA API unreachable: ${(err as Error).message}`);
  }
  if (res.status === 404) return null;
  if (!res.ok) throw new ApiUnavailableError(res.status, `BROKA API ${res.status} for ${path}`);
  try {
    return (await res.json()) as T;
  } catch {
    throw new ApiUnavailableError(res.status, `BROKA API returned unreadable data for ${path}`);
  }
}

/** Runs `load`; on an API failure returns `fallback` instead of throwing. */
export async function orFallback<T>(load: () => Promise<T>, fallback: T): Promise<{ data: T; failed: boolean }> {
  try {
    return { data: await load(), failed: false };
  } catch (err) {
    if (err instanceof ApiUnavailableError) return { data: fallback, failed: true };
    throw err;
  }
}
