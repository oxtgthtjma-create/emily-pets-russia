import Link from "next/link";
import { Arrow } from "./icons";
export default function ProjectCta() {
  return (
    <section className="project-cta container">
      <div>
        <h2>
          Ваш следующий ассортимент
          <br />
          начинается с проекта.
        </h2>
        <p>Соберите требования, чтобы обсуждать конкретные условия.</p>
      </div>
      <Link className="button button-peach" href="/project">
        Подготовить проект
        <Arrow />
      </Link>
    </section>
  );
}
