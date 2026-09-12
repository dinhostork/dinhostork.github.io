import { Blocks, Globe, Network, Smartphone } from 'lucide-react'
import { capabilities, metrics, profile } from '../data/portfolio'
import { SectionHeader } from '../components/SectionHeader'
import { ProfilePortrait } from '../components/ProfilePortrait'
import { Reveal } from '../motion/Reveal'
import { Stagger, StaggerItem } from '../motion/Stagger'

const icons = { globe: Globe, smartphone: Smartphone, blocks: Blocks, network: Network }

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="container-page relative pt-6 pb-24 md:pt-8 md:pb-32">
      <SectionHeader
        index="01"
        eyebrow="Sobre"
        title="Onde eu atuo"
        headingId="sobre-title"
      />

      <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div>
          <Reveal>
            <div className="space-y-5">
              {profile.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-muted measure leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Stagger as="ul" className="mt-12 grid gap-px sm:grid-cols-2">
            {capabilities.map((capability) => {
              const Icon = icons[capability.icon]
              return (
                <StaggerItem
                  as="li"
                  key={capability.title}
                  className="bg-surface/60 hairline hover:border-signal/40 hover:bg-surface-2 group -m-px p-6 transition-colors duration-200"
                >
                  <Icon className="text-signal size-5" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold tracking-tight">
                    {capability.title}
                  </h3>
                  <p className="text-muted mt-2 text-sm leading-relaxed">
                    {capability.description}
                  </p>
                </StaggerItem>
              )
            })}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
          <figure className="hairline rounded-panel bg-surface/60 overflow-hidden">
            <ProfilePortrait />
            <figcaption className="border-line border-t p-5">
              <p className="font-display text-lg font-semibold tracking-tight">{profile.name}</p>
              <p className="text-dim font-mono mt-1 text-xs">{profile.role}</p>
            </figcaption>
          </figure>

          <dl className="mt-px grid grid-cols-2 gap-px">
            {metrics.map((metric) => (
              <div key={metric.label} className="hairline bg-surface/60 -m-px p-5">
                <dt className="text-dim font-mono text-[0.6875rem] tracking-wider uppercase">
                  {metric.label}
                </dt>
                <dd className="font-display tnum mt-2 text-3xl font-bold tracking-tight">
                  {metric.value}
                </dd>
                {metric.note ? (
                  <p className="text-award font-mono mt-1.5 text-[0.6875rem]">{metric.note}</p>
                ) : null}
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
