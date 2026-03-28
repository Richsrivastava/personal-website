import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticle } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
    },
  };
}

function formatDate(publishedDate: string): string {
  const [year, month] = publishedDate.split("-");
  if (!month) return year;
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <Link href="/writing" className="back-link">
        ← Writing
      </Link>
      <div className="article-header">
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span>{formatDate(article.publishedDate)}</span>
          {article.topic && <span>{article.topic}</span>}
        </div>
      </div>
      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />
      {article.linkedInPostUrl && (
        <div className="linkedin-cta">
          <p>
            Continue the conversation on{" "}
            <a
              href={article.linkedInPostUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      )}
    </>
  );
}
