"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { showcaseProducts } from "../data/products";
import { productFacts } from "../data/product-facts";
import { bagOptions, colorOptions } from "../data/packaging-options";
export function PackagingStudio() {
  const [productId, setProductId] = useState("tofu");
  const [mode, setMode] = useState("brand");
  const [bag, setBag] = useState<keyof typeof bagOptions>("pouch");
  const [color, setColor] = useState<keyof typeof colorOptions>("sage");
  const product = showcaseProducts.find((item) => item.id === productId)!;
  return (
    <section className="experience-section" id="studio">
      <div className="experience-heading">
        <span className="eyebrow">01 · УПАКОВКА</span>
        <h2>Представьте продукт на вашей полке</h2>
        <p>
          Посмотрите существующую упаковку Emily pets или соберите цветовое
          направление для обсуждения.
        </p>
      </div>
      <div className="studio-grid">
        <div
          className="studio-preview"
          style={{ backgroundColor: colorOptions[color].hex + "55" }}
        >
          {mode === "brand" ? (
            <Image
              src={product.image}
              alt={"Существующий материал бренда: " + product.name}
              width={700}
              height={700}
              sizes="(max-width:820px) 100vw, 50vw"
            />
          ) : (
            <svg
              viewBox="0 0 400 440"
              role="img"
              aria-label={
                bagOptions[bag] +
                ", " +
                colorOptions[color].name +
                " — условный эскиз"
              }
            >
              <path
                d={
                  bag === "paper"
                    ? "M110 60h180l20 340H90Z"
                    : bag === "handle"
                      ? "M95 40h210l20 360H75Z"
                      : "M110 60h180l30 340H80Z"
                }
                fill={colorOptions[color].hex}
                stroke="#173f35"
                strokeWidth="3"
              />
              {bag === "handle" ? (
                <rect
                  x="160"
                  y="62"
                  width="80"
                  height="18"
                  rx="9"
                  fill="white"
                />
              ) : (
                <path d="M120 90h160" stroke="#173f35" strokeWidth="2" />
              )}
              <rect
                x="112"
                y="130"
                width="176"
                height="180"
                rx="10"
                fill="#fffaf0"
              />
              <text
                x="200"
                y="170"
                textAnchor="middle"
                fontSize="17"
                fill="#173f35"
              >
                ВАШ БРЕНД
              </text>
              <text
                x="200"
                y="220"
                textAnchor="middle"
                fontSize="15"
                fill="#173f35"
              >
                {product.name}
              </text>
              <path
                d="m170 260 15-14 15 14 15-14 15 14"
                stroke="#173f35"
                fill="none"
                strokeWidth="3"
              />
              <text
                x="200"
                y="292"
                textAnchor="middle"
                fontSize="12"
                fill="#173f35"
              >
                ЭСКИЗ
              </text>
            </svg>
          )}
          <span>
            {mode === "brand"
              ? "Материал бренда"
              : "Концепция · не готовый макет"}
          </span>
        </div>
        <div className="studio-controls">
          <label>
            Продукт
            <select
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
            >
              {showcaseProducts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Формат бренда
            <select
              value={mode}
              onChange={(event) => setMode(event.target.value)}
            >
              <option value="brand">
                Emily pets — существующее оформление
              </option>
              <option value="custom">Моя марка — цветовой эскиз</option>
            </select>
          </label>
          {mode === "custom" ? (
            <>
              <label>
                Форма пакета
                <select
                  value={bag}
                  onChange={(event) =>
                    setBag(event.target.value as keyof typeof bagOptions)
                  }
                >
                  {Object.entries(bagOptions).map(([key, name]) => (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
              <fieldset className="color-options">
                <legend>Цветовое направление</legend>
                {Object.entries(colorOptions).map(([key, value]) => (
                  <label key={key}>
                    <input
                      type="radio"
                      name="color"
                      value={key}
                      checked={color === key}
                      onChange={() =>
                        setColor(key as keyof typeof colorOptions)
                      }
                    />
                    <span style={{ backgroundColor: value.hex }} />
                    {value.name}
                  </label>
                ))}
              </fieldset>
              <p className="caption">
                Условный эскиз без масштаба. Цвет печати, материал, размеры,
                маркировка и возможность производства согласуются отдельно.
              </p>
            </>
          ) : (
            <p className="caption">
              Опубликованные фасовки линейки: {productFacts[productId].pack}.
              Изображение — пример из материалов бренда; точное исполнение и
              доступность уточняются отдельно.
            </p>
          )}
          <Link
            className="button"
            href={
              "/project?product=" +
              productId +
              "&mode=" +
              mode +
              (mode === "custom"
                ? "&design=" + encodeURIComponent(bag + ":" + color)
                : "")
            }
          >
            Добавить в проект
          </Link>
        </div>
      </div>
    </section>
  );
}
export function ProductQuiz() {
  const [result, setResult] = useState<{
    ids: string[];
    channel: string;
  } | null>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const animal = data.get("animal"),
      material = data.get("material");
    setResult({
      ids:
        animal === "small"
          ? ["aspen", "wood-shaving"]
          : material === "plant"
            ? ["tofu", "cassava"]
            : material === "mineral"
              ? ["bentonite"]
              : material === "wood"
                ? ["pine"]
                : ["tofu", "bentonite", "pine", "cassava"],
      channel: String(data.get("channel")),
    });
  }
  return (
    <section className="experience-section quiz-section" id="quiz">
      <div className="experience-heading">
        <span className="eyebrow">02 · 30 СЕКУНД</span>
        <h2>С чего начать ассортимент?</h2>
        <p>
          Три вопроса помогут сузить список для знакомства. Ответы не заменяют
          проверку образца и спецификации.
        </p>
      </div>
      <form
        onSubmit={submit}
        onChange={() => setResult(null)}
        className="quiz-form"
      >
        <label>
          Для кого продукция?
          <select name="animal">
            <option value="cats">Кошки</option>
            <option value="small">Мелкие животные</option>
          </select>
        </label>
        <label>
          Предпочтение по материалу
          <select name="material">
            <option value="any">Пока сравниваю</option>
            <option value="plant">Растительная основа</option>
            <option value="mineral">Минеральная основа</option>
            <option value="wood">Древесные материалы</option>
          </select>
        </label>
        <label>
          Ваш канал продаж
          <select name="channel">
            <option value="retail">Зоомагазин / розничная сеть</option>
            <option value="online">Интернет-магазин</option>
            <option value="distribution">Дистрибуция</option>
          </select>
        </label>
        <button className="button" type="submit">
          Показать направления
        </button>
      </form>
      <div aria-live="polite">
        {result && (
          <div className="quiz-result">
            <h3>Направления для знакомства</h3>
            <p>
              {result.channel === "online"
                ? "Для интернет-магазина отдельно сравните вес, габариты и транспортную упаковку."
                : result.channel === "distribution"
                  ? "Для дистрибуции уточните состав линейки, MOQ по позициям и условия партии."
                  : "Для розницы сравните фасовки, маркировку и представление продукта на полке."}
            </p>
            <p className="caption">
              Сначала учитывается тип животного: подстилки показываются отдельно
              от кошачьих наполнителей. Совместимость материала с конкретным
              видом животного подтверждайте по спецификации.
            </p>
            <div className="quiz-links">
              {result.ids.map((id) => {
                const item = showcaseProducts.find(
                  (product) => product.id === id,
                )!;
                return (
                  <Link key={id} href={"/assortment#product-" + id}>
                    {item.name} →
                  </Link>
                );
              })}
            </div>
            <button
              className="inline-link"
              type="button"
              onClick={() => setResult(null)}
            >
              Пройти ещё раз
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
export function MaterialExplorer() {
  const [selected, setSelected] = useState("tofu");
  const item = showcaseProducts.find((product) => product.id === selected)!;
  return (
    <section className="experience-section" id="materials">
      <div className="experience-heading">
        <span className="eyebrow">03 · МАТЕРИАЛЫ</span>
        <h2>Откройте материал одним нажатием</h2>
        <p>
          Нажмите на образец, чтобы посмотреть опубликованные параметры и
          упаковку.
        </p>
      </div>
      <div
        className="material-buttons"
        role="group"
        aria-label="Выбор материала"
      >
        {showcaseProducts.map((product, index) => (
          <button
            key={product.id}
            type="button"
            aria-pressed={selected === product.id}
            onClick={() => setSelected(product.id)}
          >
            <span
              className={"material-sample sample-" + index}
              aria-hidden="true"
            >
              {Array.from({ length: 9 }, (_, n) => (
                <i key={n} />
              ))}
            </span>
            {product.name}
          </button>
        ))}
      </div>
      <div className="material-detail" aria-live="polite">
        <Image
          src={item.image}
          alt={"Упаковка: " + item.name}
          width={350}
          height={350}
          sizes="(max-width:560px) 100vw, 280px"
        />
        <div>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <dl>
            {productFacts[selected].rows.slice(0, 3).map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="caption">
            Графические образцы условные, не фотографии гранул. Параметры
            заявлены производителем и требуют подтверждения для выбранного
            исполнения.
          </p>
          <Link
            className="inline-link"
            href={"/assortment#product-" + selected}
          >
            Все характеристики →
          </Link>
        </div>
      </div>
    </section>
  );
}
