import Link from "next/link";
import {
  PackagingStudio,
  ProductQuiz,
  MaterialExplorer,
} from "../../components/interactive-experiences";
export const metadata = {
  title: "Откройте ассортимент — интерактив Emily pets",
  description:
    "Попробуйте упаковку, пройдите короткий тест и познакомьтесь с материалами Emily pets в интерактивном формате.",
  alternates: { canonical: "/explore" },
};
export default function Explore() {
  return (
    <>
      <section className="page-intro container">
        <Link href="/" className="breadcrumb">
          Главная
        </Link>
        <h1>
          Ассортимент,
          <br />с которым можно поиграть.
        </h1>
        <p className="lead">
          Выбирайте, сравнивайте и представляйте продукт на своей полке.
        </p>
        <nav className="tools-shortcuts" aria-label="Интерактивные возможности">
          <a href="#studio">Упаковка ↓</a>
          <a href="#quiz">Тест за 30 секунд ↓</a>
          <a href="#materials">Материалы ↓</a>
        </nav>
        <p className="caption">
          Ваши выборы остаются в открытой странице. Никакой регистрации.
        </p>
      </section>
      <div className="container experience-stack">
        <PackagingStudio />
        <ProductQuiz />
        <MaterialExplorer />
      </div>
    </>
  );
}
