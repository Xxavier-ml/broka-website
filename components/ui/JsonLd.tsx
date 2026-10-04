/**
 * Structured data for search engines. The JSON is escaped so that text taken
 * from a listing or store (which anyone can write) can never close the script
 * tag and inject markup: "<" becomes its unicode escape, which JSON parsers
 * read back as the same character.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
