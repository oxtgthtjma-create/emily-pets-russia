import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "../components/icons";
import MobileMenu from "../components/mobile-menu";
import "./style.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://emily-pets-russia.vercel.app"),
  title: {
    default: "Закупочные проекты для российского рынка | Emily pets",
    template: "%s | Emily pets",
  },
  description:
    "Наполнители для кошек и подстилки Emily pets: подготовьте ассортимент и русскоязычную спецификацию закупочного проекта.",
  robots: { index: false, follow: true },
};
function Navigation() {
  return (
    <>
      <Link href="/assortment">Ассортимент</Link>
      <Link href="/#how-it-works">Как это работает</Link>
      <Link href="/about">О проекте</Link>
    </>
  );
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" dir="ltr">
      <body>
        <a className="skip" href="#main">
          К содержимому
        </a>
        <div className="utility">
          <div className="container">
            <span>Для импортёров, дистрибьюторов и розничных сетей</span>
            <span className="language">Русский</span>
          </div>
        </div>
        <header className="site-header container">
          <Link className="brand" href="/" aria-label="Emily pets — главная">
            Emily<span> pets</span>
          </Link>
          <nav className="desktop-nav" aria-label="Основная навигация">
            <Navigation />
          </nav>
          <Link className="button header-cta" href="/project">
            Подготовить проект
          </Link>
          <MobileMenu>
            <Navigation />
            <Link href="/project">Подготовить проект</Link>
          </MobileMenu>
        </header>
        <nav className="category-nav container" aria-label="Категории">
          <Link href="/assortment#cat-litter">Наполнители для кошек</Link>
          <Link href="/assortment#bedding">Подстилки для мелких животных</Link>
        </nav>
        <main id="main">{children}</main>
        <footer className="site-footer container">
          <div className="footer-top">
            <Link className="brand" href="/">
              Emily<span> pets</span>
            </Link>
            <nav aria-label="Навигация в подвале">
              <Navigation />
            </nav>
            <Link className="inline-link" href="/project">
              Начать проект
              <Arrow />
            </Link>
          </div>
          <div className="footer-bottom">
            <span>Наполнители и подстилки · Российский рынок</span>
            <span>
              Предварительная версия. Условия поставки подтверждаются отдельно.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
