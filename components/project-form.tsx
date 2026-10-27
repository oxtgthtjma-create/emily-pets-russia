"use client";
import { useState, type FormEvent } from "react";
import { projectCategoryNames } from "../data/categories";
import { purchaseModes } from "../data/product-facts";
import { DownloadIcon } from "./icons";
const fieldLabels: Record<string, string> = {
  category: "Направление проекта",
  purchaseMode: "Формат закупки",
  items: "Позиции и упаковка",
  quantity: "Планируемое количество",
  unit: "Единица",
  destination: "Регион или пункт назначения",
  questions: "Вопросы для согласования",
};
export default function ProjectForm({
  initialCategory = "",
  initialItems = "",
  initialMode = "brand",
}: {
  initialCategory?: string;
  initialItems?: string;
  initialMode?: string;
}) {
  const [status, setStatus] = useState("");
  const [format, setFormat] = useState("txt");
  function downloadProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!String(data.get("items") ?? "").trim()) {
      setStatus("Укажите хотя бы одну позицию и требования к упаковке.");
      return;
    }
    const requirements = Object.fromEntries(
      Object.keys(fieldLabels).map((key) => [
        key,
        String(data.get(key) ?? "").trim(),
      ]),
    );
    requirements.category =
      projectCategoryNames[requirements.category] ?? requirements.category;
    requirements.purchaseMode =
      purchaseModes[requirements.purchaseMode as keyof typeof purchaseModes] ??
      requirements.purchaseMode;
    const text =
      format === "json"
        ? JSON.stringify(
            {
              format: "emily-pets-project-v1",
              language: "ru",
              createdAt: new Date().toISOString(),
              requirements,
            },
            null,
            2,
          )
        : `Emily pets — закупочный проект\n${new Intl.DateTimeFormat("ru-RU").format(new Date())}\n\n${Object.entries(
            requirements,
          )
            .map(
              ([key, value]) =>
                `${fieldLabels[key]}:\n${value || "На согласование"}`,
            )
            .join(
              "\n\n",
            )}\n\nДокумент подготовлен покупателем. Не является заказом или коммерческим предложением. Условия подтверждаются отдельно.\n`;
    const blob = new Blob([format === "txt" ? "\uFEFF" + text : text], {
      type:
        format === "json"
          ? "application/json;charset=utf-8"
          : "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `emily-pets-project-ru.${format}`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(
      "Файл подготовлен для скачивания. Проверьте папку загрузок. Поставщику ничего не отправлено.",
    );
  }
  return (
    <form
      className="project-form"
      onSubmit={downloadProject}
      onChange={() => setStatus("")}
    >
      <h2>Требования к закупке</h2>
      <p className="form-note">Поля со знаком * обязательны.</p>
      <label>
        Формат закупки
        <select name="purchaseMode" defaultValue={initialMode}>
          {Object.entries(purchaseModes).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Направление проекта *
        <select name="category" required defaultValue={initialCategory}>
          <option value="">Выберите направление</option>
          {Object.entries(projectCategoryNames).map(([key, name]) => (
            <option value={key} key={key}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Позиции и упаковка *
        <textarea
          defaultValue={initialItems}
          name="items"
          required
          maxLength={4000}
          rows={5}
          placeholder="Например: тофу, фасовка на согласование, версия упаковки — новая. Каждая позиция с новой строки."
        />
      </label>
      <div className="form-grid">
        <label>
          Планируемое количество
          <input
            name="quantity"
            type="number"
            min="0.01"
            max="100000000"
            step="0.01"
            placeholder="Если уже определено"
          />
        </label>
        <label>
          Единица
          <select name="unit">
            <option>На согласование</option>
            <option>кг</option>
            <option>т</option>
            <option>упаковок</option>
          </select>
        </label>
      </div>
      <label>
        Регион или пункт назначения
        <input
          name="destination"
          maxLength={150}
          placeholder="Город / транспортный узел, без личного адреса"
        />
      </label>
      <label>
        Что требуется подтвердить
        <textarea
          name="questions"
          maxLength={4000}
          rows={4}
          placeholder="Состав, образцы, макет упаковки, документы, условия партии…"
        />
      </label>
      <label>
        Формат документа
        <select
          aria-label="Формат документа"
          value={format}
          onChange={(event) => setFormat(event.target.value)}
        >
          <option value="txt">Текстовый документ (.txt)</option>
          <option value="json">Структурированные данные (.json)</option>
        </select>
      </label>
      <p className="caption">
        Документ не является заявкой или заказом. Сайт не отправляет его
        автоматически.
      </p>
      <button className="button" type="submit">
        <DownloadIcon />
        Скачать проект
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
