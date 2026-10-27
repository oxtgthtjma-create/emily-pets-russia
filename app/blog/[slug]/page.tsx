import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  articles,
  articleTopics,
  articleDate,
  articleReadTime,
} from "../../../data/articles";
import { ArticleCard } from "../../../components/article-card";
import { Arrow } from "../../../components/icons";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Материал не найден" };
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: "/blog/" + article.slug },
  };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const headings = article.blocks.filter((block) => block.type === "heading");
  const canonical = "https://emily-pets-russia.vercel.app/blog/" + article.slug;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        inLanguage: "ru",
        datePublished: article.published,
        dateModified: article.published,
        mainEntityOfPage: canonical,
        image: "https://emily-pets-russia.vercel.app" + article.image,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: "https://emily-pets-russia.vercel.app/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Блог",
            item: "https://emily-pets-russia.vercel.app/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: canonical,
          },
        ],
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <article className="article-page container">
        <nav className="breadcrumbs" aria-label="Путь к материалу">
          <Link href="/">Главная</Link>
          <span>/</span>
          <Link href="/blog">Блог</Link>
          <span>/</span>
          <span>{articleTopics[article.topic]}</span>
        </nav>
        <header className="article-header">
          <span className="topic-label">{articleTopics[article.topic]}</span>
          <h1>{article.title}</h1>
          <p className="lead">{article.description}</p>
          <div className="article-meta">
            <time dateTime={article.published}>
              {articleDate(article.published)}
            </time>
            <span>{articleReadTime(article)} мин чтения</span>
          </div>
        </header>
        <div className="article-cover">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="article-layout">
          <aside className="article-toc">
            <h2>В этом материале</h2>
            <ol>
              {headings.map((heading) => (
                <li key={heading.type === "heading" ? heading.id : ""}>
                  {heading.type === "heading" && (
                    <a href={"#" + heading.id}>{heading.text}</a>
                  )}
                </li>
              ))}
            </ol>
            <Link
              className="inline-link"
              href={"/project?category=" + article.category}
            >
              Подготовить проект
              <Arrow />
            </Link>
          </aside>
          <div className="article-body">
            {article.blocks.map((block, index) => {
              switch (block.type) {
                case "paragraph":
                  return <p key={index}>{block.text}</p>;
                case "heading":
                  return (
                    <h2 id={block.id} key={block.id}>
                      {block.text}
                    </h2>
                  );
                case "list":
                  return (
                    <ul key={index}>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                case "note":
                  return (
                    <aside className="article-note" key={index}>
                      {block.text}
                    </aside>
                  );
                case "table":
                  return (
                    <div
                      className="table-scroll"
                      key={index}
                      tabIndex={0}
                      role="region"
                      aria-label={block.caption}
                    >
                      <table>
                        <caption>{block.caption}</caption>
                        <thead>
                          <tr>
                            {block.headings.map((heading) => (
                              <th scope="col" key={heading}>
                                {heading}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
              }
            })}
            <div className="article-action">
              <h2>Перенесите требования в проект</h2>
              <p>
                Скачайте файл для дальнейшего обсуждения. Сайт не отправляет его
                поставщику автоматически.
              </p>
              <Link
                className="button"
                href={"/project?category=" + article.category}
              >
                Подготовить проект
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </article>
      <section className="section container">
        <div className="section-heading">
          <h2>Читайте также</h2>
          <Link className="inline-link" href="/blog">
            Все материалы
            <Arrow />
          </Link>
        </div>
        <div className="article-grid related-articles">
          {articles
            .filter((a) => a.slug !== slug)
            .map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
        </div>
      </section>
    </>
  );
}
