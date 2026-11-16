// ─────────────────────────────────────────────────────────────
//  Todo o conteúdo do portefólio vive aqui.
//  Edita este ficheiro para atualizar textos, projetos e links —
//  não precisas de mexer nos componentes.
// ─────────────────────────────────────────────────────────────

export const identity = {
  name: "David França",
  handle: "dscf15",
  role: "Engenheiro de software",
  tagline:
    "Construo produtos web do zero — de plataformas para personal trainers a jogos terapêuticos para crianças.",
  location: "Caniço, Madeira",
  coords: "32.65° N  16.84° W",
  status: "Mestrado em Engenharia Informática · UMa",
  available: true, // mostra o indicador "disponível para projetos"
  bio: [
    "Sou licenciado em Engenharia de Software pela Universidade da Madeira e estou a fazer o mestrado em Engenharia Informática.",
    "Gosto de projetos onde a parte técnica e a experiência de quem usa pesam o mesmo: produtos SaaS, sistemas de gestão para negócios locais e, na minha tese, um jogo musical que ajuda crianças e jovens com perturbação do espetro do autismo a trabalhar a coordenação motora.",
  ],
};

// Cada grupo vira um módulo hexagonal na sala "Skills".
// Ajusta à tua stack real.
export const skills = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Three.js", "Framer Motion"],
  },
  {
    group: "Backend",
    items: ["Node.js", "APIs REST", "SQL", "Autenticação", "Pagamentos"],
  },
  {
    group: "Produto",
    items: ["SaaS multi-utilizador", "Agendamentos", "Dashboards", "Vídeo com Remotion"],
  },
  {
    group: "Engenharia",
    items: ["Git & GitHub", "Requisitos", "Testes", "Deploy na Vercel"],
  },
];

// Percurso em ordem cronológica (mais recente primeiro).
export const timeline = [
  {
    when: "2026 — agora",
    title: "Mestrado em Engenharia Informática",
    where: "Universidade da Madeira",
    text: "Dissertação sobre um jogo musical de ritmo para trabalhar a coordenação motora em pessoas com PEA, em parceria com a Associação Os Grandes Azuis.",
  },
  {
    when: "2025 — agora",
    title: "Desenvolvimento de produtos SaaS",
    where: "Projetos próprios e em equipa",
    text: "Plataformas para personal trainers e para a gestão de um salão de cabeleireiro, do desenho de requisitos ao deploy.",
  },
  {
    when: "2022 — 2026",
    title: "Licenciatura em Engenharia de Software",
    where: "Universidade da Madeira",
    text: "Base em engenharia de requisitos, arquitetura de software, bases de dados e desenvolvimento web.",
  },
];

// Projetos ("missões"). status: "online" | "em curso" | "proposta"
export const projects = [
  {
    id: "tese",
    name: "Jogo musical terapêutico",
    status: "em curso",
    summary: "Jogo de ritmo para treinar a coordenação motora em crianças e jovens com PEA.",
    details: [
      "Desenvolvido com a Associação Os Grandes Azuis e acompanhado por docentes da UMa.",
      "Pensado para quem não lê: instruções por áudio, cores vivas, imagens e rotinas previsíveis.",
      "A versão atual aponta para tablet e telemóvel, com toque como forma de interação.",
    ],
    stack: ["Game design", "Acessibilidade", "Investigação"],
    link: null,
  },
  {
    id: "pt-app",
    name: "Gestão de clientes para PTs",
    status: "online",
    summary: "SaaS para personal trainers gerirem clientes, treinos, nutrição e agenda num só sítio.",
    details: [
      "Avaliações físicas e de bioimpedância, planos de treino e de nutrição.",
      "Agenda, mensagens com clientes e convites por link.",
      "Já em uso com um cliente de testes.",
    ],
    stack: ["Next.js", "SaaS", "Agendamentos"],
    link: "https://itorvieiradev.com",
  },
  {
    id: "apex",
    name: "Apex PT",
    status: "online",
    summary: "Plataforma privada que liga atletas a personal trainers, com planos à medida.",
    details: [
      "Para atletas dos 25 aos 40 anos e PTs que procuram uma ferramenta premium.",
      "Acesso direto ao treinador e planos de treino personalizados.",
      "Vídeo promocional vertical feito com Remotion.",
    ],
    stack: ["Web app", "Remotion", "Marca"],
    link: "https://apexpt.vitorvieiradev.com",
  },
  {
    id: "ivone",
    name: "Ivone Hair Studio",
    status: "proposta",
    summary: "Sistema de gestão e marcações online para um salão no Funchal.",
    details: [
      "Clientes marcam online no site do salão.",
      "Cada profissional vê apenas a sua agenda.",
      "Feito por uma equipa de três mestrandos da UMa: primeiro site, depois aplicação.",
    ],
    stack: ["Marcações", "Permissões", "Web → App"],
    link: null,
  },
];

// Certificações. Se a lista estiver vazia, a sala fica escondida.
// Exemplo:
// { name: "AWS Cloud Practitioner", issuer: "Amazon", year: "2026", link: "https://..." },
export const certifications = [];

export const contact = {
  email: "", // ex.: "nome@exemplo.com" — fica escondido enquanto estiver vazio
  linkedin: "https://www.linkedin.com/in/david-frança-281418260",
  github: "https://github.com/DSCF15",
};
