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
  headline: ["Vejo a jogada", "antes de ela acontecer."],
  intro:
    "Product Designer e Engenheiro Informático. No campo e nos produtos, o trabalho é o mesmo: ler o contexto, antecipar o passo seguinte e tornar simples o que parecia confuso.",
  cover: {
    src: "/me/capa.webp",
    srcSm: "/me/capa-sm.webp",
    srcMobile: "/me/capa-mob.webp",
    alt: "O David a conduzir a bola num jogo noturno com nevoeiro, de camisola branca e dourada",
  },
  metaDescription:
    "David França, Product Designer e Engenheiro Informático na Madeira. UX/UI, estratégia de produto e desenvolvimento web.",
};

// Projetos em destaque. A ordem aqui é a ordem no site.
// `media` aponta para imagens em /public/work/<id>/. Sem `media`, o cartão
// mostra a ilustração indicada em `plate` ("rhythm" | "calendar" | "orders" | "brands").
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
    media: null,
    summary:
      "Jogo de ritmo para treinar a coordenação motora em crianças e jovens com perturbação do espetro do autismo.",
    story: {
      contexto:
        "Projeto de dissertação desenvolvido com a Associação Os Grandes Azuis e acompanhado por docentes da Universidade da Madeira.",
      tensao:
        "Muitos dos jogadores não leem, e uma mudança inesperada no ecrã pode ser suficiente para abandonarem a sessão. Os jogos de ritmo comuns pedem o contrário: texto, menus e estímulos constantes.",
      decisao:
        "Instruções só por áudio, cores vivas com significado fixo, imagens em vez de palavras e rotinas sempre iguais. O toque é a única forma de interação, em tablet e telemóvel.",
      resultado: "Protótipo em desenvolvimento com validação junto da associação.",
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
    frameLabel: "Agenda · painel do salão",
    media: {
      hero: {
        src: "/work/agenda/admin.webp",
        alt: "Painel de gerência com faturação do dia e da semana, serviço mais pedido e calendário semanal de marcações",
      },
      mobile: { src: "/work/agenda/profissional-mob.webp", alt: "Passo de escolha do profissional no telemóvel" },
      gallery: [
        {
          src: "/work/agenda/servicos.webp",
          alt: "Lista de serviços da unidade do Caniço com duração e preço",
          caption: "O cliente começa pelo que quer fazer: serviço, duração e preço, sem login.",
        },
        {
          src: "/work/agenda/profissional.webp",
          alt: "Escolha do profissional, com a opção Sem Preferência",
          caption: "Depois escolhe quem o atende, ou “Sem Preferência” para ficar com o primeiro livre.",
        },
      ],
      note: "Capturas com dados de demonstração.",
    },
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
    id: "docaria",
    index: "03",
    title: "Bolo de mel, por encomenda",
    client: "Doçaria · Loja de encomendas",
    year: "2025",
    status: null,
    role: "Produto, UX/UI, desenvolvimento e infraestrutura",
    plate: "orders",
    frameLabel: "Doçaria · loja",
    media: {
      hero: { src: "/work/docaria/home.webp", alt: "Página inicial da Doçaria: O Sabor do Natal Madeirense" },
      mobile: { src: "/work/docaria/encomendar-mob.webp", alt: "Formulário de encomenda da Doçaria no telemóvel" },
      gallery: [
        {
          src: "/work/docaria/produtos.webp",
          alt: "Montra com bolo de mel, broas e cabazes",
          caption: "A montra: cada produto com preço, descrição curta e um único botão.",
        },
        {
          src: "/work/docaria/encomendar.webp",
          alt: "Ecrã Finalizar Pedido com os dados à esquerda e o carrinho à direita",
          caption: "Finalizar num só ecrã: os dados à esquerda e o carrinho sempre visível à direita.",
        },
      ],
    },
    summary:
      "Loja de encomendas com painel de gestão para uma doçaria de produtos tradicionais da Madeira, alojada num Raspberry Pi.",
    story: {
      contexto:
        "Uma doçaria de bolo de mel, broas e cabazes de Natal precisava de receber encomendas online e de controlar as datas de entrega.",
      tensao:
        "A solução não podia trazer custos mensais de alojamento nem obrigar a equipa a aprender uma ferramenta complicada. E muitas encomendas são feitas ao telemóvel.",
      decisao:
        "Uma montra simples e um único ecrã para finalizar, com o carrinho sempre à vista e o total atualizado. Um painel separado para a doçaria gerir pedidos e horários. A API corre num Raspberry Pi, com custo mensal próximo de zero.",
      resultado: "Encomendas, datas e gestão num só fluxo, sem dependência de serviços pagos.",
    },
    stack: ["React", "Tailwind", "Node.js", "Express", "SQLite", "Raspberry Pi"],
    links: [{ label: "Código no GitHub", href: "https://github.com/DSCF15/smart-cake-ordering-system" }],
  },
  {
    id: "barbearia",
    index: "04",
    title: "Duas barbearias, um só endereço",
    client: "Barbearia J · Camacha e Caniço",
    year: "2026",
    status: null,
    role: "UX/UI e frontend",
    plate: null,
    frameLabel: "Barbearia J",
    media: {
      hero: { src: "/work/barbearia/home.webp", alt: "Página inicial da Barbearia J com o seletor Camacha / Caniço" },
      mobile: { src: "/work/barbearia/home-mob.webp", alt: "Página inicial da Barbearia J no telemóvel" },
      gallery: [
        {
          src: "/work/barbearia/servicos.webp",
          alt: "Lista de serviços com duração e preço",
          caption: "Serviços com preço e duração, lidos de uma vez como um menu.",
        },
        {
          src: "/work/barbearia/equipa-canico.webp",
          alt: "Equipa da loja do Caniço",
          caption: "Com o Caniço selecionado, a equipa, o horário e o botão de marcação mudam para essa loja.",
        },
        {
          src: "/work/barbearia/contactos.webp",
          alt: "Contactos com morada, telefone e mapa da loja da Camacha",
          caption: "Morada, telefone e mapa da loja escolhida, sem ter de procurar.",
        },
      ],
    },
    summary:
      "Site para uma barbearia com duas lojas, onde o cliente escolhe a sua uma vez e todo o site se adapta a ela.",
    story: {
      contexto:
        "A Barbearia J tem lojas na Camacha e no Caniço, com equipas, horários, moradas e agendas diferentes.",
      tensao:
        "Dois sites duplicavam trabalho. Um site com tudo misturado obrigava o cliente a procurar a sua loja em cada secção, e a arriscar marcar na agenda errada.",
      decisao:
        "Um seletor de loja fixo no topo. Ao escolher, mudam a equipa, os serviços, o horário, o mapa, o telefone e o botão de marcação, que leva diretamente à agenda dessa loja.",
      resultado:
        "O cliente decide uma vez e o resto do site acompanha. As fotografias são otimizadas automaticamente para carregarem depressa em dados móveis.",
    },
    stack: ["React", "Vite", "Tailwind", "Leaflet", "Swiper", "Sharp"],
    links: [{ label: "Código no GitHub", href: "https://github.com/DSCF15/BarbeariaSite" }],
  },
  {
    id: "cassianos",
    index: "05",
    title: "Seis negócios, uma só porta de entrada",
    client: "Cassiano's · Site institucional",
    year: "2025",
    status: null,
    role: "Direção visual, UX/UI e frontend",
    plate: "brands",
    frameLabel: "Cassiano's",
    media: {
      hero: {
        src: "/work/cassianos/home.webp",
        alt: "Página inicial do Cassiano's com as marcas do grupo e uma fotografia da área de serviço",
      },
      mobile: { src: "/work/cassianos/home-mob.webp", alt: "Página inicial do Cassiano's no telemóvel, com as marcas em lista" },
      gallery: [
        {
          src: "/work/cassianos/empresa.webp",
          alt: "Página do grupo com apresentação e histórico",
          caption: "A página do grupo conta a história desde 2003 e liga a cada negócio.",
        },
      ],
    },
    summary:
      "Site para um grupo com seis negócios diferentes: oficina, lavagem automóvel, energia, eventos, snack-bar e pizzaria.",
    story: {
      contexto:
        "O grupo Cassiano's junta negócios que pouco têm em comum, da lavagem automóvel à pizzaria Mr. Pizza.",
      tensao:
        "Um único site arriscava ser confuso. Seis sites separados dividiam a marca e multiplicavam a manutenção.",
      decisao:
        "Uma entrada comum onde cada marca é um cartão com o seu logótipo, e uma página por negócio com cabeçalho e identidade próprios. Mapa com localização, galerias e movimento discreto para dar vida às secções.",
      resultado: "Uma marca coerente onde cada cliente chega ao negócio que procura em poucos cliques.",
    },
    stack: ["React", "GSAP", "Framer Motion", "Leaflet", "Swiper"],
    links: [{ label: "Código no GitHub", href: "https://github.com/DSCF15/cassianos" }],
  },
];

// Todas as imagens dos projetos, pela ordem dos casos (usadas na faixa de imagens e no topo).
export const reel = projects.flatMap((p) =>
  p.media ? [p.media.hero, ...p.media.gallery].map((m) => ({ ...m, project: p.title, id: p.id })) : []
);

export const githubProfile = "https://github.com/DSCF15";

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
    photo: { src: "/me/obra-sm.webp", alt: "O David numa obra, de t-shirt suja de pó, ao lado de um colega de capacete" },
  },
  {
    name: "Médio centro no 1.º de Maio",
    tag: "Futebol",
    lesson: "No meio-campo decide-se em meio segundo e o melhor passe é o que facilita a vida ao colega. Uma equipa de produto funciona da mesma forma.",
    href: "https://www.zerozero.pt/jogador/david-franca/956779",
    more: { label: "Ver fotografias em campo", href: "#campo" },
  },
];

// Secção "Sobre mim", logo a seguir ao topo.
export const about = {
  photo: { src: "/me/perfil.webp", alt: "Retrato do David França ao ar livre, de camisa preta e óculos de sol, com o mar ao fundo" },
  lead: "Sou o David. Tenho 22 anos, vivo no Caniço e penso em produtos a partir de quem os vai usar.",
  body: [
    "Licenciei-me em Engenharia Informática na Universidade da Madeira e estou a terminar o Mestrado. Desenho e construo produtos web, com especial atenção ao que acontece entre o primeiro clique e o momento em que a pessoa resolve o que precisava.",
    "Gosto de problemas reais de negócios reais: uma barbearia com duas lojas, uma doçaria que vive do Natal, um salão que ainda marca pelo telefone. É aí que a estratégia e o detalhe da interface se encontram.",
  ],
  facts: [
    ["Idade", "22"],
    ["Base", "Caniço, Madeira"],
    ["Posição", "Médio centro"],
    ["Línguas", "Português · Inglês"],
  ],
};

// Secção "Em campo": fotografias de jogo.
export const field = {
  title: "Em campo",
  lead: "Médio centro no 1.º de Maio. Aos fins de semana, a mesma ideia de sempre: ler o jogo, simplificar e fazer a equipa jogar.",
  zerozero: "https://www.zerozero.pt/jogador/david-franca/956779",
  photos: [
    { src: "/me/campo-02.webp", alt: "De costas, com o número 32, a conduzir a bola num jogo noturno com nevoeiro", caption: "Noite de nevoeiro · #32" },
    { src: "/me/campo-08.webp", alt: "De camisola azul número 81, a receber a bola num jogo de dia", caption: "Equipamento azul · #81" },
    { src: "/me/campo-01.webp", alt: "De perfil, com a bola nos pés, no meio do nevoeiro", caption: "Cabeça levantada antes do passe" },
    { src: "/me/campo-06.webp", alt: "A conduzir a bola em frente a uma bancada vermelha", caption: "Conduzir e escolher a linha" },
    { src: "/me/campo-09.webp", alt: "Entre dois adversários de vermelho e amarelo, a proteger a bola", caption: "Entre linhas" },
    { src: "/me/campo-03.webp", alt: "A correr para a bola, de costas, com o número 32", caption: "Ocupar o espaço" },
    { src: "/me/campo-05.webp", alt: "Com a bola nos pés, de frente para a baliza adversária", caption: "Ler o jogo" },
    { src: "/me/campo-04.webp", alt: "A acompanhar a bola, de perfil, em relvado sintético molhado", caption: "Relvado molhado, jogo rápido" },
    { src: "/me/campo-07.webp", alt: "A sorrir, com a camisola branca e dourada, ao lado de um colega", caption: "Depois do apito" },
  ],
};

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
