"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { showcaseProducts } from "../data/products";
import { Arrow, Chevron } from "./icons";
const filters = [
  { id: "all", name: "Все направления" },
  { id: "cat-litter", name: "Наполнители для кошек" },
  { id: "bedding", name: "Подстилки для мелких животных" },
];
export default function ProductShowcase({
  initialCategory = "all",
}: {
  initialCategory?: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const visible = showcaseProducts.filter(
    (product) => category === "all" || product.category === category,
  );
  return (
    <div className="product-showcase" id="products">
      <div className="product-toolbar">
        <div
          className="filter-buttons"
          role="group"
          aria-label="Фильтр направлений"
        >
          {filters.map((filter) => (
            <button
              type="button"
              aria-pressed={category === filter.id}
              key={filter.id}
              onClick={() => setCategory(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>
        <span className="result-count" role="status" aria-live="polite">
          Показано: {visible.length} из {showcaseProducts.length}
        </span>
      </div>
      <div className="product-grid">
        {visible.map((product) => (
          <article className="showcase-product" key={product.id}>
            <div className="product-photo">
              <Image
                src={product.image}
                alt={"Пример оформления: " + product.name}
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 33vw"
              />
            </div>
            <div className="product-heading">
              <h3>{product.name}</h3>
              <Link
                className="inline-link"
                href={
                  "/project?category=" +
                  product.category +
                  "&product=" +
                  product.id
                }
                aria-label={"В проект: " + product.name}
              >
                В проект
                <Arrow />
              </Link>
            </div>
            <p>{product.description}</p>
            <details className="product-details">
              <summary>
                Что согласовать
                <Chevron />
              </summary>
              <ul>
                {product.inputs.map((input) => (
                  <li key={input}>{input}</li>
                ))}
              </ul>
              <a href={product.source}>Описание на основном сайте</a>
            </details>
          </article>
        ))}
      </div>
      <p className="caption product-caption">
        Изображения — примеры из материалов бренда. Оформление, фасовка и
        условия подтверждаются отдельно. Текст на исходной упаковке сохранён.
      </p>
    </div>
  );
}
