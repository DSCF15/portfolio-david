# David França · Portefólio

Portefólio pessoal de **David França**, Product Designer e Engenheiro Informático na Madeira.
Foco em UX/UI, estratégia de produto e desenvolvimento web.

> **Conceito: “Do outro lado do vidro.”** Um bom interface é como um vidro bem montado:
> ninguém repara nele, toda a gente vê através dele. A identidade junta o basalto da Madeira,
> painéis de vidro e uma única fonte de luz dourada que segue o cursor.

## Secções

| Secção | O que mostra |
| --- | --- |
| **Hero** | A tese numa frase, disponibilidade e factos curtos |
| **Projetos** | Quatro casos de estudo (Contexto → Tensão → Decisão → Resultado) e outros trabalhos no GitHub |
| **Percurso** | Estágio na ANTURIO Business Software e formação na Universidade da Madeira |
| **Antes do código** | O percurso fora da área e a lição que cada trabalho deixou. É a única secção sobre este tema |
| **Método** | Ouvir, Mapear, Desenhar, Construir |
| **Contacto** | Email com botão de copiar, LinkedIn, GitHub e hora local na Madeira |

## Projetos em destaque

| Projeto | Stack | Repositório |
| --- | --- | --- |
| Jogo de ritmo para pessoas com PEA (dissertação) | Game design, acessibilidade | — |
| Plataforma multi-salão de marcações | React, Node.js, Express, MongoDB | [scheduling-system-api](https://github.com/DSCF15/scheduling-system-api) |
| Encomendas para pastelaria tradicional | React, Express, SQLite, Raspberry Pi | [smart-cake-ordering-system](https://github.com/DSCF15/smart-cake-ordering-system) |
| Site do grupo Cassiano's | React, GSAP, Leaflet | [cassianos](https://github.com/DSCF15/cassianos) |
| Site da Barbearia J | React, Vite, Tailwind | [BarbeariaSite](https://github.com/DSCF15/BarbeariaSite) |

## Começar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera o site estático em /out
```

## Editar o conteúdo

Todos os textos estão em **[`lib/content.js`](lib/content.js)**: apresentação, projetos, estágio,
formação, ofícios, método e contactos. Não é preciso mexer nos componentes.

- **Novo projeto:** acrescenta um objeto a `projects`. O campo `plate` escolhe a ilustração
  (`rhythm`, `calendar`, `orders` ou `brands`).
- **Capturas de ecrã:** quando existirem, coloca-as em `public/` e troca o `<Plate>` por uma
  `<img>` em [`components/Work.jsx`](components/Work.jsx).
- **Disponibilidade:** `identity.available = false` esconde o indicador do topo.

## Identidade visual

| Token | Cor | Uso |
| --- | --- | --- |
| Obsidiana | `#0C0B0A` | Fundo |
| Basalto | `#16140F` | Superfícies |
| Fumo | `#A39A8B` | Texto secundário |
| Marfim | `#EFE9DF` | Texto principal |
| Ouro velho | `#C9A45C` | Arestas e marcadores |
| Champanhe | `#E9D5A6` | Ênfase e botão principal |

Tipografia: **Bodoni Moda** (títulos), **Geist** (texto) e **Geist Mono** (dados e rótulos).
Os tokens estão em [`app/globals.css`](app/globals.css).

## Interações

- Luz dourada que segue o cursor e acende a aresta dos painéis de vidro.
- Abertura em que o título “desembacia”, com uma passagem de luz.
- Casos de estudo e ofícios que se abrem sem saltos no layout.
- Índice em ecrã inteiro (fecha com `Esc`).
- Scroll suave com Lenis.

Com “reduzir movimento” ativo no sistema, as animações, a luz e o scroll suave ficam desligados.

## Estrutura

```
app/            layout, página e estilos globais (tokens)
components/     Header, Hero, Work, Plate, Experience, Crafts, Method, Contact, Ambient
lib/content.js  todo o conteúdo editável
```

## Deploy

O projeto usa `output: "export"`, por isso gera um site estático:

- **Vercel:** importa o repositório, sem configuração extra.
- **Netlify / Cloudflare Pages:** comando `npm run build`, pasta `out`.

## Stack

Next.js 15 (App Router) · React 19 · Tailwind CSS 4 · Lenis · fontes via `next/font`.
