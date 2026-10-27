import Image from "next/image";
import Link from "next/link";
import {
  articles,
  articleTopics,
  articleDate,
  articleReadTime,
} from "../../data/articles";
import { ArticleCard } from "../../components/article-card";
import ProjectCta from "../../components/project-cta";
import { Arrow } from "../../components/icons";
export const metadata = {
  title: "Блог для закупочных команд",
  description:
    "Оригинальные заметки о русскоязычной спецификации, кодах позиций и версиях закупочного проекта.",
  alternates: { canonical: "/blog" },
};
export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string | string[] }>;
}) {
  const candidate = (await searchParams).topic;
  const topic =
    typeof candidate === "string" && Object.hasOwn(articleTopics, candidate)
      ? candidate
      : "all";
  const visible = articles.filter(
    (article) => topic === "all" || article.topic === topic,
  );
  const featured = articles[0];
  return (
    <>
      <section className="page-intro container">
        <Link href="/" className="breadcrumb">
          Главная
        </Link>
        <h1>Блог для закупочных команд</h1>
        <p className="lead">
          Практические заметки о русскоязычной спецификации, позициях и версиях
          проекта.
        </p>
      </section>
      <section
        className="featured-article container"
        aria-label="Материал редакции"
      >
        <div className="featured-image">
          <Image
            src={featured.image}
            alt={featured.imageAlt}
            fill
            sizes="(max-width: 820px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="featured-copy">
          <span className="topic-label">{articleTopics[featured.topic]}</span>
          <div className="article-meta">
            <time dateTime={featured.published}>
              {articleDate(featured.published)}
            </time>
            <span>{articleReadTime(featured)} мин чтения</span>
          </div>
          <h2>
            <Link href={"/blog/" + featured.slug}>{featured.title}</Link>
          </h2>
          <p>{featured.description}</p>
          <Link className="inline-link" href={"/blog/" + featured.slug}>
            Читать материал
            <Arrow />
          </Link>
        </div>
      </section>
      <section className="section container" id="archive">
        <h2>Все материалы</h2>
        <nav className="blog-filters filter-buttons" aria-label="Темы блога">
          <Link
            href="/blog#archive"
            aria-current={topic === "all" ? "page" : undefined}
          >
            Все темы
          </Link>
          {Object.entries(articleTopics).map(([id, name]) => (
            <Link
              key={id}
              href={"/blog?topic=" + id + "#archive"}
              aria-current={topic === id ? "page" : undefined}
            >
              {name}
            </Link>
          ))}
        </nav>
        <p className="caption">
          Материалов: {visible.length}. Все публикации —{" "}
          {articleDate("2026-10-27")}.
        </p>
        <div className="article-grid">
          {visible.map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </div>
      </section>
      <ProjectCta />
    </>
  );
}
