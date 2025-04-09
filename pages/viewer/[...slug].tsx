import { fetchMarkdown } from "@/lib/github";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

export async function getServerSideProps({ params }: any) {
  const slug = (params.slug || []).join("/") || "index";
  const path = `docs/${slug}.md`;

  try {
    const file = await fetchMarkdown(path);
    const { content, data } = matter(file);

    return { props: { content, metadata: data } };
  } catch {
    return { notFound: true };
  }
}

export default function Page({ content, metadata }: any) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{metadata?.title || "Page"}</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
