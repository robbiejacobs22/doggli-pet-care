/**
 * Renders a JSON-LD <script>. Server-rendered so crawlers see it in the
 * initial HTML. Accepts a plain object (or array of objects).
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD content is trusted, generated from our own data modules.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
