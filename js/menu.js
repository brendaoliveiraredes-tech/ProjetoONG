/* =========================================================
   MENU
   Responsabilidade: abrir e fechar o menu hambúrguer (mobile).
   O menu faz parte da estrutura permanente da SPA, então
   inicializarMenu() deve ser chamada UMA única vez.
========================================================= */

export function inicializarMenu() {
  const botaoMenu = document.querySelector(".menu-hamburguer");
  const menuLinks = document.querySelector(".nav-links");

  if (!botaoMenu || !menuLinks) {
    return;
  }

  botaoMenu.addEventListener("click", function () {
    const aberto = menuLinks.classList.toggle("ativo");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
  });
}

/* Fecha o menu (usada depois de uma navegação no mobile). */
export function fecharMenu() {
  const botaoMenu = document.querySelector(".menu-hamburguer");
  const menuLinks = document.querySelector(".nav-links");

  if (!botaoMenu || !menuLinks) {
    return;
  }

  menuLinks.classList.remove("ativo");
  botaoMenu.setAttribute("aria-expanded", "false");
}