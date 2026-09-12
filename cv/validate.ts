/**
 * Valida os PDFs gerados.
 *
 *   npm run cv:check
 *
 * Confere o que um ATS e um recrutador precisam: texto real (não imagem),
 * metadata preenchida, links clicáveis e contagem de páginas dentro do alvo.
 */
import { readFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PDFDocument, PDFName, PDFDict, PDFArray, PDFString } from 'pdf-lib'
import { execFileSync } from 'node:child_process'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

interface Expectation {
  file: string
  label: string
  maxPages: number
  mustContain: string[]
}

const EXPECTATIONS: Expectation[] = [
  {
    file: 'anderson-oliveira-software-engineer-short.pdf',
    label: 'CV Short',
    maxPages: 1,
    mustContain: ['Anderson Oliveira', 'Conecta AEE', 'GeoSpectra', 'Smart Vagas', 'Inventor UFRB'],
  },
  {
    file: 'anderson-oliveira-software-engineer-long.pdf',
    label: 'CV Long',
    maxPages: 4,
    mustContain: [
      'Anderson Oliveira', 'Conecta AEE', 'GeoSpectra', 'Smart Vagas',
      'Inventor UFRB', 'PUBLICAÇÕES', 'CERTIFICAÇÕES',
    ],
  },
]

/**
 * Extrai o texto com o pdftotext (poppler) — o mesmo tipo de extração que um
 * ATS faz. É a checagem que importa: se sai texto aqui, sai no parser deles.
 */
function extractText(path: string): string | null {
  try {
    return execFileSync('pdftotext', [path, '-'], { encoding: 'utf8', maxBuffer: 8 << 20 })
  } catch {
    return null
  }
}

/** URIs de anotações de link, que são o que torna o PDF clicável. */
function extractLinks(pdf: PDFDocument): string[] {
  const urls = new Set<string>()
  for (const page of pdf.getPages()) {
    const annots = page.node.Annots()
    if (!(annots instanceof PDFArray)) continue
    for (const ref of annots.asArray()) {
      const annot = pdf.context.lookup(ref)
      if (!(annot instanceof PDFDict)) continue
      const action = annot.get(PDFName.of('A'))
      const dict = action instanceof PDFDict ? action : pdf.context.lookup(action)
      if (!(dict instanceof PDFDict)) continue
      const uri = dict.get(PDFName.of('URI'))
      if (uri instanceof PDFString) urls.add(uri.asString())
    }
  }
  return [...urls]
}

let failed = false
const fail = (msg: string) => {
  console.log(`  ✗ ${msg}`)
  failed = true
}
const ok = (msg: string) => console.log(`  ✓ ${msg}`)

for (const exp of EXPECTATIONS) {
  const path = resolve(ROOT, 'public/assets', exp.file)
  const bytes = await readFile(path)
  const pdf = await PDFDocument.load(bytes)

  console.log(`\n${exp.label} — ${exp.file}`)

  const pages = pdf.getPageCount()
  if (pages <= exp.maxPages) ok(`${pages} página(s) (limite ${exp.maxPages})`)
  else fail(`${pages} página(s), acima do limite de ${exp.maxPages}`)

  const title = pdf.getTitle()
  const author = pdf.getAuthor()
  if (title?.includes('Anderson Oliveira')) ok(`Title: ${title}`)
  else fail(`Title ausente ou errado: ${title}`)

  if (author === 'Anderson Oliveira') ok(`Author: ${author}`)
  else fail(`Author ausente ou errado: ${author}`)

  const text = extractText(path)
  if (text === null) {
    console.log('  ! pdftotext indisponível — extração de texto não verificada')
  } else {
    if (text.length > 1500) ok(`texto extraível: ${text.length} caracteres (não é imagem)`)
    else fail(`texto extraível insuficiente: ${text.length} caracteres`)

    const missing = exp.mustContain.filter((term) => !text.includes(term))
    if (missing.length === 0) ok(`termos-chave presentes: ${exp.mustContain.join(', ')}`)
    else fail(`termos ausentes no texto: ${missing.join(', ')}`)

    // Um heading no fim da página sem o conteúdo que ele anuncia é falha de layout.
    const orphan = text.split('\n').some((line, i, all) => {
      const heading = /^[A-ZÀ-Ú][A-ZÀ-Ú\s]{6,}$/.test(line.trim())
      return heading && (all[i + 1] ?? '').includes('\f')
    })
    if (orphan) fail('heading órfão no fim de uma página')
    else ok('nenhum heading órfão')
  }

  const links = extractLinks(pdf)
  const required = ['mailto:me@dinhostork.com', 'https://dinhostork.com', 'linkedin', 'github', 'tel:']
  const missingLinks = required.filter((r) => !links.some((l) => l.includes(r)))
  if (missingLinks.length === 0) ok(`${links.length} links clicáveis, todos os esperados presentes`)
  else fail(`links ausentes: ${missingLinks.join(', ')}`)

  const size = Math.round(bytes.length / 1024)
  if (size < 500) ok(`${size} KB`)
  else fail(`${size} KB — grande demais para anexo de candidatura`)
}

console.log(failed ? '\nVALIDAÇÃO FALHOU' : '\nVALIDAÇÃO OK')
process.exitCode = failed ? 1 : 0
