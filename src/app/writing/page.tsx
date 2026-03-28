import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on enterprise AI, engineering leadership, and technology strategy by Richa Srivastava.",
};

function formatDate(publishedDate: string): string {
  const [year, month] = publishedDate.split("-");
  if (!month) return year;
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default async function WritingPage() {
  const articles = await getAllArticles();

  return (
    <>
      <h1 className="page-title">Writing</h1>
      <ul className="content-list">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/writing/${article.slug}`}>
              <p className="item-title">{article.title}</p>
              <p className="item-summary">{article.summary}</p>
              <p className="item-meta">
                {formatDate(article.publishedDate)}
                {article.topic ? ` · ${article.topic}` : ""}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
