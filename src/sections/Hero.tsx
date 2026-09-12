import { ArrowDown, ArrowUpRight, Briefcase, GitBranch, Mail, Send } from 'lucide-react'
import { motion } from 'motion/react'
import { profile, socials } from '../data/portfolio'
import { SystemVisual } from '../3d/SystemVisual'
import { TextReveal } from '../motion/TextReveal'
import { ButtonLink } from '../components/Button'
import { ResumeLinks } from '../components/ResumeLinks'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

// Um único icon set (Lucide). O nome da rede aparece como texto ao lado,
// então o ícone é apoio visual e não o identificador da marca.
const icons = { github: GitBranch, linkedin: Briefcase, telegram: Send, mail: Mail }

export function Hero() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden pt-28 pb-20 md:pt-32"
    >
      {/*
        Camada de sistema: WebGL quando o dispositivo aguenta, SVG quando não.
        Em telas estreitas ela recua para o topo e perde presença, para nunca
        competir com o texto de leitura.
      */}
      <div className="absolute inset-x-0 top-0 h-[45%] opacity-30 md:inset-y-0 md:left-auto md:h-auto md:w-[58%] md:opacity-90 lg:w-[52%]">
        <SystemVisual />
      </div>

      <div className="container-page relative">
        <div className="max-w-2xl lg:max-w-3xl">
          <motion.p
            className="eyebrow flex items-center gap-2.5"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-signal inline-block size-1.5 rounded-full" aria-hidden="true" />
            Aberto a novas oportunidades
          </motion.p>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.75rem,9vw,7rem)] leading-[0.95] font-bold tracking-[-0.04em]"
          >
            <TextReveal text="Dinho Stork" className="block" />
            <TextReveal
              text="Anderson Oliveira"
              delay={0.18}
              className="text-dim mt-1 block text-[clamp(1.1rem,3.2vw,2rem)] font-medium tracking-[-0.02em]"
            />
          </h1>

          <motion.p
            className="text-muted measure mt-7 text-[clamp(1.05rem,2.2vw,1.3rem)] leading-relaxed"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58 }}
          >
            <ButtonLink href="#projetos">
              Ver projetos
              <ArrowUpRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </ButtonLink>
            <ResumeLinks />
          </motion.div>
        </div>

        {/* Fora da medida de leitura: usa toda a coluna em telas largas. */}
        <motion.ul
          className="border-line mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-6"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {socials.map((social) => {
            const Icon = icons[social.icon]
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  {...(social.icon === 'mail'
                    ? {}
                    : { target: '_blank', rel: 'noreferrer noopener' })}
                  className="text-dim hover:text-signal rounded-chip flex min-h-11 cursor-pointer items-center gap-2 text-sm transition-colors duration-150"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="font-medium">{social.label}</span>
                  <span className="text-dim font-mono hidden text-xs sm:inline">
                    {social.handle}
                  </span>
                </a>
              </li>
            )
          })}
        </motion.ul>
      </div>

      <a
        href="#sobre"
        className="text-dim hover:text-signal container-page relative mt-14 hidden cursor-pointer items-center gap-3 text-xs transition-colors duration-150 md:flex"
      >
        <motion.span
          className="border-line flex size-9 items-center justify-center rounded-full border"
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="size-4" aria-hidden="true" />
        </motion.span>
        <span className="eyebrow">Continua abaixo</span>
      </a>
    </section>
  )
}
