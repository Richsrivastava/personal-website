import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

const articlesDir = path.join(process.cwd(), "content/articles");
const poemsDir = path.join(process.cwd(), "content/poems");

export interface ArticleMeta {
  slug: string;
  title: string;
  topic: string;
  publishedDate: string;
  linkedInPostUrl: string | null;
  summary: string;
}

export interface Article extends ArticleMeta {
  contentHtml: string;
}

export interface PoemMeta {
  slug: string;
  title: string;
  topic: string;
}

export interface Poem extends PoemMeta {
  contentHtml: string;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}

export async function getAllArticles(): Promise<ArticleMeta[]> {
  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));
  const articles = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(articlesDir, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title as string,
      topic: data.topic as string,
      publishedDate: data.publishedDate as string,
      linkedInPostUrl: (data.linkedInPostUrl as string | null) ?? null,
      summary: data.summary as string,
    };
  });

  return articles.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
}

export async function getArticle(slug: string): Promise<Article | null> {
  const fullPath = path.join(articlesDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const contentHtml = await markdownToHtml(content);
  return {
    slug,
    title: data.title as string,
    topic: data.topic as string,
    publishedDate: data.publishedDate as string,
    linkedInPostUrl: (data.linkedInPostUrl as string | null) ?? null,
    summary: data.summary as string,
    contentHtml,
  };
}

export async function getAllPoems(): Promise<PoemMeta[]> {
  const files = fs.readdirSync(poemsDir).filter((f) => f.endsWith(".md"));
  return files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(poemsDir, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title as string,
      topic: data.topic as string,
    };
  });
}

export async function getPoem(slug: string): Promise<Poem | null> {
  const fullPath = path.join(poemsDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const contentHtml = await markdownToHtml(content);
  return {
    slug,
    title: data.title as string,
    topic: data.topic as string,
    contentHtml,
  };
}
