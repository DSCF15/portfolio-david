// ─────────────────────────────────────────────────────────────
//  Todo o conteúdo do portefólio vive aqui.
//  Edita este ficheiro para mudar textos, projetos e links.
//  Os componentes não precisam de ser tocados.
// ─────────────────────────────────────────────────────────────

export const identity = {
  name: "David França",
  role: "Product Designer & Engenheiro Informático",
  location: "Caniço, Madeira",
  coords: "32.65° N · 16.84° W",
  timezone: "Atlantic/Madeira",
  available: true, // mostra "Disponível para novos projetos"
  headline: ["Desenho o lado do vidro", "que as pessoas veem."],
  intro:
    "Product Designer com formação em Engenharia Informática. Transformo problemas confusos em produtos claros, da estratégia ao código em produção.",
  metaDescription:
    "David França, Product Designer e Engenheiro Informático na Madeira. UX/UI, estratégia de produto e desenvolvimento web.",
};

// Projetos em destaque. A ordem aqui é a ordem no site.
// `plate` escolhe a ilustração do cartão: "rhythm" | "calendar" | "orders" | "brands".
export const projects = [
  {
    id: "tese",
    index: "01",
    title: "Um jogo que fala com quem não lê",
    client: "Dissertação de Mestrado · Associação Os Grandes Azuis",
    year: "2026",
    status: "Em curso",
    role: "Investigação, game design, desenvolvimento",
    plate: "rhythm",
    summary:
      "Jogo de ritmo para treinar a coordenação motora em crianças e jovens com perturbação do espetro do autismo.",
    story: {
      contexto:
        "Projeto de dissertação desenvolvido com a Associação Os Grandes Azuis e acompanhado por docentes da Universidade da Madeira.",
      tensao:
        "Muitos dos jogadores não leem, e uma mudança inesperada no ecrã pode ser suficiente para abandonarem a sessão. Os jogos de ritmo comuns pedem o contrário: texto, menus e estímulos constantes.",
      decisao:
        "Instruções só por áudio, cores vivas com significado fixo, imagens em vez de palavras e rotinas sempre iguais. O toque é a única forma de interação, em tablet e telemóvel.",
      resultado:
        "Protótipo em desenvolvimento com validação junto da associação.",
    },
    stack: ["Game design", "Acessibilidade", "Investigação com utilizadores"],
    links: [],
  },
  {
    id: "agenda",
    index: "02",
    title: "Uma agenda para muitos salões",
    client: "Plataforma SaaS de marcações",
    year: "2025 — 2026",
    status: null,
    role: "Produto, UX/UI, frontend e backend",
    plate: "calendar",
    summary:
      "Plataforma multi-salão onde cada negócio tem o seu espaço, a sua equipa e a sua agenda, numa única base de código.",
    story: {
      contexto:
        "Barbearias e salões pequenos ainda marcam muitos clientes ao telefone. Um sistema feito à medida para cada um seria caro de construir e de manter.",
      tensao:
        "Construir um sistema por cliente não escala. Um sistema partilhado não pode deixar os dados de um salão aparecer noutro.",
      decisao:
        "Arquitetura multi-tenant: cada salão é isolado pelo seu subdomínio, com serviços, profissionais e planos próprios. O cliente escolhe serviço, profissional e hora num calendário, e confirma por email.",
      resultado:
        "Painel de administração, estatísticas por salão e configuração já preparada para salões reais, como a Barbearia J.",
    },
    stack: ["React", "Vite", "Tailwind", "Node.js", "Express", "MongoDB", "JWT"],
    links: [{ label: "Código no GitHub", href: "https://github.com/DSCF15/scheduling-system-api" }],
  },
  {
    id: "bolos",
    index: "03",
    title: "Bolo de mel, por encomenda",
    client: "Sistema de encomendas para pastelaria tradicional",
    year: "2025",
    status: null,
    role: "Produto, UX/UI, desenvolvimento e infraestrutura",
    plate: "orders",
    summary:
      "Loja de encomendas com painel de gestão para uma pastelaria de produtos tradicionais da Madeira, alojada num Raspberry Pi.",
    story: {
      contexto:
        "Uma pastelaria de bolo de mel e cabazes de tradição precisava de receber encomendas online e de controlar os horários de levantamento.",
      tensao:
        "A solução não podia trazer custos mensais de alojamento nem obrigar a equipa a aprender uma ferramenta complicada.",
      decisao:
        "Duas aplicações com objetivos diferentes: uma loja simples para o cliente e um painel de gestão para a pastelaria, com horários de levantamento definidos por ela. A API corre num Raspberry Pi, com custo mensal próximo de zero.",
      resultado:
        "Encomendas, horários e gestão num só fluxo, sem dependência de serviços pagos.",
    },
    stack: ["React", "Node.js", "Express", "SQLite", "Raspberry Pi"],
    links: [{ label: "Código no GitHub", href: "https://github.com/DSCF15/smart-cake-ordering-system" }],
  },
  {
    id: "cassianos",
    index: "04",
    title: "Seis negócios, uma só porta de entrada",
    client: "Cassiano's · Site institucional",
    year: "2025",
    status: null,
    role: "Direção visual, UX/UI e frontend",
    plate: "brands",
    summary:
      "Site para um grupo com seis negócios diferentes: oficina, lavagem automóvel, energia, eventos, snack-bar e pizzaria.",
    story: {
      contexto:
        "O grupo Cassiano's junta negócios que pouco têm em comum, da lavagem automóvel à pizzaria Mr. Pizza.",
      tensao:
        "Um único site arriscava ser confuso. Seis sites separados dividiam a marca e multiplicavam a manutenção.",
      decisao:
        "Uma entrada comum com a marca do grupo e uma página por negócio, cada uma com cabeçalho e identidade próprios. Mapa com localização, galerias e movimento discreto para dar vida às secções.",
      resultado:
        "Uma marca coerente onde cada cliente chega ao negócio que procura em poucos cliques.",
    },
    stack: ["React", "GSAP", "Framer Motion", "Leaflet", "Swiper"],
    links: [{ label: "Código no GitHub", href: "https://github.com/DSCF15/cassianos" }],
  },
];

// Trabalhos mais pequenos, mostrados numa lista compacta.
export const moreWork = [
  {
    title: "Barbearia J",
    note: "Site de montra com galeria, produtos e mapa",
    stack: "React · Vite · Tailwind",
    href: "https://github.com/DSCF15/BarbeariaSite",
  },
  {
    title: "Este portefólio",
    note: "Next.js com exportação estática",
    stack: "Next.js · Tailwind",
    href: "https://github.com/DSCF15/portfolio-david",
  },
];

// Experiência profissional na área.
export const experience = {
  company: "ANTURIO Business Software",
  role: "Estágio em desenvolvimento de software",
  period: "Fev — Jun 2025",
  intro:
    "Software house especializada em soluções à medida e integração com o ERP PHC. Aprendi WinDev e WinDev Mobile numa semana e passei a entregar trabalho real.",
  highlights: [
    {
      title: "Interface da aplicação Vestan",
      text: "Desenhei e construí o frontend de uma aplicação de gestão de fábrica e armazém. O ecrã principal passou por três versões até a informação ficar organizada para quem a usa no chão de fábrica.",
    },
    {
      title: "Uma lista que mentia",
      text: "Numa app de terreno, “100 km” aparecia antes de “30 km” porque as distâncias eram ordenadas como texto. Corrigi a ordenação para os técnicos verem primeiro o que está mais perto.",
    },
    {
      title: "Commits que chegam à gestão",
      text: "Script diário que recolhe a atividade de todos os repositórios Git da empresa e a integra no ERP PHC, com um painel de atividade por programador.",
    },
    {
      title: "Registo de chamadas automático",
      text: "Função em Java que transforma o registo de chamadas do telemóvel em dados estruturados prontos para o histórico de cada cliente no ERP.",
    },
  ],
};

export const education = [
  {
    title: "Mestrado em Engenharia Informática",
    where: "Universidade da Madeira",
    period: "Em curso",
    note: "Plano curricular do 1.º ano concluído, falta uma unidade curricular.",
  },
  {
    title: "Licenciatura em Engenharia Informática",
    where: "Universidade da Madeira",
    period: "2022 — 2026",
    note: "Programação, bases de dados, algoritmos, inteligência artificial e desenvolvimento web.",
  },
];

// A ÚNICA secção que fala do percurso fora da área.
export const crafts = [
  {
    name: "Montagem de vidro",
    tag: "Oficina",
    lesson: "Um milímetro a mais e o vidro não entra. Medir duas vezes e cortar uma é como trato requisitos e grelhas.",
  },
  {
    name: "Carteiro",
    tag: "Rotas",
    lesson: "Uma rua mal numerada atrasa um dia inteiro. Arquitetura da informação é dar a cada coisa um endereço claro.",
  },
  {
    name: "Entrega de pizzas",
    tag: "1 ano",
    lesson: "O cliente aguenta 30 minutos de espera. O que não aguenta é não saber onde está a pizza. Feedback de estado vale mais do que velocidade.",
  },
  {
    name: "Barman no Enotel Lido",
    tag: "Hotelaria",
    lesson: "O melhor serviço antecipa o pedido. Ler o contexto antes da pergunta é a base de qualquer experiência premium.",
  },
  {
    name: "Servente de pedreiro",
    tag: "Obra",
    lesson: "Ninguém elogia a fundação, mas tudo cai sem ela. Fluxos e dados antes de acabamentos.",
  },
  {
    name: "Médio centro no 1.º de Maio",
    tag: "Futebol",
    lesson: "No meio-campo decide-se em meio segundo e o melhor passe é o que facilita a vida ao colega. Uma equipa de produto funciona da mesma forma.",
    href: "https://www.zerozero.pt/jogador/david-franca/956779",
  },
];

// Processo de trabalho. É mesmo uma sequência, por isso tem números.
export const method = [
  { step: "Ouvir", text: "Conversas com quem vai usar e com quem paga. Antes de qualquer ecrã, perceber o problema real." },
  { step: "Mapear", text: "Fluxos, dados e prioridades. Decidir o que fica de fora é metade do trabalho." },
  { step: "Desenhar", text: "Wireframes, protótipos e testes rápidos. Iterar até a interface deixar de precisar de explicação." },
  { step: "Construir", text: "Código limpo, em produção, com métricas para saber se a decisão foi a certa." },
];

export const contact = {
  email: "david15scf@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/david-fran%C3%A7a-281418260/" },
    { label: "GitHub", href: "https://github.com/DSCF15" },
  ],
};
