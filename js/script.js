/* =========================================================
   SCRIPT PRINCIPAL (ponto de entrada)
   Responsabilidade: apenas integrar os módulos.
   Não contém regra de negócio: cada módulo cuida do seu assunto.

   menu.js        -> menu hambúrguer
   spa.js         -> navegação sem recarregar a página
   cursos.js      -> dados e template dos cursos
   formulario.js  -> máscaras, validação, modal e alerta
   storage.js     -> localStorage (usado por formulario.js)
========================================================= */

import { inicializarMenu, fecharMenu } from "./menu.js";
import { iniciarSPA } from "./spa.js";
import { renderizarCursos } from "./cursos.js";
import { inicializarFormulario } from "./formulario.js";

/* Componentes que dependem do conteúdo de #conteudo-principal.
   Precisam rodar de novo a cada troca de página da SPA. */
function inicializarConteudo() {
  renderizarCursos();
  inicializarFormulario();
}

/* O menu é permanente: inicializa uma única vez. */
inicializarMenu();

/* A SPA avisa (callback) quando um novo conteúdo entra no DOM. */
iniciarSPA(function () {
  fecharMenu();
  inicializarConteudo();
});

/* Primeira carga da página (acesso direto ou recarregamento). */
inicializarConteudo();