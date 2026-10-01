/* =========================================================
   FORMULÁRIO
   Responsabilidade: interface do cadastro (máscaras,
   validação, modal e alerta).
   A gravação/leitura dos dados é delegada ao storage.js.
========================================================= */

import { salvarCadastro, recuperarCadastro } from "./storage.js";

/* ---------- Máscaras ---------- */

function aplicarMascaraTelefone(campo) {
  campo.addEventListener("input", function () {
    let valor = campo.value.replace(/\D/g, "");

    if (valor.length > 11) {
      valor = valor.slice(0, 11);
    }

    if (valor.length > 6) {
      campo.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    } else if (valor.length > 2) {
      campo.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else {
      campo.value = valor;
    }
  });
}

function aplicarMascaraCep(campo) {
  campo.addEventListener("input", function () {
    let valor = campo.value.replace(/\D/g, "");

    if (valor.length > 8) {
      valor = valor.slice(0, 8);
    }

    if (valor.length > 5) {
      campo.value = `${valor.slice(0, 5)}-${valor.slice(5)}`;
    } else {
      campo.value = valor;
    }
  });
}

/* ---------- Preenchimento com dados salvos ---------- */

function preencherComDadosSalvos(formulario) {
  const dadosSalvos = recuperarCadastro();

  if (!dadosSalvos) {
    return;
  }

  Object.keys(dadosSalvos).forEach(function (nomeCampo) {
    const campo = formulario.elements[nomeCampo];

    if (campo) {
      campo.value = dadosSalvos[nomeCampo];
    }
  });
}

/* ---------- Inicialização (chamada a cada carga de página) ---------- */

export function inicializarFormulario() {
  const formulario = document.querySelector(".formulario form");

  /* Fora da página de cadastro, não faz nada */
  if (!formulario) {
    return;
  }

  const telefone = document.querySelector("#telefone");
  const cep = document.querySelector("#cep");
  const botaoEnviar = document.querySelector("#botaoEnviar");
  const modalConfirmacao = document.querySelector("#modalConfirmacao");
  const botaoCancelar = document.querySelector("#botaoCancelar");
  const botaoConfirmar = document.querySelector("#botaoConfirmar");
  const alertaSucesso = document.querySelector("#alertaSucesso");

  preencherComDadosSalvos(formulario);

  if (telefone) {
    aplicarMascaraTelefone(telefone);
  }

  if (cep) {
    aplicarMascaraCep(cep);
  }

  if (!botaoEnviar || !modalConfirmacao || !botaoCancelar || !botaoConfirmar) {
    return;
  }

  function abrirModal() {
    modalConfirmacao.classList.add("ativo");
    botaoCancelar.focus();
  }

  function fecharModal() {
    modalConfirmacao.classList.remove("ativo");
    botaoEnviar.focus({ preventScroll: true });
  }

  botaoEnviar.addEventListener("click", function () {
    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return;
    }

    abrirModal();
  });

  botaoCancelar.addEventListener("click", fecharModal);

  /* Esc fecha o modal */
  modalConfirmacao.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
      fecharModal();
    }
  });

  botaoConfirmar.addEventListener("click", function () {
    /* Os dados precisam ser lidos ANTES do reset() */
    const dadosCadastro = Object.fromEntries(
      new FormData(formulario).entries()
    );

    salvarCadastro(dadosCadastro);

    fecharModal();

    if (alertaSucesso) {
      alertaSucesso.classList.add("ativo");
      alertaSucesso.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    formulario.reset();
  });
} 