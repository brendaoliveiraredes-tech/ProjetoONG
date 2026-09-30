/* =========================================================
   SPA (Single Page Application)
   Responsabilidade: navegar sem recarregar a página.
   Fluxo: clique -> preventDefault -> fetch -> DOMParser
          -> #conteudo-principal -> innerHTML -> pushState

   Este módulo NÃO conhece cursos, formulário nem menu.
   Quem quiser reagir à troca de página passa uma função
   (callback) para iniciarSPA().
========================================================= */

export function iniciarSPA(aoCarregarPagina) {
  const conteudoPrincipal = document.querySelector("#conteudo-principal");

  if (!conteudoPrincipal) {
    return;
  }

  /* Permite receber foco via JavaScript (acessibilidade) */
  conteudoPrincipal.setAttribute("tabindex", "-1");

  /* Intercepta o clique nos links com data-rota */
  document.querySelectorAll("[data-rota]").forEach(function (link) {
    link.addEventListener("click", function (evento) {
      evento.preventDefault();
      carregarPagina(link.getAttribute("data-rota"));
    });
  });

  /* Botões Voltar/Avançar do navegador */
  window.addEventListener("popstate", function () {
    const rota = window.location.pathname.split("/").pop() || "index.html";
    carregarPagina(rota, false);
  });

  async function carregarPagina(rota, atualizarHistorico = true) {
    try {
      const resposta = await fetch(rota);

      if (!resposta.ok) {
        throw new Error("Página não encontrada.");
      }

      const html = await resposta.text();
      const documento = new DOMParser().parseFromString(html, "text/html");

      /* Conteúdo principal */
      const novoConteudo = documento.querySelector("#conteudo-principal");

      if (!novoConteudo) {
        throw new Error("Área principal não encontrada.");
      }

      conteudoPrincipal.innerHTML = novoConteudo.innerHTML;

      /* Subtítulo do cabeçalho */
      const novoSubtitulo = documento.querySelector(".subtitulo");
      const subtituloAtual = document.querySelector(".subtitulo");

      if (novoSubtitulo && subtituloAtual) {
        subtituloAtual.textContent = novoSubtitulo.textContent.trim();
      }

      /* Título da aba */
      document.title = documento.title;

      /* URL */
      if (atualizarHistorico) {
        window.history.pushState({ rota: rota }, "", rota);
      }

      /* Topo da página */
      window.scrollTo(0, 0);

      /* Avisa quem estiver interessado que o conteúdo mudou */
      if (typeof aoCarregarPagina === "function") {
        aoCarregarPagina();
      }

      /* Leitores de tela: leva o foco para o novo conteúdo */
      conteudoPrincipal.focus({ preventScroll: true });
    } catch (erro) {
      console.error(erro);
      conteudoPrincipal.innerHTML =
        "<p>Não foi possível carregar o conteúdo solicitado.</p>";
    }
  }
}