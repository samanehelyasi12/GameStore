import Link from "next/link";
import type { Article } from "@/lib/types";

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article>
      <h3>
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </h3>
      <p>{article.summary}</p>
    </article>
  );
}