import FooterVideoProfiles from "./footer-video-profiles";
import Link from "next/link";
import FooterInquiry from "./footer-inquiry";
import { showcaseProducts } from "../data/products";
function ContactIcon({ kind }: { kind: "phone" | "pin" | "mail" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      {kind === "phone" ? (
        <path d="m5 3 4 1 1 5-3 2a16 16 0 0 0 6 6l2-3 5 1 1 4c-1 3-5 3-9 1S4 12 3 8s0-5 2-5Z" />
      ) : kind === "pin" ? (
        <>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      ) : (
        <>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m3 5 9 8 9-8" />
        </>
      )}
    </svg>
  );
}
export default function SiteFooter() {
  return (
    <footer className="company-footer" id="contacts">
      <div className="container">
        <div className="company-footer-grid">
          <section className="footer-company" aria-label="Компания и контакты">
            <Link className="brand" href="/">
              Emily<span> pets</span>
            </Link>
            <p className="footer-legal-name">
              PUYUAN (DALIAN)
              <br />
              PET PRODUCTS CO., LTD.
            </p>
            <p>
              Компания основана в 2000 году. Разработка, производство и экспорт
              наполнителей и подстилок для домашних животных. Emily pets — бренд
              компании.
            </p>
            <address>
              <a href="tel:+8641139020511">
                <ContactIcon kind="phone" />
                <span>+86-411-39020511</span>
              </a>
              <div>
                <ContactIcon kind="pin" />
                <span>
                  Офисы 704/705/706, Europark Soho A1,
                  <br />№ 96, Changjiang East Road,
                  <br />
                  район Чжуншань, Далянь, Китай.
                </span>
              </div>
              <a href="mailto:emily@emilypets.com">
                <ContactIcon kind="mail" />
                <span>emily@emilypets.com</span>
              </a>
            </address>
          </section>
          <nav className="footer-link-column" aria-label="Быстрые ссылки">
            <h2>Навигация</h2>
            <Link href="/">Главная</Link>
            <Link href="/about">О компании</Link>
            <Link href="/assortment">Продукция</Link>
            <Link href="/blog">Блог</Link>
            <Link href="/freight">Морская доставка</Link>
            <a href="#contacts">Контакты</a>
          </nav>
          <nav className="footer-link-column" aria-label="Продукция в подвале">
            <h2>Продукция</h2>
            {showcaseProducts.map((product) => (
              <Link key={product.id} href={"/assortment#product-" + product.id}>
                {product.name}
              </Link>
            ))}
            <a
              href="https://emilypets.com/product/bathing-sand/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Песок для купания ↗
            </a>
            <a
              href="https://emilypets.com/product-category/cat-snack/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Лакомства для кошек ↗
            </a>
            <span className="footer-small">↗ Основной сайт</span>
          </nav>
          <FooterInquiry />
        </div>
        <FooterVideoProfiles />
        <div className="company-footer-bottom">
          <p>
            © {new Date().getUTCFullYear()} PUYUAN (DALIAN) PET PRODUCTS CO.,
            LTD.
          </p>
          <details>
            <summary>Данные и конфиденциальность</summary>
            <p>
              Эта форма не отправляет и не сохраняет сведения на сервере сайта.
              При открытии письма введённые данные передаются вашей почтовой
              программе. Не включайте конфиденциальные сведения. По вопросам
              обработки данных:{" "}
              <a href="mailto:emily@emilypets.com">emily@emilypets.com</a>.
            </p>
          </details>
          <span>Русский · Российский рынок</span>
        </div>
      </div>
    </footer>
  );
}
