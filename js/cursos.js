/* =========================================================
   CURSOS (sistema de templates)
   Responsabilidade: dados dos cursos + template do card.
   Fluxo: array -> template literal -> map() -> join() -> innerHTML
========================================================= */

const cursos = [
  {
    titulo: "Primeiros passos no digital",
    descricao: "Aprenda a utilizar ferramentas e recursos digitais de forma simples e prática."
  },
  {
    titulo: "Internet e segurança",
    descricao: "Aprenda a navegar pela internet com mais segurança e identificar possíveis riscos."
  },
  {
    titulo: "Ferramentas profissionais",
    descricao: "Conheça ferramentas digitais que podem ajudar no desenvolvimento profissional."
  },
  {
    titulo: "Currículo e empregabilidade",
    descricao: "Aprenda a criar um currículo e apresentar suas experiências de forma profissional."
  },
  {
    titulo: "Como buscar oportunidades",
    descricao: "Aprenda a utilizar plataformas digitais para encontrar oportunidades de trabalho."
  },
  {
    titulo: "Preparação para entrevistas",
    descricao: "Desenvolva estratégias para se preparar melhor para entrevistas de emprego."
  }
];

function criarCardCurso(curso) {
  return `
    <article class="curso">
      <h3>${curso.titulo}</h3>
      <p>${curso.descricao}</p>
      <button type="button">Começar</button>
    </article>
  `;
}

/* Se a página atual não tem #listaCursos, não faz nada. */
export function renderizarCursos() {
  const listaCursos = document.querySelector("#listaCursos");

  if (!listaCursos) {
    return;
  }

  listaCursos.innerHTML = cursos.map(criarCardCurso).join("");
}