"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { showcaseProducts } from "../data/products";
import { productFacts, purchaseModes } from "../data/product-facts";
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
  const [mode, setMode] = useState("brand");
  const visible = showcaseProducts.filter(
    (product) => category === "all" || product.category === category,
  );
  return (
    <div className="product-showcase" id="products">
      <div className="purchase-mode">
        <label>
          Формат закупки
          <select
            value={mode}
            onChange={(event) => setMode(event.target.value)}
          >
            {Object.entries(purchaseModes).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <p>
          {mode === "brand"
            ? "Существующее оформление Emily pets. Выберите фасовку и количество; наличие подтверждается отдельно."
            : mode === "custom"
              ? "Ваша торговая марка: согласуем макет, фасовку и параметры партии."
              : "Сравните фирменную упаковку Emily pets и вариант под вашей маркой."}
        </p>
      </div>
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
          <article
            className="showcase-product"
            id={"product-" + product.id}
            key={product.id}
          >
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
                  product.id +
                  "&mode=" +
                  mode
                }
                aria-label={"В проект: " + product.name}
              >
                В проект
                <Arrow />
              </Link>
            </div>
            <p>{product.description}</p>
            <p className="product-brand">
              Emily pets · {productFacts[product.id].pack}
            </p>
            <details className="product-details">
              <summary>
                Характеристики и фасовки
                <Chevron />
              </summary>
              <dl className="product-facts">
                {productFacts[product.id].rows.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              {productFacts[product.id].note && (
                <p className="caption">{productFacts[product.id].note}</p>
              )}
              <p className="caption">
                Данные заявлены производителем на сайте emilypets.com. Проверено
                27.10.2026. Это сведения о продуктовой линейке, а не паспорт
                партии или подтверждение каждой показанной упаковки. Запросите
                спецификацию и методику испытаний.
              </p>
              <a
                href={productFacts[product.id].source}
                target="_blank"
                rel="noopener noreferrer"
              >
                Источник характеристик ↗
              </a>
            </details>
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
