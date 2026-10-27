import Link from "next/link";
export default function PurchaseOptions() {
  return (
    <section
      className="section container purchase-options"
      aria-labelledby="purchase-title"
    >
      <div className="section-heading">
        <h2 id="purchase-title">
          Ваш ассортимент.
          <br />
          Два формата сотрудничества.
        </h2>
        <p>
          Выбирайте Emily pets в фирменной упаковке или продукцию под вашим
          брендом.
        </p>
      </div>
      <div className="purchase-grid">
        <article>
          <span className="eyebrow">EMILY PETS</span>
          <h3>Наш бренд — на вашей полке</h3>
          <p>
            Для дистрибьюторов, зоомагазинов и сетей, которым интересен
            ассортимент в существующем оформлении Emily pets.
          </p>
          <ul>
            <li>Выбор продукта и опубликованных фасовок</li>
            <li>Фирменный дизайн без разработки нового бренда</li>
            <li>Согласование маркировки, партии и доступности</li>
          </ul>
          <Link className="button" href="/project?mode=brand">
            Выбрать Emily pets
          </Link>
        </article>
        <article>
          <span className="eyebrow">ВАШ БРЕНД</span>
          <h3>Упаковка под вашу марку</h3>
          <p>
            Для компаний, которые развивают собственную линейку и хотят
            согласовать оформление, фасовку и характеристики.
          </p>
          <ul>
            <li>Материал и параметры по спецификации</li>
            <li>Макет, упаковка и название вашей марки</li>
            <li>Отдельное согласование MOQ и условий</li>
          </ul>
          <Link className="button secondary" href="/project?mode=custom">
            Обсудить свой бренд
          </Link>
        </article>
      </div>
    </section>
  );
}
