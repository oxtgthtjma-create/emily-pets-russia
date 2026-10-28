"use client";
import { useState, type FormEvent } from "react";
const number = (value: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 3 }).format(value);
const checklist = [
  "Выбран продукт и формат бренда",
  "Подтверждены фасовка и код позиции",
  "Согласованы образец и характеристики",
  "Проверены упаковка и маркировка",
  "Уточнены MOQ и срок готовности",
  "Получены условия оплаты и поставки",
  "Проверены документы с импортёром",
  "Получена ставка перевозчика и её состав",
];
function positive(data: FormData, name: string, integer = false) {
  const value = Number(data.get(name));
  if (
    !Number.isFinite(value) ||
    value <= 0 ||
    value > 1e9 ||
    (integer && !Number.isSafeInteger(value))
  )
    throw new Error(
      "Проверьте числа: значения должны быть больше нуля, а пачки и короба — целыми.",
    );
  return value;
}
export default function BuyerTools() {
  const [packing, setPacking] = useState("");
  const [packingError, setPackingError] = useState("");
  const [comparison, setComparison] = useState("");
  const [comparisonError, setComparisonError] = useState("");
  const [checked, setChecked] = useState<string[]>([]);
  const [downloadStatus, setDownloadStatus] = useState("");
  function calculatePacking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const packs = positive(data, "packs", true),
        perBox = positive(data, "perBox", true),
        content = positive(data, "content");
      const cartons = Math.ceil(packs / perBox),
        last = packs % perBox;
      setPacking(
        `${number(packs)} пачек → ${number(cartons)} коробов. ${last ? `Последний короб: ${number(last)} из ${number(perBox)} пачек; свободных мест — ${number(perBox - last)}.` : "Все короба полные."} Общее количество продукта: ${number(packs * content)} ${data.get("unit")}.`,
      );
    } catch (error) {
      setPackingError((error as Error).message);
    }
  }
  function compare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const priceA = positive(data, "priceA"),
        sizeA = positive(data, "sizeA"),
        priceB = positive(data, "priceB"),
        sizeB = positive(data, "sizeB");
      const unit = data.get("unit"),
        currency = data.get("currency");
      const a = priceA / sizeA,
        b = priceB / sizeB;
      const formatter = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: String(currency),
        maximumFractionDigits: 4,
      });
      setComparison(
        `Вариант A: ${formatter.format(a)} / ${unit}. Вариант B: ${formatter.format(b)} / ${unit}. ${Math.abs(a - b) < 1e-9 ? "Цена за единицу одинакова." : `У варианта ${a < b ? "A" : "B"} цена за единицу ниже на ${number((1 - Math.min(a, b) / Math.max(a, b)) * 100)} % относительно другого варианта.`} Сравнение учитывает только введённую цену и фасовку.`,
      );
    } catch (error) {
      setComparisonError((error as Error).message);
    }
  }
  function download() {
    const text =
      "Emily pets — контрольный список закупки\n" +
      checklist
        .map((item) => (checked.includes(item) ? "[✓] " : "[ ] ") + item)
        .join("\n") +
      "\n\nЭто ваши отметки, а не подтверждение поставщика. Условия и документы проверяются отдельно.\n";
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + text], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "emily-pets-purchase-checklist-ru.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloadStatus(
      "Файл подготовлен для скачивания. Поставщику ничего не отправлено.",
    );
  }
  return (
    <div className="buyer-tools">
      <section className="buyer-tool" id="packing">
        <span className="eyebrow">01 · ПАРТИЯ</span>
        <h2>Пачки → короба</h2>
        <p>
          Укажите согласованную вместимость короба и фасовку. Узнайте число
          коробов и остаток.
        </p>
        <form
          className="project-form"
          onSubmit={calculatePacking}
          onChange={() => {
            setPacking("");
            setPackingError("");
          }}
        >
          <div className="form-grid">
            <label>
              Всего пачек *
              <input
                name="packs"
                type="number"
                min="1"
                max="1000000000"
                step="1"
                required
              />
            </label>
            <label>
              Пачек в коробе *
              <input
                name="perBox"
                type="number"
                min="1"
                max="1000000000"
                step="1"
                required
              />
            </label>
            <label>
              Продукта в одной пачке *
              <input
                name="content"
                type="number"
                min="0.001"
                max="1000000000"
                step="0.001"
                required
              />
            </label>
            <label>
              Единица фасовки
              <select name="unit">
                <option>кг</option>
                <option>л</option>
              </select>
            </label>
          </div>
          <button className="button" type="submit">
            Рассчитать короба
          </button>
          <p role="alert">{packingError}</p>
          <p className="buyer-result" role="status">
            {packing}
          </p>
        </form>
        <p className="caption">
          Это расчёт количества, а не план загрузки контейнера. Литры продукта
          не равны транспортному объёму коробов; вес упаковки и паллет не
          включён.
        </p>
      </section>
      <section className="buyer-tool" id="compare">
        <span className="eyebrow">02 · СРАВНЕНИЕ</span>
        <h2>Цена за кг или литр</h2>
        <p>
          Сравните две фасовки в одной валюте и единице измерения. Цена — за
          одну пачку.
        </p>
        <form
          className="project-form"
          onSubmit={compare}
          onChange={() => {
            setComparison("");
            setComparisonError("");
          }}
        >
          <div className="form-grid">
            <label>
              Цена пачки A *
              <input
                name="priceA"
                type="number"
                min="0.001"
                max="1000000000"
                step="0.001"
                required
              />
            </label>
            <label>
              Фасовка A *
              <input
                name="sizeA"
                type="number"
                min="0.001"
                max="1000000000"
                step="0.001"
                required
              />
            </label>
            <label>
              Цена пачки B *
              <input
                name="priceB"
                type="number"
                min="0.001"
                max="1000000000"
                step="0.001"
                required
              />
            </label>
            <label>
              Фасовка B *
              <input
                name="sizeB"
                type="number"
                min="0.001"
                max="1000000000"
                step="0.001"
                required
              />
            </label>
            <label>
              Валюта обеих цен
              <select name="currency">
                <option>USD</option>
                <option>RUB</option>
                <option>CNY</option>
                <option>EUR</option>
              </select>
            </label>
            <label>
              Единица обеих фасовок
              <select name="unit">
                <option>кг</option>
                <option>л</option>
              </select>
            </label>
          </div>
          <button className="button" type="submit">
            Сравнить фасовки
          </button>
          <p role="alert">{comparisonError}</p>
          <p className="buyer-result" role="status">
            {comparison}
          </p>
        </form>
        <p className="caption">
          Сравнивайте одинаковые условия поставки и состав цены. Инструмент не
          переводит валюты или литры в килограммы и не оценивает качество
          продукта.
        </p>
      </section>
      <section className="buyer-tool buyer-checklist" id="checklist">
        <div>
          <span className="eyebrow">03 · ПОДГОТОВКА</span>
          <h2>Что уточнить до заказа</h2>
          <p>
            Отметьте проверенные пункты и скачайте список для следующего
            разговора с поставщиком.
          </p>
          <p className="caption">
            Отметки хранятся только в открытой странице и исчезают после
            перезагрузки. Файл содержит ваши отметки, а не подтверждения Emily
            pets.
          </p>
        </div>
        <div>
          <div className="buyer-checks">
            {checklist.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={checked.includes(item)}
                  onChange={(event) => {
                    setChecked((previous) =>
                      event.target.checked
                        ? [...previous, item]
                        : previous.filter((value) => value !== item),
                    );
                    setDownloadStatus("");
                  }}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
          <p role="status">
            Проверено: {checked.length} из {checklist.length}
          </p>
          <button className="button" type="button" onClick={download}>
            Скачать список (.txt)
          </button>
          <p role="status">{downloadStatus}</p>
        </div>
      </section>
    </div>
  );
}
