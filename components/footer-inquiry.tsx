"use client";
import { useState, type FormEvent } from "react";
import { showcaseProducts } from "../data/products";
import { purchaseModes } from "../data/product-facts";
export default function FooterInquiry() {
  const [draft, setDraft] = useState("");
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const labels: Record<string, string> = {
      name: "Имя",
      company: "Компания",
      email: "Email",
      whatsapp: "WhatsApp",
      country: "Страна",
      product: "Продукт",
      mode: "Формат закупки",
      message: "Сообщение",
    };
    const body = Object.entries(labels)
      .map(
        ([key, label]) => label + ": " + String(fields.get(key) ?? "").trim(),
      )
      .join("\n");
    setDraft(
      "mailto:emily@emilypets.com?subject=" +
        encodeURIComponent("Запрос по продукции Emily pets — российский сайт") +
        "&body=" +
        encodeURIComponent(body),
    );
  }
  return (
    <form
      className="footer-inquiry"
      onSubmit={prepare}
      onChange={() => setDraft("")}
    >
      <h2>Обсудим вашу закупку</h2>
      <p>Emily pets в фирменной упаковке или продукция под вашей маркой.</p>
      <div className="footer-form-grid">
        <label>
          Ваше имя *
          <input name="name" autoComplete="name" required maxLength={80} />
        </label>
        <label>
          Компания
          <input name="company" autoComplete="organization" maxLength={100} />
        </label>
        <label>
          Рабочий email *
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={150}
          />
        </label>
        <label>
          WhatsApp
          <input
            name="whatsapp"
            type="tel"
            maxLength={40}
            placeholder="+ код страны"
          />
        </label>
        <label>
          Страна *
          <input
            name="country"
            autoComplete="country-name"
            required
            maxLength={80}
          />
        </label>
        <label>
          Интересующий продукт
          <select name="product">
            <option>Выбрать продукт</option>
            {showcaseProducts.map((product) => (
              <option key={product.id}>{product.name}</option>
            ))}
            <option>Песок для купания</option>
            <option>Лакомства для кошек</option>
          </select>
        </label>
      </div>
      <label>
        Формат закупки
        <select name="mode">
          {Object.entries(purchaseModes).map(([key, label]) => (
            <option key={key}>{label}</option>
          ))}
        </select>
      </label>
      <label>
        Сообщение *
        <textarea
          name="message"
          rows={3}
          required
          maxLength={1500}
          placeholder="Продукт, фасовка, количество и пункт назначения"
        />
      </label>
      <p className="footer-form-note">
        Форма подготовит письмо на emily@emilypets.com. Данные остаются в
        браузере до открытия почтовой программы; отправку вы подтверждаете в
        ней.
      </p>
      <button className="button" type="submit">
        Подготовить письмо
      </button>
      {draft && (
        <div className="footer-draft" role="status">
          <p>
            Письмо подготовлено. Откройте почтовую программу, проверьте данные и
            отправьте его самостоятельно.
          </p>
          <a href={draft}>Открыть письмо →</a>
          <p>
            Если почта не настроена, напишите на{" "}
            <a href="mailto:emily@emilypets.com">emily@emilypets.com</a>.
          </p>
        </div>
      )}
    </form>
  );
}
