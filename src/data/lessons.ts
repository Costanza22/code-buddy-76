export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string[];
  codeTemplate: string;
  expectedOutput: string;
  hint: string;
}

export interface Track {
  id: string;
  tag: string;
  name: string;
  desc: string;
  lessons: Lesson[];
}

export const tracks: Track[] = [
  {
    id: "python",
    tag: "01",
    name: "Python",
    desc: "Simples, poderosa, perfeita pra começar. Automatize tudo.",
    lessons: [
      {
        id: "py-01",
        title: "Olá, Mundo!",
        description: "Seu primeiro programa. Imprima algo na tela.",
        content: [
          "Todo programador começa aqui. A função print() mostra texto na tela.",
          "Texto em Python fica entre aspas: \"assim\" ou 'assim'.",
          "Escreva print(\"Olá, Mundo!\") e rode para ver o resultado.",
        ],
        codeTemplate: '# Escreva seu código aqui\n',
        expectedOutput: "Olá, Mundo!",
        hint: 'Use print("Olá, Mundo!")',
      },
      {
        id: "py-02",
        title: "Variáveis",
        description: "Guarde valores para usar depois.",
        content: [
          "Variáveis são como caixas que guardam informações.",
          "Para criar uma variável, escolha um nome e use = para atribuir um valor.",
          "Crie uma variável 'nome' com seu nome e imprima com print().",
        ],
        codeTemplate: '# Crie uma variável chamada "nome" com seu nome\n# Depois use print(nome) para mostrar\n',
        expectedOutput: "",
        hint: 'nome = "Maria"\nprint(nome)',
      },
      {
        id: "py-03",
        title: "Tipos de dados",
        description: "Números, textos e booleanos.",
        content: [
          "Python tem vários tipos de dados. Os principais são:",
          "str (texto): \"Olá\" — int (inteiro): 42 — float (decimal): 3.14 — bool: True ou False",
          "Use type() para descobrir o tipo de um valor. Experimente: print(type(42))",
        ],
        codeTemplate: '# Descubra o tipo de cada valor\nprint(type("Olá"))\nprint(type(42))\nprint(type(3.14))\nprint(type(True))\n',
        expectedOutput: "<class 'str'>\n<class 'int'>\n<class 'float'>\n<class 'bool'>",
        hint: "Rode o código como está para ver os tipos!",
      },
      {
        id: "py-04",
        title: "Operações matemáticas",
        description: "Some, subtraia, multiplique e divida.",
        content: [
          "Python funciona como uma calculadora. Use +, -, *, / para operações básicas.",
          "** é potência (2**3 = 8) e % é resto da divisão (10%3 = 1).",
          "Calcule quanto é 15 * 4 + 10 e imprima o resultado.",
        ],
        codeTemplate: "# Calcule 15 * 4 + 10\n",
        expectedOutput: "70",
        hint: "print(15 * 4 + 10)",
      },
      {
        id: "py-05",
        title: "Condicionais (if/else)",
        description: "Tome decisões no seu código.",
        content: [
          "Use if para executar código apenas quando uma condição é verdadeira.",
          "else é o que acontece quando a condição é falsa. elif é para condições extras.",
          "Crie um programa que verifica se uma idade é >= 18 e imprime se é maior de idade.",
        ],
        codeTemplate: 'idade = 20\n\n# Use if/else para verificar se é maior de idade\n',
        expectedOutput: "Maior de idade",
        hint: 'if idade >= 18:\n    print("Maior de idade")\nelse:\n    print("Menor de idade")',
      },
      {
        id: "py-06",
        title: "Loops (for)",
        description: "Repita ações automaticamente.",
        content: [
          "O loop for repete um bloco de código para cada item de uma sequência.",
          "range(5) gera os números 0, 1, 2, 3, 4.",
          "Imprima os números de 1 a 5 usando for e range.",
        ],
        codeTemplate: "# Imprima os números de 1 a 5\n",
        expectedOutput: "1\n2\n3\n4\n5",
        hint: "for i in range(1, 6):\n    print(i)",
      },
    ],
  },
  {
    id: "html-css",
    tag: "02",
    name: "HTML & CSS",
    desc: "Estruture e estilize páginas. Resultado visual desde a aula 1.",
    lessons: [
      {
        id: "html-01",
        title: "Sua primeira página",
        description: "Crie uma página HTML básica.",
        content: [
          "HTML é a linguagem que estrutura páginas na web.",
          "Todo documento HTML começa com <!DOCTYPE html> e usa tags como <html>, <head>, <body>.",
          "Dentro de <body>, use <h1> para títulos e <p> para parágrafos.",
        ],
        codeTemplate: '<!DOCTYPE html>\n<html>\n<body>\n  <!-- Adicione um título h1 e um parágrafo -->\n</body>\n</html>',
        expectedOutput: "",
        hint: "<h1>Minha Página</h1>\n<p>Bem-vindo!</p>",
      },
      {
        id: "html-02",
        title: "Links e imagens",
        description: "Conecte páginas e adicione imagens.",
        content: [
          "A tag <a> cria links. O atributo href define para onde o link aponta.",
          "A tag <img> mostra imagens. Use src para o endereço e alt para descrição.",
          "Exemplo: <a href=\"https://example.com\">Clique aqui</a>",
        ],
        codeTemplate: '<!-- Crie um link e adicione uma imagem -->\n',
        expectedOutput: "",
        hint: '<a href="https://example.com">Meu Link</a>\n<img src="foto.jpg" alt="Descrição">',
      },
      {
        id: "html-03",
        title: "CSS básico",
        description: "Dê cor e estilo à sua página.",
        content: [
          "CSS controla a aparência do HTML. Você pode mudar cores, tamanhos, fontes.",
          "Use a tag <style> dentro de <head> ou o atributo style diretamente no elemento.",
          "Propriedades comuns: color, background-color, font-size, margin, padding.",
        ],
        codeTemplate: '<h1 style="/* adicione cor aqui */">Título Estilizado</h1>',
        expectedOutput: "",
        hint: '<h1 style="color: blue; font-size: 32px;">Título Estilizado</h1>',
      },
    ],
  },
  {
    id: "javascript",
    tag: "03",
    name: "JavaScript",
    desc: "A linguagem da web. Interatividade, lógica, e muito console.log.",
    lessons: [
      {
        id: "js-01",
        title: "Console.log",
        description: "Imprima mensagens no console.",
        content: [
          "console.log() é como o print() do Python — mostra valores no console.",
          "Você pode imprimir textos, números, e até expressões matemáticas.",
          "Tente: console.log(\"Olá, JavaScript!\")",
        ],
        codeTemplate: '// Imprima "Olá, JavaScript!" no console\n',
        expectedOutput: "Olá, JavaScript!",
        hint: 'console.log("Olá, JavaScript!")',
      },
      {
        id: "js-02",
        title: "Variáveis (let e const)",
        description: "Armazene dados com let e const.",
        content: [
          "let cria uma variável que pode mudar. const cria uma que não pode.",
          "Use const sempre que possível — é mais seguro. Use let quando precisar mudar o valor.",
          "Crie uma constante com seu nome e imprima.",
        ],
        codeTemplate: '// Crie uma constante "nome" e imprima\n',
        expectedOutput: "",
        hint: 'const nome = "Maria";\nconsole.log(nome);',
      },
      {
        id: "js-03",
        title: "Funções",
        description: "Crie blocos reutilizáveis de código.",
        content: [
          "Funções são blocos de código que executam uma tarefa específica.",
          "Use function nome() { } ou const nome = () => { } (arrow function).",
          "Crie uma função que recebe um nome e retorna uma saudação.",
        ],
        codeTemplate: '// Crie uma função "saudacao" que recebe um nome\n// e retorna "Olá, [nome]!"\n',
        expectedOutput: "Olá, Mundo!",
        hint: 'function saudacao(nome) {\n  return "Olá, " + nome + "!";\n}\nconsole.log(saudacao("Mundo"));',
      },
    ],
  },
  {
    id: "react",
    tag: "04",
    name: "React",
    desc: "Componentes, estado, hooks. Construa apps de verdade.",
    lessons: [
      {
        id: "react-01",
        title: "O que é React?",
        description: "Entenda componentes e JSX.",
        content: [
          "React é uma biblioteca para construir interfaces. Tudo é um componente.",
          "Componentes são funções que retornam JSX — um HTML turbinado dentro do JavaScript.",
          "Exemplo: function App() { return <h1>Olá!</h1> }",
        ],
        codeTemplate: '// Crie um componente que mostra seu nome\nfunction MeuComponente() {\n  return (\n    // Seu JSX aqui\n  );\n}',
        expectedOutput: "",
        hint: 'function MeuComponente() {\n  return <h1>Meu nome é Maria</h1>;\n}',
      },
      {
        id: "react-02",
        title: "Props",
        description: "Passe dados entre componentes.",
        content: [
          "Props são argumentos que você passa para um componente, como parâmetros de função.",
          "O componente pai define as props, o filho recebe e usa.",
          "Exemplo: <Saudacao nome=\"Maria\" /> → function Saudacao({ nome }) { return <p>Oi, {nome}</p> }",
        ],
        codeTemplate: '// Crie um componente Cartao que recebe "titulo" e "descricao" como props\n',
        expectedOutput: "",
        hint: 'function Cartao({ titulo, descricao }) {\n  return (\n    <div>\n      <h2>{titulo}</h2>\n      <p>{descricao}</p>\n    </div>\n  );\n}',
      },
    ],
  },
];

export function getTrack(id: string) {
  return tracks.find(t => t.id === id);
}

export function getLesson(trackId: string, lessonId: string) {
  const track = getTrack(trackId);
  if (!track) return null;
  const index = track.lessons.findIndex(l => l.id === lessonId);
  if (index === -1) return null;
  return {
    lesson: track.lessons[index],
    track,
    index,
    prev: track.lessons[index - 1] || null,
    next: track.lessons[index + 1] || null,
  };
}
