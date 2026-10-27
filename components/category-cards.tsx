import Image from "next/image";
import Link from "next/link";
import { categories } from "../data/categories";
import { Arrow } from "./icons";
export default function CategoryCards() {
  return (
    <div className="category-grid">
      {categories.map((c) => (
        <article className="category-card" key={c.id}>
          <Link
            className="category-image"
            href={`/assortment#${c.id}`}
            tabIndex={-1}
            aria-hidden="true"
          >
            <Image
              src={c.image}
              alt=""
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </Link>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <Link className="inline-link" href={`/project?category=${c.id}`}>
            Выбрать для проекта
            <Arrow />
          </Link>
        </article>
      ))}
    </div>
  );
}
