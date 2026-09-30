# Impulsionar

O projeto Impulsionar, é um projeto acadêmico de uma iniciativa social voltada à **inclusão digital, capacitação e empregabilidade**. O site apresenta a iniciativa, seus projetos, cursos de capacitação e um formulário para quem deseja participar como voluntário, doador ou parceiro.

 
Autora: Brenda Oliveira Santos

Curso/Disciplina: Análise e Desenvolvimento de Sistemas – Desenvolvimento de front-end para Web

Instituição: Universidade Cruzeiro do Sul/ Unifran
 

---

 

## 1. Funcionalidades

 

- Páginas: Início, Projetos, Capacitação e Faça parte (cadastro).

- Menu de navegação com submenu e menu hambúrguer no celular.

- Navegação no modelo **SPA (Single Page Application)**, sem recarregar a página.

- **Sistema de templates** em JavaScript para gerar os cards de cursos.

- Formulário de cadastro com validação HTML e JavaScript.

- Máscaras de **telefone** e **CEP**.

- **Modal** de confirmação antes do envio e **alerta** de sucesso.

- Persistência dos dados do cadastro com **localStorage**.

- Layout responsivo e cuidados de acessibilidade.



## 2. Tecnologias

 

HTML5, CSS3 e JavaScript (ES6 Modules). Ícones do rodapé: Font Awesome, carregado por CDN (precisa de internet).

 

## 3. Estrutura de pastas

 

```

ProjetoONG/

├── .vscode/

│   └── settings.json

├── css/

│   ├── style.css          → estilo geral do site

│   └── formularios.css    → formulário, alerta e modal

├── html/

│   ├── index.html

│   ├── projetos.html

│   ├── capacitacao.html

│   └── cadastro.html

├── imagens/

│   └── logo_projeto_impulsionar.png

├── js/

│   ├── script.js          → arquivo mestre (integra os módulos)

│   ├── menu.js

│   ├── spa.js

│   ├── cursos.js

│   ├── formulario.js

│   └── storage.js

├── ProjetoONG.code-workspace

└── README.md

```

 

### Separation of Concerns

 

| Tecnologia | Responsabilidade |

|---|---|

| HTML | Estrutura e semântica |

| CSS | Apresentação visual e responsividade |

| JavaScript | Comportamento: SPA, templates, validação, manipulação do DOM |

| Imagens | Recursos visuais |

 

Cada pasta reúne um único tipo de recurso, e cada tecnologia cuida só da sua responsabilidade.

 

## 4. Como executar

 

O projeto usa `fetch()` (SPA) e módulos ES6, que **não funcionam abrindo o arquivo direto do computador** (`file://`). É preciso um servidor local:

 

1. Abra a pasta do projeto no VS Code.

2. Instale a extensão **Live Server**.

3. Clique com o botão direito em `html/index.html` e escolha **Open with Live Server**.



## 5. HTML e semântica

 

- Estrutura com `header`, `nav`, `main`, `section`, `article` e `footer`.

- `h1` no cabeçalho (nome do site), `h2` para o título de cada página e `h3` para os títulos dos cards.

- Todas as páginas possuem `<main id="conteudo-principal">`, que é a área substituída pela SPA.

- Cards repetitivos e independentes (destaques, projetos e cursos) usam `article`.

- Textos em caixa alta são controlados pelo CSS (`text-transform`), não escritos em maiúsculas no HTML.

- Formulário com `fieldset`, `legend`, `label` associado a cada campo (`for`/`id`), `required`, tipos adequados (`email`, `tel`), `pattern`, `inputmode` e `autocomplete`.



## 6. CSS

 

- **`style.css`:** variáveis, corpo, cabeçalho, menu, conteúdo, tipografia, cards, botões gerais, badge, rodapé e responsividade.

- **`formularios.css`:** formulário, `fieldset`, `legend`, `label`, campos, botão do formulário, alerta de sucesso e modal.

- **Padronização:** a tipografia de `h2`, `h3` e `p` é definida uma única vez a partir de `#conteudo-principal`, garantindo o mesmo visual em Início, Projetos e Capacitação.

- **Responsividade:** grid de 12 colunas com 4 breakpoints (1200px, 1000px, 700px e 500px). Os cards passam de 3 por linha para 2 e depois para 1; no celular o menu vira hambúrguer.



## 7. JavaScript modular

 

O JavaScript foi dividido em módulos ES6 (`import`/`export`), cada um com uma responsabilidade:

 

| Arquivo | Responsabilidade |

|---|---|

| `script.js` | Ponto de entrada. Apenas importa e conecta os módulos |

| `menu.js` | Menu hambúrguer e atributo `aria-expanded` |

| `spa.js` | Navegação sem recarregar a página |

| `cursos.js` | Dados dos cursos e template dos cards |

| `formulario.js` | Máscaras, validação, modal e alerta |

| `storage.js` | Leitura e gravação no `localStorage` |

 

**Comunicação entre os módulos:**

 

```

script.js ──► menu.js

          ──► spa.js

          ──► cursos.js

          ──► formulario.js ──► storage.js

```

 

- O `spa.js` não conhece cursos nem formulário: recebe uma função (*callback*) que é chamada quando um novo conteúdo entra no DOM. Quem decide o que reinicializar é o `script.js`.

- O `storage.js` não acessa o DOM; recebe e devolve apenas objetos.

- Não há dependências circulares.



## 8. SPA e manipulação do DOM

 

Os links principais possuem `data-rota`, por exemplo:

 

```html

<a href="capacitacao.html" data-rota="capacitacao.html">Capacitação</a>

```

 

Fluxo da navegação:

 

```

Clique no link

      ↓

preventDefault()            → impede o recarregamento da página

      ↓

identificação da rota       → valor de data-rota

      ↓

fetch()                     → busca o HTML da página

      ↓

DOMParser                   → transforma o texto em documento manipulável

      ↓

querySelector("#conteudo-principal")

      ↓

innerHTML                   → substitui apenas o conteúdo principal

      ↓

novo conteúdo aparece no DOM

```

 

Também são atualizados o título da aba (`document.title`), o subtítulo do cabeçalho, a URL (`history.pushState()`) e a rolagem (`window.scrollTo`). O evento `popstate` faz o botão Voltar/Avançar do navegador funcionar, e o foco é movido para o novo conteúdo para leitores de tela.

 

**Manipulação do DOM:** o JavaScript captura a intenção de navegação, impede o comportamento padrão, busca o HTML correspondente, o transforma em um documento, localiza o elemento principal e substitui somente o seu conteúdo. Cabeçalho, menu e rodapé permanecem no DOM, sem reconstruir o documento inteiro a cada interação.

 

**Limitação:** os links do submenu de Projetos (`projetos.html#inclusao` etc.) usam navegação tradicional, com recarregamento da página.

 

## 9. Sistema de templates

 

Implementado em `cursos.js` e usado na página de Capacitação. O HTML contém apenas o contêiner:

 

```html

<section class="cursos" id="listaCursos"></section>

```

 

Os dados ficam em um array de objetos e o card é gerado por uma função de template:

 

```js

function criarCardCurso(curso) {

  return `

    <article class="curso">

      <h3>${curso.titulo}</h3>

      <p>${curso.descricao}</p>

      <button type="button">Começar</button>

    </article>

  `;

}

```

 

```

Array de dados

      ↓

Template literal com ${}

      ↓

Função de template

      ↓

.map()

      ↓

.join("")

      ↓

innerHTML

      ↓

cards visíveis no DOM

```

 

Como a página é carregada pela SPA, `renderizarCursos()` é chamada depois que o conteúdo é inserido no DOM.

 

## 10. Formulário

 

A página de cadastro possui:

 

- **Dados pessoais:** nome.

- **Dados de contato:** e-mail, telefone e CEP.

- **Forma de contribuição:** voluntário, doador ou parceiro, e mensagem.



**Validação:** atributos HTML (`required`, `type="email"`, `pattern`) e, no JavaScript, `formulario.checkValidity()` e `formulario.reportValidity()`.

 

**Máscaras:** telefone `(38) 99999-9999` e CEP `00000-000`, aplicadas no evento `input`.

 

**Modal de confirmação:** ao clicar em "Enviar cadastro", se o formulário for válido, aparece o modal "Confirmar cadastro?" com os botões Cancelar e Confirmar. O modal é aberto com `classList.add("ativo")` e fechado com `classList.remove("ativo")`. Também fecha com a tecla Esc.

 

**Alerta de sucesso:** após confirmar, aparece "Cadastro realizado com sucesso!". O alerta e o modal ficam dentro de `#conteudo-principal` para serem carregados junto com a página pela SPA.

 

Como o formulário também é carregado dinamicamente, ele é inicializado pela função `inicializarFormulario()`, chamada a cada troca de página.

 

## 11. localStorage

 

Ao confirmar o cadastro, os dados são lidos com `FormData`, convertidos em objeto, transformados em JSON e gravados no navegador:

 

```js

const dadosCadastro = Object.fromEntries(new FormData(formulario).entries());

localStorage.setItem("cadastroImpulsionar", JSON.stringify(dadosCadastro));

```

 

Para recuperar, o texto é convertido de volta com `JSON.parse()`. Ao abrir o formulário, os campos são preenchidos com os dados salvos, se existirem.

 

**Como verificar:** envie o formulário e abra as ferramentas do navegador (F12) → **Application** → **Local Storage** → chave `cadastroImpulsionar`.

 

**Observações:**

 

- O `localStorage` guarda os dados no navegador do usuário, em formato de texto, por isso a conversão para JSON.

- É adequado para demonstração acadêmica, mas **não deve ser usado para armazenar dados pessoais reais**, pois qualquer script da página consegue lê-los.

- Há uma única chave: cada novo cadastro sobrescreve o anterior.



## 12. Acessibilidade

 

- `alt` na imagem do logo e ícones decorativos com `aria-hidden="true"`.

- `label` associado a cada campo do formulário.

- Botões reais para ações e links reais para navegação.

- `aria-label` no `nav`, `aria-expanded` e `aria-controls` no menu hambúrguer.

- Modal com `role="dialog"`, `aria-modal="true"` e `aria-labelledby`; foco vai para o modal ao abrir e volta ao botão ao fechar.

- Foco visível para navegação por teclado.

- `role="alert"` no alerta de sucesso.

- Cores de hover no fundo preto com contraste adequado.



## 13. Versionamento (GitFlow)

 

O repositório segue o modelo GitFlow, mesmo em desenvolvimento individual:

 

| Branch | Uso |

|---|---|

| `main` | Versões estáveis de entrega, marcadas com tags |

| `develop` | Desenvolvimento contínuo, onde as funcionalidades são integradas |

| `feature/*` | Uma branch por funcionalidade, criada a partir da `develop` |

| `release/*` | Preparação da versão de entrega |

| `hotfix/*` | Correções urgentes partindo da `main` (prevista no fluxo, usada apenas quando necessária) |

 

O GitFlow foi adotado a partir da etapa atual do projeto. Os merges usam `--no-ff` para manter o histórico das branches visível.

 

## 14. Limitações conhecidas

 

- Exige servidor local (Live Server) para funcionar.

- Os ícones do rodapé dependem de internet (CDN do Font Awesome).

- Links do submenu com âncora recarregam a página.

- O envio do formulário não vai para um servidor; os dados ficam apenas no navegador.
