import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPoems, getPoem } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const poems = await getAllPoems();
  return poems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const poem = await getPoem(slug);
  if (!poem) return {};
  return {
    title: poem.title,
    description: `A poem by Richa Srivastava.`,
  };
}

export default async function PoemPage({ params }: Props) {
  const { slug } = await params;
  const poem = await getPoem(slug);
  if (!poem) notFound();

  return (
    <>
      <Link href="/poetry" className="back-link">
        ← Poetry
      </Link>
      <div className="article-header">
        <h1>{poem.title}</h1>
        {poem.topic && (
          <div className="article-meta">
            <span>{poem.topic}</span>
          </div>
        )}
      </div>
      <div
        className="poem-body"
        dangerouslySetInnerHTML={{ __html: poem.contentHtml }}
      />
    </>
  );
}
