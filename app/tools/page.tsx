import Link from "next/link";
import BuyerTools from "../../components/buyer-tools";
export const metadata = {
  title: "Инструменты покупателя",
  description:
    "Рассчитайте число коробов, сравните цену за килограмм или литр и скачайте контрольный список закупки Emily pets.",
  alternates: { canonical: "/tools" },
};
export default function Tools() {
  return (
    <>
      <section className="page-intro container">
        <Link className="breadcrumb" href="/">
          Главная
        </Link>
        <h1>
          Меньше пересчётов.
          <br />
          Больше ясности в закупке.
        </h1>
        <p className="lead">
          Небольшие инструменты для сравнения фасовок и подготовки партии.
        </p>
        <nav className="tools-shortcuts" aria-label="Инструменты покупателя">
          <a href="#packing">Пачки и короба ↓</a>
          <a href="#compare">Сравнение цен ↓</a>
          <a href="#checklist">Список до заказа ↓</a>
          <Link href="/freight">Морская доставка →</Link>
          <Link href="/explore">Интерактивный ассортимент →</Link>
        </nav>
        <p className="caption">
          Работают в браузере. Введённые значения не отправляются на сервер.
        </p>
      </section>
      <div className="container">
        <BuyerTools />
      </div>
      <section className="section container">
        <div className="brief-banner">
          <div>
            <h2>Готовы обсудить ассортимент?</h2>
            <p>Перенесите требования в закупочный проект.</p>
          </div>
          <Link className="button" href="/project">
            Подготовить проект
          </Link>
        </div>
      </section>
    </>
  );
}
