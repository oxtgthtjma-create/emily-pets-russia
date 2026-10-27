import Image from "next/image";
import Link from "next/link";
import ProjectCta from "../../components/project-cta";
export const metadata = {
  title: "О проекте и источниках",
  description:
    "Назначение российского сайта Emily pets и границы представленной информации.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <>
      <section className="page-intro container">
        <Link className="breadcrumb" href="/">
          Главная
        </Link>
        <h1>
          Ближе к вашей
          <br />
          закупочной задаче.
        </h1>
        <p className="lead">
          Emily pets — русскоязычный вход для закупочных команд, которые
          рассматривают наполнители для кошек и подстилки для мелких животных.
        </p>
      </section>
      <section className="about-content container">
        <div className="about-photo">
          <Image
            src="/images/cat-materials.webp"
            alt="Кошка и иллюстративные образцы материалов"
            fill
            sizes="(max-width: 820px) 100vw, 45vw"
          />
        </div>
        <div className="reading">
          <h2>У каждого сайта своя задача</h2>
          <p>
            <a href="https://emilypets.com/ru/">emilypets.com</a> — сведения о
            компании и продукции.{" "}
            <a href="https://www.love-pets.asia">love-pets.asia</a> — материалы
            для международных закупочных проектов. Этот сайт помогает оформить
            требования к конкретному проекту для российского рынка.
          </p>
          <h2>От требований к обсуждению</h2>
          <p>
            Создайте документ с категориями, фасовкой, объёмом и вопросами. Файл
            формируется в вашем браузере. Он не является заказом, коммерческим
            предложением или подтверждением наличия.
          </p>
          <h2>Условия подтверждаются отдельно</h2>
          <p>
            Состав, параметры, доступность исполнения, цена, минимальная партия,
            документы, расчёты и логистика согласуются с поставщиком. На сайте
            не заявлены склад или представительство в России.
          </p>
          <p className="caption">
            Изображения созданы для иллюстрации категорий. Они не показывают
            конкретный SKU, фактическую упаковку или результаты испытаний.
            Предварительная версия сайта требует проверки русского текста и
            подтверждения контактных каналов до запуска заявок.
          </p>
        </div>
      </section>
      <ProjectCta />
    </>
  );
}
