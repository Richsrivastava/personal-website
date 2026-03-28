import type { Metadata } from "next";
import Link from "next/link";
import { getAllPoems, PoemMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Poetry",
  description: "Poems in English and Hindi by Richa Srivastava.",
};

export default async function PoetryPage() {
  const poems = await getAllPoems();

  const grouped = poems.reduce<Record<string, PoemMeta[]>>((acc, poem) => {
    const topic = poem.topic || "Uncategorized";
    if (!acc[topic]) acc[topic] = [];
    acc[topic].push(poem);
    return acc;
  }, {});

  const sortedTopics = Object.keys(grouped).sort();

  return (
    <>
      <h1 className="page-title">Poetry</h1>
      {sortedTopics.map((topic) => (
        <div key={topic} className="poem-group">
          <p className="poem-group-title">{topic}</p>
          <ul className="content-list">
            {grouped[topic].map((poem) => (
              <li key={poem.slug}>
                <Link href={`/poetry/${poem.slug}`}>
                  <p className="item-title">{poem.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
