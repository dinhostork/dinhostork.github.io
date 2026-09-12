import { Backdrop } from './components/Backdrop'
import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ScrollProgress'
import { Footer } from './components/Footer'
import { SectionBridge } from './components/SectionBridge'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Stack } from './sections/Stack'
import { Trajectory } from './sections/Trajectory'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'

export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="bg-signal text-on-signal focus:ring-signal sr-only rounded-chip focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-3 focus:text-sm focus:font-medium"
      >
        Pular para o conteúdo
      </a>

      <ScrollProgress />
      <Backdrop />
      <Nav />

      <main id="conteudo">
        <Hero />
        <SectionBridge />
        <About />
        <SectionBridge />
        <Stack />
        <SectionBridge />
        <Trajectory />
        <SectionBridge />
        <Projects />
        <SectionBridge />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
