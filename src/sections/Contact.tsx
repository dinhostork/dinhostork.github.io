import { ArrowUpRight, Briefcase, GitBranch, Mail, Send } from 'lucide-react'
import { profile, socials } from '../data/portfolio'
import { ButtonLink } from '../components/Button'
import { ResumeLinks } from '../components/ResumeLinks'
import { StaticNetwork } from '../3d/StaticNetwork'
import { Reveal } from '../motion/Reveal'
import { Stagger, StaggerItem } from '../motion/Stagger'

// Um único icon set (Lucide). O nome da rede aparece como texto ao lado,
// então o ícone é apoio visual e não o identificador da marca.
const icons = { github: GitBranch, linkedin: Briefcase, telegram: Send, mail: Mail }

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative overflow-hidden pt-10 pb-28 md:pt-14 md:pb-40"
    >
      {/* Fecha a experiência retomando a mesma malha do hero, agora em repouso. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <StaticNetwork className="h-[140%] w-[140%] max-w-none opacity-25 [mask-image:radial-gradient(closest-side,black,transparent)]" />
      </div>

      <div className="container-page relative">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-signal tnum">05</span>
            <span className="bg-line h-px w-8" aria-hidden="true" />
            Contato
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            id="contato-title"
            className="mt-6 max-w-4xl text-[clamp(2.25rem,7vw,5rem)] leading-[1] font-bold tracking-[-0.04em]"
          >
            Vamos construir<br />
            <span className="text-signal">alguma coisa juntos?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-muted measure mt-7 text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed">
            Estou aberto a novas oportunidades e colaborações. Se quiser conversar, é só me mandar um e-mail.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href={`mailto:${profile.email}`}>
              <Mail className="size-4" aria-hidden="true" />
              {profile.email}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="border-line mt-14 border-t pt-8">
            <p className="eyebrow mb-4">Currículo</p>
            <ResumeLinks variant="cards" />
          </div>
        </Reveal>

        <Stagger as="ul" className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((social) => {
            const Icon = icons[social.icon]
            return (
              <StaggerItem as="li" key={social.label} className="-m-px">
                <a
                  href={social.href}
                  {...(social.icon === 'mail'
                    ? {}
                    : { target: '_blank', rel: 'noreferrer noopener' })}
                  className="hairline bg-surface/50 hover:border-signal/40 hover:bg-surface-2 group flex h-full cursor-pointer flex-col justify-between gap-8 p-6 transition-colors duration-200"
                >
                  <Icon className="text-signal size-5" aria-hidden="true" />
                  <span>
                    <span className="flex items-center gap-1.5 text-sm font-medium">
                      {social.label}
                      <ArrowUpRight
                        className="text-dim size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-dim font-mono mt-1 block text-xs">{social.handle}</span>
                  </span>
                </a>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
