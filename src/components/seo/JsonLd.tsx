import type { SchemaNode } from "@/lib/seo/schema";

export function safeJsonLd(data: SchemaNode | SchemaNode[]) {
  return JSON.stringify(data).replaceAll("<", "\\u003c");
}

export function JsonLd({ data }: { data: SchemaNode | SchemaNode[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} />;
}
