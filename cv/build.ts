/**
 * Gera os PDFs dos currículos a partir do HTML print-ready.
 *
 *   npm run cv
 *
 * Usa o Chrome instalado no sistema (puppeteer-core não baixa Chromium) e
 * grava a metadata do PDF com pdf-lib, já que o Chrome não expõe o campo Author.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'
import { PDFDocument } from 'pdf-lib'
import { renderLong, renderShort } from './template.ts'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const OUT_DIR = resolve(ROOT, 'public/assets')

/** Chrome do sistema; sobrescrevível por CHROME_PATH. */
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/snap/bin/chromium',
].filter((p): p is string => Boolean(p))

function findChrome(): string {
  const found = CHROME_CANDIDATES.find((p) => existsSync(p))
  if (!found) {
    throw new Error(
      'Chrome não encontrado. Instale o Google Chrome ou Chromium, ou defina CHROME_PATH.',
    )
  }
  return found
}

/** Inter auto-hospedada, a mesma do site — sem depender de rede na geração. */
async function inlineFonts(): Promise<string> {
  const faces = [
    { weight: '400 700', file: 'inter-latin-wght-normal.woff2' },
  ]
  const parts: string[] = []
  for (const face of faces) {
    const path = resolve(ROOT, 'node_modules/@fontsource-variable/inter/files', face.file)
    if (!existsSync(path)) continue
    const b64 = (await readFile(path)).toString('base64')
    parts.push(
      `@font-face{font-family:'Inter';font-style:normal;font-weight:${face.weight};` +
        `font-display:block;src:url(data:font/woff2;base64,${b64}) format('woff2-variations');}`,
    )
  }
  return parts.join('\n')
}

interface Doc {
  slug: string
  title: string
  html: string
}

async function main() {
  const css = [await inlineFonts(), await readFile(resolve(HERE, 'styles.css'), 'utf8')].join('\n')

  const docs: Doc[] = [
    {
      slug: 'anderson-oliveira-software-engineer-cv-short',
      title: 'Anderson Oliveira — Software Engineer — CV Short',
      html: renderShort(css),
    },
    {
      slug: 'anderson-oliveira-software-engineer-cv-long',
      title: 'Anderson Oliveira — Software Engineer — CV Long',
      html: renderLong(css),
    },
  ]

  await mkdir(OUT_DIR, { recursive: true })

  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
  })

  try {
    for (const doc of docs) {
      const page = await browser.newPage()
      await page.setContent(doc.html, { waitUntil: 'load' })
      await page.evaluateHandle('document.fonts.ready')

      const raw = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: false,
      })
      await page.close()

      // Chrome não escreve Author/Subject/Keywords; pdf-lib escreve.
      const pdf = await PDFDocument.load(raw)
      pdf.setTitle(doc.title)
      pdf.setAuthor('Anderson Oliveira')
      pdf.setSubject('Currículo — Engenheiro de Software')
      pdf.setCreator('dinhostork.com')
      pdf.setProducer('dinhostork.com')
      pdf.setKeywords([
        'Engenheiro de Software', 'Arquitetura de Software', 'Sistemas Distribuídos',
        'Backend', 'Python', 'Django', 'TypeScript', 'Node.js', 'Kubernetes',
        'Geoespacial', 'Inteligência Artificial',
      ])

      const dest = resolve(OUT_DIR, `${doc.slug}.pdf`)
      await writeFile(dest, await pdf.save())

      const kb = Math.round((await readFile(dest)).length / 1024)
      console.log(`${doc.slug}.pdf  ${pdf.getPageCount()} página(s)  ${kb} KB`)
    }
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
