"use client";
import { useState, type FormEvent } from "react";
const ports = {
  dalian: "Далянь",
  qingdao: "Циндао",
  shanghai: "Шанхай",
  ningbo: "Нинбо",
};
export default function FreightCalculator() {
  const [result, setResult] = useState<{
    total: number;
    perPack: number;
    currency: string;
    route: string;
    containers: number;
    type: string;
    source: string;
    valid: string;
  } | null>(null);
  const [error, setError] = useState("");
  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const rate = Number(fields.get("rate")),
      containers = Number(fields.get("containers")),
      extras = Number(fields.get("extras")),
      packs = Number(fields.get("packs"));
    if (
      ![rate, containers, extras, packs].every(Number.isFinite) ||
      rate <= 0 ||
      containers < 1 ||
      !Number.isInteger(containers) ||
      extras < 0 ||
      packs < 1 ||
      !Number.isInteger(packs)
    ) {
      setError(
        "Проверьте ставку, количество контейнеров и целое число пачек. Все значения должны быть положительными; дополнительные расходы могут быть нулевыми.",
      );
      return;
    }
    const total = rate * containers + extras;
    if (!Number.isFinite(total)) {
      setError("Проверьте введённые значения.");
      return;
    }
    setResult({
      total,
      perPack: total / packs,
      currency: String(fields.get("currency")),
      route:
        String(fields.get("origin")) +
        " → " +
        String(fields.get("destination")),
      containers,
      type: String(fields.get("containerType")),
      source: String(fields.get("source")).trim(),
      valid: String(fields.get("valid")),
    });
  }
  const money = (amount: number, currency: string) =>
    new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  return (
    <div className="freight-layout">
      <form
        className="project-form"
        onSubmit={calculate}
        onChange={() => {
          setResult(null);
          setError("");
        }}
      >
        <h2>Посчитайте по вашей ставке</h2>
        <p>
          Введите предложение перевозчика. Калькулятор распределяет расходы и не
          запрашивает тариф автоматически.
        </p>
        <div className="form-grid">
          <label>
            Порт отправления
            <select name="origin">
              {Object.values(ports).map((port) => (
                <option key={port}>{port}</option>
              ))}
            </select>
          </label>
          <label>
            Порт назначения
            <select name="destination">
              <option>Владивосток</option>
              <option>Восточный</option>
              <option>Санкт-Петербург</option>
              <option>Новороссийск</option>
            </select>
          </label>
        </div>
        <div className="form-grid">
          <label>
            Тип контейнера
            <select name="containerType">
              <option>20GP</option>
              <option>40GP</option>
              <option>40HQ</option>
            </select>
          </label>
          <label>
            Контейнеров
            <input
              name="containers"
              type="number"
              min="1"
              max="1000"
              step="1"
              defaultValue="1"
              required
            />
          </label>
        </div>
        <div className="form-grid">
          <label>
            Ставка за контейнер *
            <input
              name="rate"
              type="number"
              min="0.01"
              max="1000000000"
              step="0.01"
              required
              placeholder="Из предложения перевозчика"
            />
          </label>
          <label>
            Валюта
            <select name="currency">
              <option>USD</option>
              <option>RUB</option>
              <option>CNY</option>
              <option>EUR</option>
            </select>
          </label>
        </div>
        <label>
          Дополнительные расходы за всю партию
          <input
            name="extras"
            type="number"
            min="0"
            max="1000000000"
            step="0.01"
            defaultValue="0"
            required
          />
          <span className="caption">
            В той же валюте. Не включайте расходы, уже входящие в ставку.
          </span>
        </label>
        <label>
          Пачек во всей партии *
          <input
            name="packs"
            type="number"
            min="1"
            max="1000000000"
            step="1"
            required
            placeholder="По фактическому плану загрузки"
          />
        </label>
        <div className="form-grid">
          <label>
            Источник ставки *
            <input
              name="source"
              maxLength={150}
              required
              placeholder="Перевозчик / номер предложения"
              pattern=".*\S.*"
            />
          </label>
          <label>
            Ставка действует до *<input name="valid" type="date" required />
          </label>
        </div>
        <button className="button" type="submit">
          Рассчитать расходы
        </button>
        <p className="form-status" role="alert">
          {error}
        </p>
        <div aria-live="polite">
          {result && (
            <div className="freight-result">
              <h3>Расчёт по введённой ставке</h3>
              <p>
                {result.route} · {result.containers} × {result.type}
              </p>
              <dl>
                <dt>Всего по введённым расходам</dt>
                <dd>{money(result.total, result.currency)}</dd>
                <dt>Равномерно на одну пачку</dt>
                <dd>{money(result.perPack, result.currency)}</dd>
              </dl>
              <p>
                Источник: {result.source}. Действует до:{" "}
                {new Intl.DateTimeFormat("ru-RU", { timeZone: "UTC" }).format(
                  new Date(result.valid + "T00:00:00Z"),
                )}
                .
              </p>
              <p className="caption">
                Срок действия введён пользователем; проверьте его у перевозчика.
                Для разных фасовок распределяйте расходы по отдельным партиям
                или согласованному методу.
              </p>
            </div>
          )}
        </div>
      </form>
      <aside className="freight-help">
        <span className="eyebrow">МОРСКАЯ ДОСТАВКА</span>
        <h2>
          Сначала тариф.
          <br />
          Затем расчёт партии.
        </h2>
        <p>
          Откройте независимый сервис, выберите морскую перевозку, порты, дату и
          контейнер. Доступность ставки для маршрута определяет сервис.
        </p>
        <a
          className="button"
          href="https://avalog.ru/calculator"
          target="_blank"
          rel="noopener noreferrer"
        >
          Посмотреть тарифы в Avalog ↗
        </a>
        <p className="caption">
          Внешний сервис, не партнёр Emily pets. Откроется в новой вкладке.
          Данные формы автоматически не передаются. Возможны регистрация и
          запрос предложения; отображение тарифа не гарантируется.
        </p>
        <h3>Проверьте состав ставки</h3>
        <ul>
          <li>Морской фрахт и надбавки перевозчика</li>
          <li>Терминальные расходы в обоих портах</li>
          <li>Выдача и возврат контейнера</li>
          <li>Таможенные платежи, страхование и доставка по России</li>
          <li>Валюта, срок действия и свободное время</li>
        </ul>
        <p>
          Итог включает только введённые суммы. Это не цена товара, не полная
          себестоимость импорта и не предложение Emily pets.
        </p>
      </aside>
    </div>
  );
}
