/**
 * Monta o HTML print-ready das duas versões do currículo.
 * Todo o conteúdo vem de `src/data/portfolio.ts` e `src/data/cv.ts`.
 */
import { profile, socials, timeline, awards, site } from '../src/data/portfolio.ts'
import type { TimelineEntry } from '../src/data/portfolio.ts'
import {
  bulletsFor, certifications, coreExpertise, coreExpertiseShort, cvContact,
  engineeringCases, languages, orgFor, periodFor, publications, roleFor,
  shortExperience, shortExperienceRest, summaryLong, summaryShort,
  techGroups, techGroupsShort,
} from '../src/data/cv.ts'
import type { TechGroup } from '../src/data/cv.ts'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const education = timeline.filter((e) => e.kind === 'education')

const link = (href: string, label: string) =>
  `<a href="${esc(href)}">${esc(label)}</a>`

function contactLine(): string {
  const gh = socials.find((s) => s.icon === 'github')!
  const li = socials.find((s) => s.icon === 'linkedin')!
  const sep = '<span class="sep">|</span>'
  return [
    esc(cvContact.location),
    link(`mailto:${profile.email}`, profile.email),
    link(cvContact.phoneHref, cvContact.phone),
    link(site.url, 'dinhostork.com'),
    link(li.href, 'linkedin.com/in/dinhostork'),
    link(gh.href, 'github.com/dinhostork'),
  ]
    .map((item) => `<span class="ci">${item}</span>`)
    .join(sep)
}

function header(): string {
  return `
  <header class="header">
    <h1 class="name">Anderson Oliveira <span class="alias">&ldquo;Dinho Stork&rdquo;</span></h1>
    <p class="headline">Engenheiro de Software &middot; Arquitetura de Sistemas &middot; Sistemas Distribuídos</p>
    <p class="contact">${contactLine()}</p>
  </header>`
}

function roleBlock(entry: TimelineEntry, variant: 'short' | 'long'): string {
  const meta = periodFor(entry)
  const bullets = bulletsFor(entry, variant)
  const where = meta.location ? ` <span class="where">&middot; ${esc(meta.location)}</span>` : ''
  const stack =
    variant === 'long' && entry.stack?.length
      ? `<p class="role-stack"><b>Stack:</b> ${esc(entry.stack.join(' · '))}</p>`
      : ''

  return `
    <article class="role">
      <div class="role-head">
        <div>
          <p class="role-title">${esc(roleFor(entry))}</p>
          <p class="role-org">${esc(orgFor(entry))}${where}</p>
        </div>
        <p class="role-period">${esc(meta.range)}</p>
      </div>
      ${bullets.length ? `<ul class="bullets">${bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
      ${stack}
    </article>`
}

function techBlock(groups: TechGroup[] = techGroups): string {
  return groups
    .map((g) => `<div><b>${esc(g.label)}</b> <span>${esc(g.items.join(' · '))}</span></div>`)
    .join('')
}

function eduBlock(): string {
  return education
    .map(
      (e) => `
      <div class="edu">
        <p class="edu-title">${esc(e.role)}</p>
        <p class="edu-org">${esc(e.org)}</p>
      </div>`,
    )
    .join('')
}

function awardsBlock(): string {
  return `<ul class="plain">${awards
    .map((a) => {
      const ctx = a.context ? ` &mdash; ${esc(a.context)}` : ''
      return `<li><b>${esc(a.year)} &middot; ${esc(a.title)}</b>${ctx}<br>${esc(a.org)}</li>`
    })
    .join('')}</ul>`
}

function shell(title: string, body: string, css: string, extraCss = '', bodyClass = ''): string {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<style>${css}</style>
${extraCss ? `<style>${extraCss}</style>` : ''}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${body}
</body>
</html>`
}

/**
 * Densidade extra aplicada só à versão curta, para fechar em uma página sem
 * sacrificar conteúdo. A versão longa mantém o respiro original.
 */
const COMPACT_CSS = `
@page { margin: 10mm 12mm; }

/* Cargo e empresa na mesma linha, período à direita. */
.compact .role-head > div { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0 6px; }
.compact .role-org::before { content: '·'; color: var(--rule); margin-right: 4px; }
.compact .role-org { margin-top: 0; }

/* Formação compacta: título e período numa linha, instituição logo abaixo. */
.compact .edu { line-height: 1.4; }
.compact .edu-org { font-size: 8.3pt; }

.compact .expertise { columns: 3; column-gap: 16px; }

body { font-size: 8.95pt; line-height: 1.34; }
.name { font-size: 20pt; }
.headline { font-size: 10.2pt; }
.contact { margin-top: 5px; font-size: 8.2pt; line-height: 1.5; }
.header { padding-bottom: 6px; margin-bottom: 9px; }
section { margin-top: 8px; }
h2 { font-size: 8.5pt; margin-bottom: 5px; padding-bottom: 2px; }
.role-title { font-size: 9.8pt; }
.role-org { font-size: 8.9pt; }
.role + .role { margin-top: 7px; }
ul.bullets { margin-top: 3px; }
ul.bullets li { margin-top: 1.5px; }
.expertise li { font-size: 8.8pt; line-height: 1.42; }
.tech div { margin-top: 2px; }
.tech b { min-width: 112px; font-size: 8.3pt; }
.tech span { font-size: 8.6pt; }
.two-col { margin-top: 8px; }
.edu + .edu { margin-top: 3px; }
.three-col { margin-top: 8px; grid-template-columns: 1.55fr 0.72fr 0.9fr; }
.role + .role { margin-top: 6px; }
.edu-title { font-size: 9.2pt; }
.edu-org { font-size: 8.6pt; }
.earlier { font-size: 8.5pt; margin-top: 6px; }
.footer-note { margin-top: 8px; padding-top: 4px; }
`

/* ------------------------------------------------------------------ *
 * CV SHORT — responde "por que entrevistar esta pessoa?" em segundos.
 * ------------------------------------------------------------------ */
export function renderShort(css: string): string {
  // Uma linha só: a versão longa traz cada uma dessas com detalhe completo.
  const earlier = shortExperienceRest
    .map((e) => (e.org === 'UFRB' ? 'UFRB (PPGCI Eventos)' : e.org))
    .join(' · ')

  const body = `
${header()}

<section>
  <h2>Resumo profissional</h2>
  <div class="summary"><p>${esc(summaryShort)}</p></div>
</section>

<section>
  <h2>Competências principais</h2>
  <ul class="expertise">${coreExpertiseShort.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
</section>

<section>
  <h2>Experiência profissional</h2>
  ${shortExperience.map((e) => roleBlock(e, 'short')).join('')}
  ${earlier ? `<p class="earlier"><b>Experiência anterior (2021&ndash;2022):</b> ${esc(earlier)}.</p>` : ''}
</section>

<section>
  <h2>Tecnologias</h2>
  <div class="tech">${techBlock(techGroupsShort)}</div>
</section>

<div class="three-col">
  <section>
    <h2>Formação</h2>
    ${eduBlock()}
  </section>
  <section>
    <h2>Idiomas</h2>
    <ul class="plain">
      ${languages.map((l) => `<li><b>${esc(l.name)}</b> &mdash; ${esc(l.level)}</li>`).join('')}
    </ul>
  </section>
  <section>
    <h2>Reconhecimento</h2>
    <ul class="plain">
      <li><b>4&times; Prêmio Inventor UFRB</b> &mdash; Smart Vagas (3&times;) e NUPI</li>
    </ul>
  </section>
</div>

<p class="footer-note">Versão completa, com detalhamento técnico de arquitetura e projetos, em ${site.url}.</p>`

  return shell('Anderson Oliveira — Software Engineer — CV Short', body, css, COMPACT_CSS, 'compact')
}

/* ------------------------------------------------------------------ *
 * CV LONG — responde "que sistemas ele consegue projetar e evoluir?".
 * ------------------------------------------------------------------ */
export function renderLong(css: string): string {
  const work = timeline.filter((e) => e.kind === 'work')

  const body = `
${header()}

<section>
  <h2>Perfil profissional</h2>
  <div class="summary">${summaryLong.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
</section>

<section>
  <h2>Competências técnicas</h2>
  <ul class="expertise">${coreExpertise.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
</section>

<section>
  <h2>Experiência profissional</h2>
  ${work.map((e) => roleBlock(e, 'long')).join('')}
</section>

<section>
  <h2>Projetos de engenharia selecionados</h2>
  ${engineeringCases
    .map(
      (c) => `
    <article class="case">
      <p class="case-name">${esc(c.name)}</p>
      <p class="case-discipline">${esc(c.discipline)}</p>
      <p class="case-body">${esc(c.body)}</p>
      <p class="role-stack"><b>Stack:</b> ${esc(c.stack.join(' · '))}</p>
      ${c.note ? `<p class="case-note">${esc(c.note)}</p>` : ''}
    </article>`,
    )
    .join('')}
</section>

<section>
  <h2>Tecnologias</h2>
  <div class="tech">${techBlock()}</div>
</section>

<section>
  <h2>Formação</h2>
  ${eduBlock()}
</section>

<section>
  <h2>Prêmios e reconhecimento</h2>
  ${awardsBlock()}
</section>

<div class="two-col">
  <section>
    <h2>Certificações</h2>
    <ul class="plain">${certifications.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
  </section>
  <section>
    <h2>Idiomas</h2>
    <ul class="plain">${languages.map((l) => `<li><b>${esc(l.name)}</b> &mdash; ${esc(l.level)}</li>`).join('')}</ul>
  </section>
</div>

<section>
  <h2>Publicações</h2>
  <ul class="plain">${publications
    .map((pub) => {
      const doi = pub.href ? `<br>${link(pub.href, pub.href.replace(/^https:\/\//, ''))}` : ''
      return `<li>${esc(pub.title)}${doi}</li>`
    })
    .join('')}</ul>
</section>

<p class="footer-note">Cases com capturas de tela e links para os repositórios em ${site.url}.</p>`

  return shell('Anderson Oliveira — Software Engineer — CV Long', body, css)
}
