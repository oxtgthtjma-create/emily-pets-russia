import Image from "next/image";
import Link from "next/link";
import {
  articles,
  articleDate,
  articleReadTime,
  articleTopics,
  type Article,
} from "../data/articles";
import { Arrow } from "./icons";
export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <Link
        href={"/blog/" + article.slug}
        className="article-card-image"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={article.image}
          alt=""
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 33vw"
        />
      </Link>
      <div className="article-meta">
        <span>{articleTopics[article.topic]}</span>
        <time dateTime={article.published}>
          {articleDate(article.published)}
        </time>
      </div>
      <h3>
        <Link href={"/blog/" + article.slug}>{article.title}</Link>
      </h3>
      <p>{article.description}</p>
      <Link className="inline-link" href={"/blog/" + article.slug}>
        Читать материал
        <Arrow />
      </Link>
      <span className="read-time">{articleReadTime(article)} мин чтения</span>
    </article>
  );
}
export default function BlogPreview() {
  return (
    <section className="section container blog-preview">
      <div className="section-heading">
        <h2>Полезно перед началом проекта</h2>
        <Link className="inline-link" href="/blog">
          Все материалы
          <Arrow />
        </Link>
      </div>
      <div className="article-grid">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
