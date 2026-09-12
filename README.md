# dinhostork.com

Portfólio pessoal de **Dinho Stork (Anderson Oliveira)** — engenheiro de software.

Site estático publicado em [dinhostork.com](https://dinhostork.com) via GitHub Pages.

## Stack

| Camada | Ferramenta |
|---|---|
| Build | Vite |
| UI | React 19 + TypeScript |
| Estilo | Tailwind CSS v4 (tokens em `src/styles/global.css`) |
| Motion | Motion (Framer Motion) |
| 3D | Three.js + React Three Fiber |
| Ícones | Lucide |
| Fontes | Space Grotesk, Inter, JetBrains Mono (auto-hospedadas via Fontsource) |

## Comandos

```bash
npm install
npm run dev        # servidor de desenvolvimento
npm run build      # checagem de tipos + build de produção em dist/
npm run preview    # serve o build local
npm run lint       # ESLint
npm run typecheck  # apenas TypeScript
```

Requer Node 20 ou superior.

## Como atualizar o conteúdo

**Todo o conteúdo profissional vive em [`src/data/portfolio.ts`](src/data/portfolio.ts).**
Os componentes não contêm texto. Para adicionar uma experiência, um projeto ou uma
tecnologia, edite apenas esse arquivo.

| O que | Onde |
|---|---|
| Apresentação, e-mail, redes | `profile`, `socials` |
| Números do topo | `metrics` |
| Áreas de atuação | `capabilities` |
| Tecnologias | `skillGroups` |
| Experiência e formação | `timeline` (`kind: 'work' \| 'education'`) |
| Projetos | `projects` |
| Capítulos da navegação | `chapters` |

Imagens de projeto e o currículo em PDF ficam em `public/`.

### Capas de projeto

`media/projects/` guarda os originais e **não vai para o build**. `public/images/projects/`
contém apenas os WebP servidos, gerados a partir deles em **1140×713** (16:10, o dobro do
slot real de ~570px).

Para regenerar, instale o `sharp` temporariamente (`npm i --no-save sharp`) e use:

```js
sharp(origem)
  .resize(1140, 713, { fit, position: 'centre', kernel: 'lanczos3',
                       background: { r: 13, g: 17, b: 23 } })  // --surface
  .sharpen({ sigma: 1.1, m1: 0.6, m2: 2.2 })                   // só se ampliar >1.2x
  .webp({ quality: 88 })
```

`fit: 'cover'` recorta para preencher o quadro. `fit: 'contain'` preserva a arte inteira
sobre a cor de superfície, usado quando o original é muito mais largo que 16:10
(hoje: ADAGIO e SGEEH).

> **Capas com origem de baixa resolução.** Cinco projetos só têm arte de 330×267, herdada
> do site antigo: Smart Vagas, PPGCI Eventos, COOPs, NUPI, RU e Rock On. Elas são ampliadas
> 3,45× no processamento, o que o Lanczos e o sharpen seguram razoavelmente por serem
> ilustrações chapadas, mas não substituem um original maior. Screenshots novos com pelo
> menos 1140px de largura melhorariam essas capas de imediato.

## Currículos

Duas versões em PDF, geradas a partir do mesmo conteúdo do portfólio:

| Versão | Páginas | Para quê |
|---|---|---|
| `anderson-oliveira-software-engineer-short.pdf` | 1 | Triagem, ATS, candidatura rápida |
| `anderson-oliveira-software-engineer-long.pdf` | 4 | Avaliação técnica aprofundada |

```bash
npm run cv        # gera os dois PDFs em public/assets/
npm run cv:check  # valida páginas, metadata, texto extraível e links
```

A geração usa o Chrome do sistema via `puppeteer-core` (não baixa Chromium). Defina
`CHROME_PATH` se o binário estiver fora dos caminhos usuais. A validação usa `pdftotext`
do poppler quando disponível — é a mesma extração que um ATS faz.

### Fonte

| Arquivo | Papel |
|---|---|
| [`src/data/portfolio.ts`](src/data/portfolio.ts) | Fatos: cargos, empresas, formação, prêmios, projetos, stacks |
| [`src/data/cv.ts`](src/data/cv.ts) | Só o que é de currículo: contato extra, períodos com mês, redação curada |
| [`cv/template.ts`](cv/template.ts) | HTML print-ready das duas versões |
| [`cv/styles.css`](cv/styles.css) | Folha de estilo de impressão |
| [`cv/build.ts`](cv/build.ts) | Renderiza, imprime em A4 e grava a metadata do PDF |
| [`cv/validate.ts`](cv/validate.ts) | Verificação automatizada dos PDFs |

**Currículo e site compartilham a mesma fonte.** Adicionar uma experiência em
`portfolio.ts` faz ela aparecer nos dois. `cv.ts` só acrescenta o que não vai para o site
e decide, por experiência, quais bullets entram na versão curta e quais na longa.

Os PDFs são artefatos gerados, mas ficam versionados em `public/assets/` porque o deploy
publica `dist/` sem rodar `npm run cv`. Depois de mexer no conteúdo, rode `npm run cv` e
faça commit dos PDFs junto.

## Design system

[`design-system/dinho-stork/MASTER.md`](design-system/dinho-stork/MASTER.md) é a fonte de
verdade visual: paleta com contrastes verificados, tipografia, espaçamento, camadas de
profundidade, tokens de motion, estratégia de 3D e anti-patterns.

Foi gerado com a skill `ui-ux-pro-max` e depois refinado; a saída bruta da skill está
preservada em `MASTER.generated.md`, e a seção "Proveniência" do `MASTER.md` registra
quais decisões vieram de quais consultas.

## Publicação

O deploy é feito por [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) a cada
push na `main`: instala, roda lint, faz o build, confere que `dist/CNAME` continua com
`dinhostork.com` e publica `dist/` no GitHub Pages.

> **Configuração necessária uma única vez:** em *Settings → Pages → Build and deployment*,
> a origem precisa estar em **GitHub Actions** (e não em *Deploy from a branch*).

O domínio personalizado é preservado por `public/CNAME`, copiado para `dist/` no build.
A validação de certificado em `public/.well-known/` também é preservada.

## Acessibilidade e performance

- `prefers-reduced-motion` desliga reveals, parallax e a cena WebGL, que dá lugar a um
  fallback estático em SVG.
- A cena 3D só monta em telas ≥ 768px, com WebGL disponível e mais de 4 núcleos de CPU.
  O Three.js é carregado por import dinâmico e fica fora do bundle inicial.
- Contraste de texto verificado em 4.5:1 ou mais em todas as superfícies.
- Sem scroll horizontal em 375, 768, 1024, 1440 e 1920px.
