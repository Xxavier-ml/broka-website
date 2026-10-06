export function categoryArtworkSources(image?: string) {
  if (!image) return null;

  const base = image.replace(/\.jpg$/, "");
  const stem = base.split("/").pop();
  const directory = base.replace(/\/[^/]+$/, "/webp");
  if (!stem) return { fallback: image, srcSet: undefined };

  return {
    fallback: image,
    srcSet: `${directory}/${stem}-320.webp 320w, ${directory}/${stem}-640.webp 640w, ${directory}/${stem}-1024.webp 1024w`,
  };
}
