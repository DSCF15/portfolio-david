# dscf15 — AI Command Center

Portefólio pessoal do David França, construído como uma consola de comando:
arranque em terminal, rede neuronal 3D no topo e "salas" para cada parte do CV.

## Começar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera o site estático em /out
```

## Editar o conteúdo

Tudo o que aparece no site está em **`lib/content.js`**: bio, skills, percurso,
projetos, certificações e contactos. Não precisas de mexer nos componentes.

- **Certificações:** a sala só aparece quando a lista tiver pelo menos uma entrada.
- **Email:** fica escondido enquanto `contact.email` estiver vazio.
- **Projetos:** `status` aceita `"online"`, `"em curso"` ou `"proposta"`.

## Interações

| Atalho | O que faz |
| --- | --- |
| `Ctrl/⌘ + K` | Abre a pesquisa da consola |
| `1` a `6` | Salta para a sala correspondente |
| Qualquer tecla no arranque | Salta a animação inicial |

Na sala Contacto há um terminal funcional (`ajuda`, `quem`, `projetos`, `stack`,
`github`, `linkedin`, `email`, `limpar`).

O arranque só aparece uma vez por sessão. Com "reduzir movimento" ativo no
sistema, não há arranque, scroll suave nem rede animada.

## Estrutura

```
app/            layout, página e estilos (tokens de cor e tipografia em globals.css)
components/     Console (página), Deck (navegação), NeuralField (3D),
                BootSequence, CommandPalette, Terminal, Rooms (salas)
lib/content.js  todo o conteúdo editável
lib/rooms.js    ordem e atalhos das salas
```

## Deploy

O projeto usa `output: "export"`, por isso é um site estático:

- **Vercel:** importa o repositório do GitHub, sem configuração extra.
- **Netlify / Cloudflare Pages:** comando `npm run build`, pasta `out`.

## Stack

Next.js 15 (App Router) · Tailwind CSS 4 · React Three Fiber + Drei · Framer Motion · Lenis
Tipos: Chakra Petch, IBM Plex Sans e IBM Plex Mono (servidos localmente via Fontsource).
