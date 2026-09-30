/* =========================================================
   STORAGE
   Responsabilidade: persistência de dados no navegador.
   Não conhece o DOM, o formulário nem a SPA.
========================================================= */

const CHAVE_CADASTRO = "cadastroImpulsionar";

/* Converte o objeto para JSON e grava no localStorage.
   Retorna true se salvou e false se falhou. */
export function salvarCadastro(dados) {
  try {
    localStorage.setItem(CHAVE_CADASTRO, JSON.stringify(dados));
    return true;
  } catch (erro) {
    console.error("Não foi possível salvar os dados no navegador:", erro);
    return false;
  }
}

/* Lê o JSON do localStorage e converte de volta para objeto.
   Retorna null se não houver dados ou se eles estiverem inválidos. */
export function recuperarCadastro() {
  try {
    const dadosSalvos = localStorage.getItem(CHAVE_CADASTRO);
    return dadosSalvos ? JSON.parse(dadosSalvos) : null;
  } catch (erro) {
    console.error("Não foi possível recuperar os dados salvos:", erro);
    return null;
  }
}