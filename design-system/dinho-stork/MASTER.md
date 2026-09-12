# Design System — Dinho Stork

> **Fonte de verdade visual** do portfólio `dinhostork.com`.
> Gerado com a skill `ui-ux-pro-max` e refinado para o briefing (dark / engenharia / sistemas / profundidade).
> A saída bruta da skill está preservada em `MASTER.generated.md`.

**Projeto:** Dinho Stork — portfólio pessoal de engenheiro de software
**Design Dials:** Variance 8/10 (Bold / Asymmetric) · Motion 8/10 (Complex) · Density 6/10 (Standard)

---

## 1. Proveniência (queries executadas na skill)

| Decisão | Query | Domínio | Resultado adotado |
|---|---|---|---|
| Base do sistema | `developer tool portfolio scroll storytelling narrative dark mode oled engineering` | `--design-system --persist` | Categoria **Developer Tool / IDE**, dials, spacing, checklist |
| Estilo | `dark technical engineering depth grid precision` | `style` | **Dark Mode (OLED)** + traços de **HUD/Sci-Fi FUI** (linhas 1px, marcadores técnicos) e **Bento Box Grid** |
| Cor | `developer tools dark terminal engineering` | `color` | **"Code dark + run green"** — base near-black + verde de sinal |
| Tipografia | `technical precision monospace developer dark cinematic` | `typography` | Tri-stack **Space Grotesk + Inter + JetBrains Mono** |
| Estrutura | `portfolio personal storytelling scroll narrative hero projects` | `landing` | **Scroll-Triggered Storytelling** (capítulos numerados) |
| Motion | `scroll reveal stagger parallax text mask` | `gsap` | Scroll Reveal, Stagger List, Parallax Scroll (tiers Subtle/Standard) |

### Desvios conscientes da saída bruta

A skill sugeriu **Brutalism** como estilo e **FAQ/Documentation Landing** como padrão de página. Ambos foram descartados:

- Brutalism pede "no smooth transitions, sharp corners 0px, anti-design" — conflita frontalmente com o briefing (sofisticado, imersivo, profundidade, motion fluido).
- FAQ/Documentation Landing é padrão de produto com busca e acordeão, não de portfólio narrativo.

Ambos foram substituídos por resultados de buscas dirigidas na mesma skill (linhas 2 e 5 da tabela acima), mantendo o sistema inteiramente ancorado na base de conhecimento dela.

---

## 2. Conceito visual

> **"Engineering telemetry."**

A referência não é "site escuro com cards", e sim o instrumental que um engenheiro de sistemas usa: painéis de observabilidade, diagramas de arquitetura, plantas técnicas, traces distribuídos. Daí vêm:

- fundo near-black **neutro-frio** (não azul-arroxeado, evitando o clichê "dark + roxo + gradiente de IA");
- **verde de sinal** como único acento de ação — a cor de "healthy / running" em qualquer dashboard;
- **âmbar** exclusivamente para destaque de conquista (prêmios), nunca para ação;
- **hairlines de 1px** e grid técnico como estrutura, não decoração;
- profundidade por **camadas + iluminação radial suave**, não por glow neon.

---

## 3. Tokens de cor

Todos verificados contra WCAG sobre o fundo base `#07090C`.

### Superfícies

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#07090C` | Fundo da página (near-black neutro) |
| `--surface` | `#0D1117` | Cards, painéis |
| `--surface-2` | `#12181B` | Elevação sobre card, estados hover |
| `--line` | `#1C242B` | Hairline 1px padrão |
| `--line-strong` | `#2A343D` | Divisor enfatizado, borda de card ativo |

### Texto

| Token | Hex | Contraste s/ `--bg` | Uso |
|---|---|---|---|
| `--text` | `#E8EDF2` | **16.9:1** | Corpo, títulos |
| `--muted` | `#94A3B0` | **7.7:1** | Texto secundário, descrições |
| `--dim` | `#7D8896` | **5.5:1** | Metadados, labels mono (4.98:1 sobre `--surface-2`, o pior caso) |

### Acento

| Token | Hex | Contraste s/ `--bg` | Uso |
|---|---|---|---|
| `--signal` | `#34D399` | **10.4:1** | Acento primário: CTA, links, estados ativos, nodes 3D |
| `--signal-dim` | `rgba(52,211,153,.12)` | — | Preenchimento de chip/badge |
| `--award` | `#F5A524` | **9.8:1** | **Somente** prêmios e conquistas |
| `--on-signal` | `#07090C` | **10.4:1** | Texto sobre botão de acento |

**Regras de cor**

- Máximo **dois acentos** na página. Verde = ação e estado. Âmbar = conquista. Nada mais.
- Cor nunca carrega significado sozinha: todo estado tem também ícone, label ou forma.
- Glow permitido apenas como `radial-gradient` de baixa opacidade em camada de fundo. **Proibido** `text-shadow` neon em texto de leitura.
- Nenhum roxo, magenta ou gradiente azul→roxo em qualquer lugar.

---

## 4. Tipografia

```
Space Grotesk  → display / headlines        600, 700
Inter          → corpo, UI, parágrafos      400, 500, 600
JetBrains Mono → labels, índices, dados     400, 500
```

| Papel | Fonte | Tamanho (clamp) | Tracking | Peso |
|---|---|---|---|---|
| Display (hero) | Space Grotesk | `clamp(2.75rem, 9vw, 7.5rem)` | `-0.04em` | 700 |
| H2 (seção) | Space Grotesk | `clamp(2rem, 5vw, 3.5rem)` | `-0.03em` | 600 |
| H3 (card) | Space Grotesk | `clamp(1.25rem, 2.5vw, 1.75rem)` | `-0.02em` | 600 |
| Corpo | Inter | `1rem` – `1.125rem` | `0` | 400 |
| Lead | Inter | `clamp(1.05rem, 2vw, 1.3rem)` | `-0.01em` | 400 |
| Label / eyebrow | JetBrains Mono | `0.75rem` uppercase | `+0.18em` | 500 |
| Dado / métrica | JetBrains Mono | variável, `tabular-nums` | `-0.02em` | 500 |

**Regras**

- Corpo mínimo **16px** em mobile (evita auto-zoom do iOS).
- `line-height` 1.6–1.7 em parágrafos; 0.95–1.05 em display.
- Medida de leitura limitada a **65–72ch** (`max-w-[68ch]`).
- Mono é para metadados e números. **Nunca** parágrafo inteiro em mono.
- `font-display: swap` em todas as faces; fontes auto-hospedadas, sem request a CDN de terceiros.

---

## 5. Espaçamento, grid e raio

Escala base 4px (density 6/10 — Standard).

| Token | Valor |
|---|---|
| `xs` / `sm` / `md` | 4 / 8 / 16 px |
| `lg` / `xl` / `2xl` | 24 / 32 / 48 px |
| `3xl` / `section` | 64 px / `clamp(5rem, 12vh, 9rem)` |

- Container: `max-width: 1280px`, gutter lateral `clamp(20px, 5vw, 48px)`.
- Ultrawide: container não passa de 1280px; o grid técnico de fundo continua sangrando até a borda.
- Raio: `4px` (chips) · `12px` (cards) · `16px` (painéis grandes) · `999px` (pills de navegação). Sem raios acima de 16px em cards.
- Grid técnico de fundo: linhas de 1px em `rgba(255,255,255,.03)`, célula de 64px.

### Breakpoints

`375` (mobile) · `768` (tablet) · `1024` (notebook) · `1440` (desktop) · `1536+` (ultrawide)

---

## 6. Elevação e profundidade

Profundidade vem de **quatro camadas empilhadas**, não de sombra:

1. **z-0** — grid técnico + noise (estático, `position: fixed`)
2. **z-10** — iluminação radial suave (`radial-gradient`, opacidade ≤ 0.10)
3. **z-20** — cena 3D / canvas (`pointer-events: none`)
4. **z-30** — conteúdo (sempre acima, sempre legível)

| Token | Valor |
|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,.5)` |
| `--shadow-md` | `0 8px 24px -8px rgba(0,0,0,.65)` |
| `--shadow-lg` | `0 24px 60px -20px rgba(0,0,0,.8)` |
| `--ring-signal` | `0 0 0 1px rgba(52,211,153,.35)` |

Glass discreto: `background: rgba(13,17,23,.72)` + `backdrop-filter: blur(12px)` + hairline `--line`. Usado **apenas** na navegação flutuante e no card ativo — nunca em superfície de leitura longa.

---

## 7. Motion

Tokens únicos e globais. Toda animação usa um destes.

| Token | Valor | Uso |
|---|---|---|
| `--dur-fast` | `150ms` | Hover, foco, mudança de estado |
| `--dur-base` | `280ms` | Transição de componente |
| `--dur-slow` | `600ms` | Reveal de entrada |
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` | Entrada (desaceleração) |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` | Transformação bidirecional |
| Spring | `{ stiffness: 120, damping: 20, mass: 0.6 }` | Motion / Framer Motion |

**Vocabulário de movimento**

- **Reveal:** `opacity 0→1`, `y 16px→0`, `--dur-slow`, `--ease-out`, dispara uma vez em 20% de viewport.
- **Stagger:** 40ms por item, máximo 8 itens por cascata.
- **Parallax:** apenas camadas decorativas, delta `yPercent` entre 5 e 15. **Nunca** em texto.
- **Hover de card:** `translateY(-4px)` + hairline passa a `--signal`, `--dur-fast`.
- **Tilt:** máximo 6° de rotação, somente em dispositivo com ponteiro fino.
- **Saída:** ~65% da duração de entrada.

**Limites**

- Máximo **2 elementos animados por viewport**.
- Somente `transform` e `opacity`. Nunca `width`, `height`, `top`, `left`.
- Nenhum scroll-jacking. O scroll nativo nunca é sequestrado.
- Nenhuma animação bloqueia input.

**`prefers-reduced-motion: reduce`** — obrigatório:
reveals renderizam no estado final imediatamente · parallax desligado · tilt desligado · loop do 3D pausado em frame estático · transições reduzidas a 1ms.

---

## 8. Estratégia 3D

O 3D representa **um sistema distribuído**: nodes conectados por arestas, com pacotes trafegando. É a metáfora literal do que o conteúdo descreve (sistemas distribuídos, tempo real, mensageria), não um objeto decorativo.

**Orçamento de performance**

| Restrição | Valor |
|---|---|
| Draw calls | ≤ 5 |
| DPR | `[1, 1.75]` desktop · `[1, 1.5]` mobile |
| Contagem de nodes | 56 desktop · 30 mobile |
| Geometria | Primitivas instanciadas; sem modelo externo, sem textura |
| Frameloop | `demand` fora da viewport; pausa em `visibilitychange` |
| Carregamento | `React.lazy` + `Suspense`, fora do bundle inicial |

**Degradação graciosa** — o canvas não é renderizado quando: `prefers-reduced-motion: reduce`, ausência de WebGL, `navigator.hardwareConcurrency <= 4`, ou largura < 768px. O fallback é uma composição estática em SVG com a mesma linguagem visual. **Nenhum conteúdo vive dentro do canvas.**

---

## 9. Arquitetura da página (Scroll-Triggered Storytelling)

Capítulos numerados em mono, conectados por uma espinha vertical contínua que progride com o scroll.

| # | Seção | Papel narrativo |
|---|---|---|
| `00` | Hero | Identidade + sistema 3D vivo |
| `01` | Sobre | Como penso e que problemas resolvo |
| `02` | Stack | Capacidades técnicas em bento categorizado |
| `03` | Trajetória | Formação + experiência em timeline dupla |
| `04` | Projetos | Case cards alternados |
| `05` | Contato | Encerramento e convite |

Transição entre seções: sem corte duro. Hairline + índice mono + respiro vertical constante criam continuidade.

---

## 10. Componentes

- **Nav flutuante** — pill com glass, indicador de seção ativa, barra de progresso de scroll. Em mobile vira sheet full-screen com os capítulos numerados, não hamburger colapsado.
- **Section header** — eyebrow mono (`01 / SOBRE`) + H2 + hairline que se estende até a borda.
- **Tech chip** — texto real e indexável, hairline 1px, fundo `--signal-dim` no hover. Nunca só ícone.
- **Timeline item** — nó na espinha, ano em mono, cargo em Space Grotesk, corpo em Inter.
- **Três linguagens na Trajetória**, distintas por **forma antes de cor**: experiência usa nó preenchido na espinha verde; reconhecimento usa card com troféu e régua âmbar de 2px à esquerda; formação usa card com ícone de capelo e hairline neutra. A cor apenas reforça o que a forma já diz.
- **Retrato orbital** — foto recortada em círculo dentro de um sistema de anéis concêntricos em `--signal`: anel pontilhado externo (64s horário), anel tracejado interno (46s anti-horário), arcos de varredura, nós em órbita (34s) e marcadores de canto estáticos. O recorte circular remove o fundo original da foto, de modo que a moldura verde define a peça e a paleta do site é preservada. Só `transform` e `opacity`; congela sob reduced motion.
- **Case card** — layout alternado, capa com parallax contido, título, contexto, chips de tech, links explícitos.
- **Botão** — primário: fundo `--signal`, texto `--on-signal`. Secundário: hairline + texto. Ambos com foco visível de 2px.

---

## 11. Acessibilidade (obrigatório)

- HTML semântico: `header` / `nav` / `main` / `section` / `footer`; hierarquia `h1 → h2 → h3` sem pular nível.
- Skip link para `#main`.
- `:focus-visible` de 2px em `--signal` com offset de 2px, visível sobre qualquer superfície.
- Alvos de toque ≥ 44×44px; espaçamento ≥ 8px.
- `alt` descritivo em toda imagem de conteúdo; decorativo recebe `aria-hidden`.
- Canvas 3D é `aria-hidden` e `pointer-events: none`.
- Texto ≥ 4.5:1 sempre (ver tabela §3).
- Ordem de tabulação igual à ordem visual.
- Nav flutuante não pode obscurecer o elemento em foco (`scroll-margin-top`).

---

## 12. Anti-patterns (proibidos neste projeto)

- ❌ Gradiente azul→roxo "de IA"
- ❌ Neon glow em texto de leitura
- ❌ Emoji como ícone (usar Lucide)
- ❌ Scroll-jacking / rolagem sequestrada
- ❌ Conteúdo dentro do WebGL
- ❌ Animar `width` / `height` / `top` / `left`
- ❌ Tech stack apenas como logo, sem texto indexável
- ❌ Mais de duas cores de acento
- ❌ Bootstrap, jQuery, ícones em fonte
- ❌ Overflow horizontal em qualquer breakpoint
- ❌ Modo claro (produto é dark-only e assume isso explicitamente)

---

## 13. Checklist de entrega

- [ ] Sem emoji como ícone; set único (Lucide)
- [ ] `cursor: pointer` em todo clicável
- [ ] Hover com transição de 150–300ms
- [ ] Contraste de texto ≥ 4.5:1 em toda superfície
- [ ] Foco visível em navegação por teclado
- [ ] `prefers-reduced-motion` respeitado em reveal, parallax, tilt e 3D
- [ ] Responsivo validado em 375 / 768 / 1024 / 1440 / 1920
- [ ] Sem conteúdo escondido atrás da nav fixa
- [ ] Sem scroll horizontal em mobile
- [ ] 3D com degradação graciosa e fora do bundle inicial
- [ ] Toda tech visível como texto indexável
- [ ] `CNAME` preservado no build
