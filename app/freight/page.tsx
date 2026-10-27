import Link from "next/link";
import FreightCalculator from "../../components/freight-calculator";
export const metadata = {
  title: "Морская доставка и расчёт фрахта",
  description:
    "Откройте внешний сервис морских тарифов и рассчитайте транспортные расходы партии Emily pets по предложению перевозчика.",
  alternates: { canonical: "/freight" },
};
export default function Freight() {
  return (
    <>
      <section className="page-intro container">
        <Link className="breadcrumb" href="/">
          Главная
        </Link>
        <h1>
          Морская доставка.
          <br />
          Понятные расходы.
        </h1>
        <p className="lead">
          Узнайте ставку перевозчика и оцените расходы на контейнер и пачку.
        </p>
        <p>Доступно для продукции Emily pets и заказов под вашей маркой.</p>
      </section>
      <section
        className="container section freight-section"
        aria-label="Тарифы и калькулятор морской доставки"
      >
        <FreightCalculator />
      </section>
    </>
  );
}
