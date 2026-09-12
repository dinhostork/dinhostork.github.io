/**
 * Fonte única de verdade do conteúdo do portfólio.
 * Todo texto aqui foi migrado da versão anterior do site — nada foi inventado.
 * Para atualizar o portfólio, edite este arquivo. Os componentes não contêm conteúdo.
 */

export type Category = 'web' | 'mobile' | 'prototipo'

export interface Profile {
  name: string
  legalName: string
  role: string
  tagline: string
  intro: string[]
  email: string
  /** CV de 1 página, para triagem e candidatura rápida. */
  resumeShort: string
  /** CV técnico completo, para avaliação aprofundada. */
  resumeLong: string
  photo: string
  photoAlt: string
}

export interface SocialLink {
  label: string
  handle: string
  href: string
  icon: 'github' | 'linkedin' | 'telegram' | 'mail'
}

export interface Award {
  year: string
  title: string
  org: string
  /** Projeto que originou o prêmio, quando houver. */
  context?: string
}

export interface Metric {
  value: string
  label: string
  note?: string
}

export interface Capability {
  title: string
  description: string
  icon: 'globe' | 'smartphone' | 'blocks' | 'network'
}

export interface SkillGroup {
  id: string
  title: string
  caption: string
  primary: string[]
  secondary: string[]
}

export interface TimelineEntry {
  kind: 'work' | 'education'
  period: string
  role: string
  org: string
  summary?: string
  highlights?: string[]
  stack?: string[]
  link?: { label: string; href: string }
}

export interface Project {
  id: string
  name: string
  kicker: string
  categories: Category[]
  summary: string
  body: string[]
  stack: string[]
  cover: string
  coverAlt: string
  award?: string
  links: { label: string; href: string }[]
}

export const profile: Profile = {
  name: 'Dinho Stork',
  legalName: 'Anderson Oliveira',
  role: 'Engenheiro de Software',
  tagline:
    'Engenheiro de software com foco em arquitetura, backend e sistemas distribuídos, com experiência em cloud, dados e inteligência artificial aplicada a produtos.',
  intro: [
  'Sou engenheiro de software e atuo principalmente com backend, arquitetura e sistemas distribuídos, desenvolvendo e evoluindo produtos digitais em diferentes domínios.',

  'Trabalho atualmente com Python, TypeScript, JavaScript e PHP, além de já ter utilizado Go e Java em outros projetos. Minha experiência inclui bancos relacionais e não relacionais, mensageria, CI/CD, observabilidade, cloud e processamento assíncrono.',

  'Ao longo da minha trajetória, participei de projetos nas áreas de educação, cidades inteligentes, agricultura de precisão e inteligência artificial aplicada a produtos, atuando tanto na implementação quanto em decisões de arquitetura.',

  'Nesta página reuni minha trajetória, formação e alguns dos projetos em que trabalhei. Se quiser conversar, meus contatos estão no fim da página.',
],
  email: 'me@dinhostork.com',
  resumeShort: '/assets/anderson-oliveira-software-engineer-cv-short.pdf',
  resumeLong: '/assets/anderson-oliveira-software-engineer-cv-long.pdf',
  photo: '/images/perfil.jpg',
  photoAlt: 'Retrato de Dinho Stork (Anderson Oliveira)',
}

export const socials: SocialLink[] = [
  { label: 'GitHub', handle: '@dinhostork', href: 'https://github.com/dinhostork', icon: 'github' },
  { label: 'LinkedIn', handle: '/in/dinhostork', href: 'https://linkedin.com/in/dinhostork', icon: 'linkedin' },
  { label: 'Telegram', handle: '@dinhostork', href: 'https://t.me/dinhostork', icon: 'telegram' },
  { label: 'E-mail', handle: 'me@dinhostork.com', href: 'mailto:me@dinhostork.com', icon: 'mail' },
]

export const metrics: Metric[] = [
  { value: '+10', label: 'Projetos desenvolvidos' },
  { value: '6', label: 'Prêmios', note: 'Inventor UFRB e hackathons' },
]

export const awards: Award[] = [
  {
    year: '2025',
    title: 'Prêmio Inventor UFRB',
    org: 'Universidade Federal do Recôncavo da Bahia',
    context: 'NUPI',
  },
  {
    year: '2021',
    title: 'Prêmio Inventor UFRB (3×)',
    org: 'Universidade Federal do Recôncavo da Bahia',
    context: 'Smart Vagas',
  },
  {
    year: '2021',
    title: 'Vice-campeão — 1º Hackathon da Semana de Engenharia de Computação (SEnC)',
    org: 'Universidade de São Paulo (USP)',
  },
  {
    year: '2021',
    title: '1º lugar — Hackathon da Recode Jam',
    org: 'RECODE Jr.',
  },
]

export const capabilities: Capability[] = [
  {
    title: 'Desenvolvimento de sistemas web',
    description: 'Aplicações web e APIs REST, com atenção a performance e a práticas de segurança.',
    icon: 'globe',
  },
  {
    title: 'Desenvolvimento de aplicações Android',
    description: 'Aplicativos nativos em Android/Kotlin, do protótipo ao produto em operação.',
    icon: 'smartphone',
  },
  {
    title: 'Engenharia de Software',
    description: 'Especificação de requisitos, modelagem, testes, TDD e metodologias ágeis.',
    icon: 'blocks',
  },
  {
    title: 'Arquitetura de Software',
    description: 'Sistemas orientados a eventos, comunicação em tempo real, mensageria e escalabilidade horizontal.',
    icon: 'network',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Linguagens de Programação',
    caption: 'O que uso para escrever',
    primary: ['JavaScript', 'TypeScript', 'Java', 'Python', 'Kotlin'],
    secondary: ['Go', 'PHP'],
  },
  {
    id: 'frameworks',
    title: 'Frameworks / Plataformas',
    caption: 'Onde a aplicação roda',
    primary: ['Node.js', 'Next.js / React', 'Jest', 'Android Studio', 'Jenkins'],
    secondary: ['NestJS', 'Spring', 'Django', 'Linux'],
  },
  {
    id: 'infra',
    title: 'Dados & Infraestrutura',
    caption: 'Persistência e infraestrutura',
    primary: ['MySQL', 'MongoDB', 'PostgreSQL', 'Git', 'HTML/CSS'],
    secondary: ['Nginx', 'AWS', 'Docker', 'Scrum'],
  },
]

/** Ordenado do mais recente para o mais antigo, como no site anterior. */
export const timeline: TimelineEntry[] = [
  {
    kind: 'work',
    period: '2025',
    role: 'Engenheiro de Desenvolvimento de Software',
    org: 'SOS Plantão',
    highlights: [
      'Desenvolvimento de aplicações web responsivas com foco em usabilidade e performance.',
      'Implementação e manutenção de APIs RESTful com práticas seguras e padronizadas.',
      'Correção de bugs e refatoração de código visando a melhoria contínua e a qualidade das entregas.',
      'Versionamento contínuo e integração com pipelines de CI/CD.',
      'Atuação com metodologias ágeis.',
    ],
  },
  {
    kind: 'work',
    period: '2025',
    role: 'Engenheiro de Software',
    org: 'Sankofa Gestão e Educação (Conecta AEE)',
    summary:
      'Atuo na arquitetura, no backend e na camada de IA do Conecta AEE, sistema de gestão do Atendimento Educacional Especializado que atende vários municípios sob o mesmo produto.',
    highlights: [
      'Arquitetura multi-tenant preparada para múltiplos municípios, com APIs distribuídas, processamento assíncrono e comunicação em tempo real.',
      'Infraestrutura cloud-native em Kubernetes com autoscaling, health checks, CI/CD e estratégias de zero-downtime deployment.',
      'Busca indexada, armazenamento de objetos e observabilidade montados como serviços de plataforma, compartilhados entre os módulos.',
      'Integração de LLMs a fluxos reais do produto para geração e enriquecimento de conteúdo pedagógico, sumarização de informações e apoio à tomada de decisão.',
      'Engenharia de prompts, contextualização de modelos, structured outputs, feature flags e mecanismos de human-in-the-loop na camada de IA.',
      'Estudos de arquiteturas RAG com embeddings, recuperação semântica e grounding sobre a base de conhecimento educacional da plataforma.',
      'Segurança e conformidade com a LGPD: autenticação e autorização, MFA e trilhas de auditoria.',
      'Concorrência e integridade de dados, escalabilidade horizontal, tolerância a falhas e automação de processos.',
    ],
    stack: [
      'Python', 'Django', 'Django REST Framework', 'Next.js', 'TypeScript',
      'PostgreSQL', 'Redis', 'Celery', 'Elasticsearch', 'SeaweedFS / S3',
      'Docker', 'Kubernetes', 'LLMs', 'RAG',
    ],
  },
  {
    kind: 'work',
    period: '2025',
    role: 'Engenheiro de Software',
    org: 'GeoSpectra',
    summary:
      'O GeoSpectra transforma imagem de satélite em indicador por talhão. Trabalho na arquitetura dos pipelines assíncronos, na modelagem dos dados espaciais e nas séries temporais que sustentam a detecção de anomalias.',
    highlights: [
      'Arquitetura orientada a processamento assíncrono que consome imagens do Sentinel-2, processa dados geoespaciais e calcula índices de vegetação (NDVI, EVI, SAVI, GNDVI, NDRE e NDWI).',
      'Séries temporais usadas no acompanhamento da evolução das propriedades rurais e na identificação de anomalias, estresse hídrico, deficiências nutricionais e possíveis patologias agrícolas.',
      'Pipelines computacionalmente intensivos executados de forma assíncrona com Celery e Redis, atualizações em tempo real via Django Channels e WebSockets, e armazenamento de imagens, bandas espectrais e artefatos geoespaciais em MinIO/S3.',
      'Machine learning sobre os índices e as séries temporais para detectar anomalias, classificar áreas agrícolas, antecipar estresse vegetal e estimar risco.',
      'Evolução de mecanismos determinísticos por limiar fixo para abordagens híbridas que combinam regras de domínio, modelos estatísticos e algoritmos de ML sobre índices espectrais, histórico temporal, dados meteorológicos e características do solo.',
      'Frentes de computer vision e deep learning em imagens multiespectrais: segmentação, classificação de regiões, detecção de mudanças e reconhecimento de padrões espaciais, com feature engineering espectral, clustering e detecção de outliers.',
      'LLMs interpretam resultados já calculados pela plataforma e escrevem resumos técnicos e explicações de anomalias. O número continua vindo do dado geoespacial e dos algoritmos analíticos.',
      'Integração com Copernicus Data Space, SentinelHub, INMET, SoilGrids, TerraBrasilis e CAR/SICAR, reunindo satélite, clima, solo, desmatamento e registro ambiental na mesma base.',
      'Rastreabilidade e auditabilidade: relatórios técnicos automatizados com mapas e séries temporais, versionamento de geometrias, validação topológica, registro de evidências em blockchain Polygon PoS, fluxos de LGPD e notificações multicanal.',
      'Interfaces cartográficas em Next.js 15, React 19 e TypeScript sobre Leaflet, com visualização de séries temporais, dashboards e manipulação de propriedades e talhões sobre mapas interativos.',
    ],
    stack: [
      'Python', 'Django', 'Django REST Framework', 'GeoDjango', 'PostGIS',
      'GeoPandas', 'Shapely', 'Celery', 'Redis', 'Django Channels', 'WebSockets',
      'MinIO / S3', 'Next.js 15', 'React 19', 'TypeScript', 'Leaflet',
      'Sentinel-2', 'Polygon PoS',
    ],
  },
  {
    kind: 'work',
    period: '2024',
    role: 'Engenheiro de Software',
    org: 'Positivo Tecnologia',
    highlights: [
      'Arquitetura de sistemas orientados a eventos com comunicação em tempo real e alta performance.',
      'Implementação de comunicação assíncrona resiliente com reconexão automática e baixa latência.',
      'Integração com sistemas de mensageria e bancos relacionais para escalar aplicações críticas.',
      'Aplicação de modelos de IA para análise de linguagem natural, automação de interações e decisões baseadas em dados.',
      'Desenvolvimento de pipelines otimizados para inferência em tempo real.',
      'Automação de CI/CD com foco em confiabilidade e tempo de entrega.',
      'Monitoramento em tempo real e mitigação de gargalos de performance.',
      'Gerenciamento de ambientes de staging e produção com segurança e estabilidade.',
      'Suporte a múltiplos canais de interação e funcionalidades multimodais.',
    ],
    stack: [
      'Python', 'Django', 'WebSocket', 'Redis', 'Redux-Saga', 'MySQL', 'Jenkins',
      'Prometheus', 'Silk', 'Nginx', 'Telegram API', 'ngrok', 'OpenAI API',
      'Transformers', 'NLTK', 'spaCy', 'scikit-learn',
    ],
  },
  {
    kind: 'work',
    period: '2021 — 2022',
    role: 'FullStack Developer — Node.js',
    org: 'UFRB',
    summary:
      'Escrevi as regras de negócio do sistema de eventos da Pró-Reitoria de Pesquisa, Pós-Graduação, Criação e Inovação da UFRB, que está em produção.',
    stack: ['Node.js', 'MongoDB', 'AWS', 'Barramento de Software'],
    link: { label: 'ppgcieventos.ufrb.edu.br', href: 'https://ppgcieventos.ufrb.edu.br/' },
  },
  {
    kind: 'work',
    period: '2021 — 2022',
    role: 'Instrutor do curso Programador de Sistemas',
    org: 'SENAC BA',
    summary: 'Formação de novos programadores, cobrindo fundamentos até entrega de software.',
    highlights: [
      'Algoritmos e Linguagens de Programação',
      'Linguagem Python',
      'Princípios de Orientação a Objetos',
      'Modelagem UML',
      'Bancos de Dados',
      'Testes e Manutenção de Software',
      'TDD',
      'Metodologias Ágeis para Desenvolvimento de Software',
    ],
  },
  {
    kind: 'work',
    period: '2021 — 2022',
    role: 'Desenvolvedor Full Stack',
    org: 'Prefeitura Municipal de Castro Alves — BA',
    summary:
      'A Vitrine Virtual reúne o comércio local, os serviços e os pontos de interesse da cidade num aplicativo. Trabalhei no Android e na integração com os serviços da plataforma.',
    highlights: [
      'Desenvolvimento do aplicativo Android e integração com os serviços da plataforma.',
      'Catálogo de estabelecimentos e anúncios, eventos, guias turísticos e roteiros.',
      'Recursos baseados em geolocalização e mapas para situar negócios e pontos de interesse no território da cidade.',
      'Consumo de APIs REST e construção de interfaces voltadas ao acesso simples da população aos negócios e serviços locais.',
    ],
    stack: [
      'Kotlin', 'Android SDK', 'REST APIs', 'Retrofit', 'Gson',
      'Google Maps', 'OpenStreetMap / osmdroid', 'Picasso', 'Geolocalização',
    ],
  },
  {
    kind: 'work',
    period: '2021 — 2022',
    role: 'Desenvolvedor Web',
    org: 'Agência de Marketing Rainbow',
    summary:
      'Trabalhei como freelancer da agência, criando e mantendo sites institucionais, landing pages e páginas promocionais para os clientes dela.',
    highlights: [
      'Desenvolvimento de páginas com HTML, CSS e JavaScript.',
      'Customização de soluções em WordPress/PHP.',
      'Integração de formulários e serviços externos.',
      'Ajustes de responsividade, SEO técnico, desempenho e compatibilidade entre navegadores.',
      'Trabalho conjunto com designers e equipe de marketing, com foco em entregas rápidas e aderência à identidade visual de cada cliente.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress', 'Responsive Design', 'SEO'],
  },
  {
    kind: 'work',
    period: '2019 — 2020',
    role: 'Backend Developer',
    org: 'Cidades Inteligentes — Smart Vagas',
    summary:
      'O controle de estacionamento nesses municípios era manual. O Smart Vagas trocou isso por um sistema com aplicativo do motorista, aplicativo do fiscal e painel da prefeitura, criado dentro de um modelo de cidades inteligentes.',
    highlights: [
      'Quatro módulos: API central, painel da prefeitura, aplicativo do motorista e aplicativo do fiscal. Cobriam vagas, veículos estacionados, compra e uso de créditos e histórico.',
      'Arquitetura e desenvolvimento do backend: API REST em Node.js e Express cobrindo autenticação e autorização, usuários, veículos, estacionamentos, vagas, operações de estacionamento, créditos, transações, notificações e históricos.',
      'Autorização separada por perfil de motorista, fiscal e administração, com autenticação JWT.',
      'Persistência relacional em MySQL com Sequelize, validação de dados, upload de arquivos e processamento assíncrono através de filas.',
      'Integração entre backend e os aplicativos móveis em Kotlin, usando Google Maps e geolocalização para contextualizar estacionamentos e vagas no espaço urbano.',
      'Camada mobile com comunicação HTTP assíncrona via Kotlin Coroutines, OkHttp, Volley e Gson.',
      'Dashboard web para gestão municipal, posteriormente estruturado com Next.js, React e TypeScript.'    ],
    stack: [
      'Node.js', 'Express', 'REST API', 'JavaScript', 'MySQL', 'Sequelize',
      'JWT', 'Bcrypt', 'Bee-Queue', 'Sentry', 'Kotlin', 'Android',
      'Google Maps', 'Geolocalização', 'Kotlin Coroutines', 'OkHttp', 'Volley',
      'Gson', 'Next.js', 'React', 'TypeScript',
    ],
  },
  {
    kind: 'education',
    period: 'Graduação',
    role: 'Engenharia de Computação',
    org: 'Universidade Federal do Recôncavo da Bahia (UFRB)',
  },
  {
    kind: 'education',
    period: 'Graduação',
    role: 'Bacharelado em Ciências Exatas e Tecnológicas',
    org: 'Universidade Federal do Recôncavo da Bahia (UFRB)',
  },
  {
    kind: 'education',
    period: 'Técnico',
    role: 'Técnico em Eletrotécnica',
    org: 'Serviço Nacional de Aprendizagem Industrial (SENAI-BA)',
  },
]

export const projects: Project[] = [
  {
    id: 'smart-vagas',
    name: 'Smart Vagas',
    kicker: 'Plataforma',
    categories: ['mobile', 'web'],
    summary:
      'Plataforma de estacionamento para cidades inteligentes, composta por três módulos: app do motorista, app do guarda e painel web da prefeitura.',
    body: [
      'A Smart Vagas tem três aplicações: uma para o motorista e outra para o guarda, ambas em Android/Kotlin, e um painel web da prefeitura em React.',
      'Foi criada dentro de um framework para cidades brasileiras de pequeno e médio porte que querem adotar o conceito de cidade inteligente. A prefeitura gerencia as vagas, os guardas de trânsito acompanham os veículos estacionados e os motoristas compram e usam créditos.',
      'O backend roda em Node.js, com MySQL e MongoDB para persistência e S3 para os arquivos.',
    ],
    stack: ['Android', 'Kotlin', 'React', 'Node.js', 'MongoDB', 'MySQL', 'AWS S3'],
    cover: '/images/projects/smart-vagas-cover.webp',
    coverAlt: 'Telas da plataforma Smart Vagas',
    award: 'Três prêmios "Inventor UFRB" em 2021, em reconhecimento pelo desenvolvimento e registro de inovações na UFRB.',
    links: [
      { label: 'Ver no LinkedIn', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7061353027198226432/' },
    ],
  },
  {
    id: 'ppgci-eventos',
    name: 'PPGCI Eventos',
    kicker: 'Sistema web',
    categories: ['web'],
    summary:
      'Sistema de eventos da Pró-Reitoria de Pesquisa, Pós-Graduação, Criação e Inovação da UFRB, em produção.',
    body: [
      'Neste projeto desenvolvi as regras de negócio para o funcionamento do sistema de eventos da Pró-Reitoria de Pesquisa, Pós-Graduação, Criação e Inovação da Universidade Federal do Recôncavo da Bahia.',
    ],
    stack: ['Node.js', 'Redis', 'MongoDB', 'Angular', 'Sistema de filas'],
    cover: '/images/projects/ppgci-eventos-cover.webp',
    coverAlt: 'Interface do sistema PPGCI Eventos',
    links: [{ label: 'Ver em produção', href: 'https://ppgcieventos.ufrb.edu.br/' }],
  },
  {
    id: 'adagio',
    name: 'ADAGIO',
    kicker: 'Plataforma',
    categories: ['web', 'mobile', 'prototipo'],
    summary:
      'Plataforma para músicos marcarem encontros musicais, publicarem canções autorais, vídeos e Jam Sessions.',
    body: [
      'Adagio é uma plataforma para músicos que desejam marcar encontros musicais. Além disso, é possível publicar canções autorais, vídeos, marcar Jam Sessions e muito mais.',
      'O projeto ainda está em desenvolvimento. Usei para experimentar Next.js, TypeScript, Tailwind CSS e styled-components, e organizei o frontend com Atomic Design para manter a estrutura previsível conforme ela cresce.',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'styled-components', 'Atomic Design'],
    cover: '/images/projects/adagio-cover.webp',
    coverAlt: 'Interface da plataforma ADAGIO',
    links: [
      { label: 'Backend no GitHub', href: 'https://github.com/dinhostork/adagio-backend' },
      { label: 'Frontend no GitHub', href: 'https://github.com/dinhostork/adagio-frontend' },
    ],
  },
  {
    id: 'sgeeh',
    name: 'SGEEH',
    kicker: 'Sistema web',
    categories: ['web'],
    summary:
      'Sistema de Gestão Escolar e Ensino Híbrido: informatiza a gestão escolar e interliga as entidades do sistema educacional municipal.',
    body: [
      'O SGEEH informatiza a gestão escolar para agilizar a tomada de decisão, interligando as entidades do sistema educacional municipal. A ideia é dar a professores, pais e alunos um ambiente de aprendizagem compartilhado.',
    ],
    stack: [],
    cover: '/images/projects/sgeeh-cover.webp',
    coverAlt: 'Apresentação do Sistema de Gestão Escolar e Ensino Híbrido',
    links: [
      {
        label: 'Ver apresentação',
        href: 'https://view.genial.ly/6001d48ba3ac61454749b992/presentation-stork-sgeeh-presentation',
      },
    ],
  },
  {
    id: 'coops',
    name: 'COOPs',
    kicker: 'Aplicativo',
    categories: ['mobile', 'prototipo'],
    summary: 'Aprendizado cooperativo entre estudantes universitários.',
    body: ['COOPs é um espaço onde estudantes universitários estudam juntos e trocam material.'],
    stack: [],
    cover: '/images/projects/coops-cover.webp',
    coverAlt: 'Telas do aplicativo COOPs',
    links: [{ label: 'Ver no GitHub', href: 'https://github.com/dinhostork/Coops-Frontend-MVP-SEnC-2020' }],
  },
  {
    id: 'superjunto',
    name: 'Superjunto',
    kicker: 'Engenharia de Software',
    categories: ['mobile', 'prototipo'],
    summary:
      'Plataforma colaborativa onde moradores de uma mesma comunidade compartilham listas de compras e fazem compras juntas.',
    body: [
      'Plataforma onde moradores de uma mesma comunidade, seja bairro, rua ou prédio, compartilham listas de compras e se juntam para comprar num supermercado local.',
      'Cada um atualiza a lista com os preços que encontrou, formando uma base colaborativa de preços de supermercado da região.',
    ],
    stack: [],
    cover: '/images/projects/superjunto-cover.webp',
    coverAlt: 'Telas do aplicativo Superjunto',
    links: [
      {
        label: 'Ver no LinkedIn',
        href: 'https://www.linkedin.com/pulse/explorando-o-processo-criativo-e-engenharia-de-projeto-oliveira/',
      },
    ],
  },
  {
    id: 'nupi',
    name: 'NUPI',
    kicker: 'Sistema web',
    categories: ['web'],
    summary:
      'Plataforma de atendimentos do NUPI: simplifica o agendamento de solicitações de intérpretes para eventos da UFRB.',
    body: [
      'A plataforma de atendimentos do NUPI tem como objetivo simplificar e facilitar agendamentos de solicitações de intérpretes para eventos da UFRB.',
      'Neste projeto desenvolvo as regras de negócio do backend e do frontend da aplicação.',
    ],
    stack: ['React', 'Node.js', 'Express', 'TypeScript', 'MySQL', 'Redis', 'Sistema de filas'],
    cover: '/images/projects/nupi-cover.webp',
    coverAlt: 'Interface da plataforma de atendimentos do NUPI',
    award: 'Prêmio "Inventor UFRB" em 2025.',
    links: [{ label: 'Ver em produção', href: 'https://nupi.ness.dev.br' }],
  },
  {
    id: 'cardapio-ru',
    name: 'O que tem pra hoje no RU?',
    kicker: 'Web',
    categories: ['web'],
    summary: 'Visualização organizada do cardápio do Restaurante Universitário da UFRB.',
    body: [
      'Este site permite visualizar de forma organizada o cardápio do Restaurante Universitário da UFRB.',
      'O projeto foi descontinuado, mas ainda pode ser acessado.',
    ],
    stack: [],
    cover: '/images/projects/ru-cover.webp',
    coverAlt: 'Interface do site de cardápio do Restaurante Universitário',
    links: [
      { label: 'Ver em produção', href: 'https://cardapio-ru-ufrb-o98wbnsmf-dinhostork.vercel.app/' },
    ],
  },
  {
    id: 'rock-on',
    name: 'Rock On',
    kicker: 'Especificação',
    categories: ['web', 'prototipo'],
    summary:
      'Plataforma de divulgação para bandas independentes de rock, com transmissões ao vivo e ingressos virtuais.',
    body: [
      'Rock On é uma plataforma de divulgação para bandas independentes de rock, com transmissão de shows ao vivo. Os fãs assistem de graça ou com ingressos virtuais, obtidos por compartilhamento nas redes sociais ou por pagamento. A ideia era baratear o acesso de quem quer apoiar banda independente.',
      'Este projeto foi desenvolvido para explorar aspectos da engenharia de software, por isso, até o momento, possui apenas especificação dos requisitos.',
    ],
    stack: [],
    cover: '/images/projects/rockon-cover.webp',
    coverAlt: 'Identidade visual do projeto Rock On',
    links: [
      {
        label: 'Ver no Notion',
        href: 'https://translucent-gondola-5a9.notion.site/Requisitos-6f971d550f3c476da4043a1af8e7e4c9?pvs=4',
      },
    ],
  },
]

export const categoryLabels: Record<Category | 'todos', string> = {
  todos: 'Todos',
  web: 'Web',
  mobile: 'Mobile',
  prototipo: 'Protótipos',
}

export const chapters = [
  { id: 'inicio', index: '00', label: 'Início' },
  { id: 'sobre', index: '01', label: 'Sobre' },
  { id: 'stack', index: '02', label: 'Stack' },
  { id: 'trajetoria', index: '03', label: 'Trajetória' },
  { id: 'projetos', index: '04', label: 'Projetos' },
  { id: 'contato', index: '05', label: 'Contato' },
] as const

export const site = {
  url: 'https://dinhostork.com',
  title: 'Dinho Stork — Engenheiro de Software',
  description:
    'Portfólio de Dinho Stork (Anderson Oliveira), engenheiro de software com atuação em backend, sistemas distribuídos, aplicações em tempo real e integração com IA.',
  locale: 'pt_BR',
}
