/**
 * Conteúdo específico dos currículos.
 *
 * Os FATOS (cargos, empresas, formação, prêmios, projetos, stacks) vêm de
 * `portfolio.ts` e não são duplicados aqui — currículo e site compartilham a
 * mesma fonte, então atualizar um atualiza o outro.
 *
 * Este arquivo guarda apenas o que é próprio de um currículo: dados de contato
 * que não vão para o site, períodos com precisão de mês, e a redação curada
 * para cada uma das duas versões.
 */
import { timeline } from './portfolio.ts'
import type { TimelineEntry } from './portfolio.ts'

/** Chave estável de uma experiência: `org::role`. */
export function entryKey(entry: TimelineEntry): string {
  return `${entry.org}::${entry.role}`
}

export interface CvContact {
  location: string
  phone: string
  phoneHref: string
}

export const cvContact: CvContact = {
  location: 'Cruz das Almas, Bahia, Brasil',
  phone: '+55 75 98332-1219',
  phoneHref: 'tel:+5575983321219',
}

export const languages = [
  { name: 'Português', level: 'Nativo' },
  { name: 'Inglês', level: 'Profissional completo' },
]

export const certifications = [
  'Cloud Engineering with Google Cloud',
  'Estrutura e Funcionamento das Redes de Computadores',
  'Node.js',
]

export interface Publication {
  title: string
  /** DOI ou URL, quando houver link estável. */
  href?: string
}

/** Da mais recente para a mais antiga. */
export const publications: Publication[] = [
  {
    title: 'CHAT-EDA: An Event-Driven Architecture proposal for intelligent chatbots',
    href: 'https://doi.org/10.66983/recet.v7i1.5297',
  },
  {
    title:
      'Projeto e desenvolvimento de melhorias para o sistema de gestão de eventos científicos da UFRB',
  },
  { title: 'Cidades inteligentes em municípios de pequeno e médio porte: iniciativas e indicadores' },
  { title: 'Estrutura tecnológica de backend para cidades inteligentes e inclusivas' },
]

/**
 * Períodos com precisão de mês e vínculo formal, quando conhecidos.
 * O site exibe apenas o ano; o currículo precisa do intervalo exato.
 */
export interface CvPeriod {
  range: string
  location?: string
  /** Sobrescreve a organização quando o vínculo formal difere do nome do projeto. */
  org?: string
  /** Sobrescreve o cargo quando o título formal difere do exibido no site. */
  role?: string
}

export const cvPeriods: Record<string, CvPeriod> = {
  'SOS Plantão::Engenheiro de Desenvolvimento de Software': {
    range: 'jun 2025 — atual',
  },
  'Sankofa Gestão e Educação (Conecta AEE)::Engenheiro de Software': {
    range: '2025',
  },
  'GeoSpectra::Engenheiro de Software': {
    range: '2025',
  },
  'Positivo Tecnologia::Engenheiro de Software': {
    range: 'mar 2024 — abr 2025',
  },
  'UFRB::FullStack Developer — Node.js': {
    range: 'set 2021 — jul 2022',
    org: 'Universidade Federal do Recôncavo da Bahia (UFRB)',
    role: 'Bolsista — Desenvolvedor Full Stack (PPGCI Eventos)',
  },
  'SENAC BA::Instrutor do curso Programador de Sistemas': {
    range: 'jul 2021 — fev 2022',
    location: 'Santo Antônio de Jesus, BA',
  },
  'Prefeitura Municipal de Castro Alves — BA::Desenvolvedor Full Stack': {
    range: 'out 2021 — jun 2022',
    location: 'Castro Alves, BA',
  },
  'Agência de Marketing Rainbow::Desenvolvedor Web': {
    range: '2021 — 2022',
  },
  'Cidades Inteligentes — Smart Vagas::Backend Developer': {
    range: 'jul 2019 — ago 2020',
    org: 'Universidade Federal do Recôncavo da Bahia (UFRB)',
    role: 'Bolsista — Desenvolvedor Backend (Smart Vagas)',
  },
}

export function periodFor(entry: TimelineEntry): CvPeriod {
  return cvPeriods[entryKey(entry)] ?? { range: entry.period }
}

export function orgFor(entry: TimelineEntry): string {
  return periodFor(entry).org ?? entry.org
}

export function roleFor(entry: TimelineEntry): string {
  return periodFor(entry).role ?? entry.role
}

/* ------------------------------------------------------------------ *
 * Resumos
 * ------------------------------------------------------------------ */

export const summaryShort =
  'Engenheiro de software com foco em arquitetura de sistemas e backend distribuído. Trabalho com ' +
  'plataformas SaaS multi-tenant, processamento assíncrono por filas, cache distribuído e ' +
  'comunicação em tempo real, em containers sobre Kubernetes. Também atuo com dados: pipelines ' +
  'geoespaciais sobre imagens de satélite, busca indexada e séries temporais. Uso modelos de ' +
  'linguagem em fluxos específicos do produto, sempre com revisão humana antes da entrega. Formado ' +
  'em Engenharia de Computação pela UFRB, com quatro prêmios Inventor UFRB.'

export const summaryLong = [
  'Engenheiro de software com foco em arquitetura de sistemas, backend distribuído e plataformas de ' +
    'dados. Meu trabalho mais recente é em SaaS multi-tenant: modelagem do isolamento por cliente, ' +
    'APIs REST com controle de acesso por perfil e as tarefas de maior custo computacional rodando ' +
    'fora do caminho de requisição. A aplicação roda em containers sobre Kubernetes, com CI/CD e ' +
    'deploy sem downtime.',
  'Escala costuma ser consequência de como o sistema foi dividido, então gasto tempo definindo ' +
    'fronteiras de domínio e instrumentando a aplicação para medir gargalo em vez de supor. Em ' +
    'segurança, o padrão é autenticação e autorização por perfil, RBAC, MFA, trilha de auditoria e ' +
    'os fluxos que a LGPD exige.',
  'Do lado de dados, construí pipelines que consomem imagens do Sentinel-2, calculam índices de ' +
    'vegetação e mantêm séries temporais por talhão. É o que sustenta a detecção de anomalia em ' +
    'lavoura. Onde uso modelo de linguagem, ele trabalha sobre resultado já calculado e passa por ' +
    'revisão humana antes de chegar ao usuário. O número vem do dado, não do modelo.',
  'Sou Engenheiro de Computação pela UFRB e antes disso fiz técnico em eletrotécnica. Recebi três ' +
    'prêmios Inventor UFRB pelo Smart Vagas, cujos módulos estão registrados como software com a ' +
    'universidade como titular, e um quarto pelo NUPI.',
]

/* ------------------------------------------------------------------ *
 * Competências
 * ------------------------------------------------------------------ */

export const coreExpertise = [
  'Arquitetura de Software',
  'Sistemas Distribuídos',
  'Backend Engineering',
  'Plataformas SaaS Multi-tenant',
  'Processamento Assíncrono',
  'Cloud Native · Docker · Kubernetes',
  'Sistemas Orientados a Dados',
  'Engenharia Geoespacial',
  'IA Aplicada · LLMs',
  'APIs REST',
]

/** Recorte da versão curta: o essencial para triagem em poucos segundos. */
export const coreExpertiseShort = [
  'Arquitetura de Software',
  'Sistemas Distribuídos',
  'Backend Engineering',
  'Plataformas SaaS Multi-tenant',
  'Cloud Native · Docker · Kubernetes',
  'IA Aplicada · LLMs',
]

export interface TechGroup {
  label: string
  items: string[]
}

export const techGroups: TechGroup[] = [
  {
    label: 'Linguagens',
    items: ['Python', 'TypeScript', 'JavaScript', 'Kotlin', 'Java', 'Go', 'PHP'],
  },
  {
    label: 'Backend',
    items: [
      'Django', 'Django REST Framework', 'Node.js', 'Express', 'NestJS', 'Spring',
      'Celery', 'Django Channels', 'WebSockets', 'Bee-Queue', 'JWT', 'RBAC',
    ],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Angular', 'Electron'],
  },
  {
    label: 'Dados e busca',
    items: [
      'PostgreSQL', 'PostGIS', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch',
      'Sequelize', 'Séries temporais',
    ],
  },
  {
    label: 'Cloud e infraestrutura',
    items: [
      'Docker', 'Kubernetes', 'AWS', 'Nginx', 'Jenkins', 'CI/CD',
      'MinIO / S3', 'SeaweedFS', 'Prometheus', 'Sentry', 'Linux',
    ],
  },
  {
    label: 'IA e dados',
    items: [
      'LLMs', 'Engenharia de prompts', 'RAG', 'Transformers', 'scikit-learn',
      'spaCy', 'NLTK', 'OpenAI API',
    ],
  },
  {
    label: 'Geoespacial e sensoriamento remoto',
    items: [
      'GeoDjango', 'GeoPandas', 'Shapely', 'Sentinel-2', 'Copernicus / SentinelHub',
      'NDVI · EVI · SAVI · GNDVI · NDRE · NDWI', 'Leaflet', 'Google Maps',
    ],
  },
  {
    label: 'Mobile',
    items: ['Android', 'Kotlin', 'Coroutines', 'Retrofit', 'OkHttp', 'Gson', 'osmdroid'],
  },
  {
    label: 'Engenharia e processo',
    items: ['Scrum', 'TDD', 'Jest', 'Modelagem UML', 'Git', 'Code review', 'Observabilidade'],
  },
]

/** Mesma stack da versão longa, agrupada em menos linhas. */
export const techGroupsShort: TechGroup[] = [
  {
    label: 'Linguagens',
    items: ['Python', 'TypeScript', 'JavaScript', 'Kotlin', 'Java', 'Go', 'PHP'],
  },
  {
    label: 'Backend e dados',
    items: [
      'Django', 'Django REST Framework', 'Node.js', 'Express', 'NestJS', 'Celery',
      'PostgreSQL', 'PostGIS', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'WebSockets',
    ],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Angular'],
  },
  {
    label: 'Cloud e infraestrutura',
    items: ['Docker', 'Kubernetes', 'AWS', 'Nginx', 'Jenkins', 'CI/CD', 'MinIO / S3', 'Prometheus'],
  },
  {
    label: 'IA e geoespacial',
    items: [
      'LLMs', 'RAG', 'scikit-learn', 'Transformers', 'spaCy',
      'GeoDjango', 'GeoPandas', 'Shapely', 'Sentinel-2',
    ],
  },
]

/* ------------------------------------------------------------------ *
 * Bullets por experiência
 *
 * `short` responde "por que entrevistar esta pessoa?" em poucos segundos.
 * `long` responde "que sistemas ela consegue projetar e evoluir?".
 * Uma experiência sem entrada em `short` não aparece na versão de 1 página.
 * ------------------------------------------------------------------ */

export interface CvBullets {
  short?: string[]
  long?: string[]
}

export const cvBullets: Record<string, CvBullets> = {
  'SOS Plantão::Engenheiro de Desenvolvimento de Software': {
    short: [
      'Desenvolvo aplicações web e APIs RESTful com práticas de segurança e padronização, integradas a pipelines de CI/CD, com refatoração contínua orientada à qualidade das entregas.',
    ],
    long: [
      'Desenvolvimento de aplicações web responsivas com foco em usabilidade e performance.',
      'Implementação e manutenção de APIs RESTful com práticas seguras e padronizadas.',
      'Refatoração de código e correção de defeitos orientadas à qualidade contínua das entregas.',
      'Versionamento contínuo e integração com pipelines de CI/CD, em processo ágil.',
    ],
  },

  'Sankofa Gestão e Educação (Conecta AEE)::Engenheiro de Software': {
    short: [
      'Defini a arquitetura multi-tenant de uma plataforma de educação inclusiva que atende vários municípios sob o mesmo produto, com APIs distribuídas e processamento assíncrono.',
      'Subi a aplicação em Kubernetes com autoscaling, CI/CD e deploy sem downtime. Nos dados sensíveis de aluno, implementei RBAC, MFA, trilha de auditoria e os fluxos de LGPD.',
      'Integrei LLMs à geração de conteúdo pedagógico, com saída estruturada, feature flag para ligar e desligar por município e revisão humana antes de publicar.',
    ],
    long: [
      'Desenho e evolução de arquitetura multi-tenant preparada para múltiplos municípios, com APIs REST distribuídas, processamento assíncrono e comunicação em tempo real.',
      'Modelagem de domínio para gestão de cidades, escolas, secretários, gestores e professores, com controle de acesso granular por perfil e fluxos de cadastro vinculando gestores a múltiplas escolas e municípios.',
      'Infraestrutura cloud-native em Docker e Kubernetes, com autoscaling, health checks, CI/CD e estratégias de zero-downtime deployment.',
      'Busca indexada, armazenamento de objetos e observabilidade montados como serviços de plataforma, compartilhados entre os módulos.',
      'Integração de LLMs à geração e ao enriquecimento de conteúdo pedagógico, à sumarização e ao apoio à decisão. A camada usa engenharia de prompts, saída estruturada, feature flags e revisão humana antes da publicação.',
      'Estudos de arquiteturas RAG com embeddings, recuperação semântica e grounding sobre a base de conhecimento educacional da plataforma.',
      'Segurança e conformidade com a LGPD: autenticação e autorização, RBAC granular, MFA e trilhas de auditoria; além de concorrência e integridade de dados, escalabilidade horizontal e tolerância a falhas.',
      'Automatização de pipelines de cadastro e atualização evitando duplicidade e garantindo integridade referencial; paginação, filtragem e ordenação flexíveis nos endpoints; profiling de queries para manter baixo tempo de resposta.',
    ],
  },

  'GeoSpectra::Engenheiro de Software': {
    short: [
      'Construí os pipelines assíncronos de uma plataforma de monitoramento agrícola: consomem imagens do Sentinel-2, calculam índices de vegetação (NDVI, EVI, SAVI, NDRE, NDWI) e mantêm séries temporais por propriedade.',
      'Apliquei machine learning sobre essas séries para detectar anomalia e antecipar estresse vegetal, reunindo Copernicus, INMET, SoilGrids e TerraBrasilis na mesma base.',
    ],
    long: [
      'Arquitetura orientada a processamento assíncrono que consome imagens do Sentinel-2, processa dados geoespaciais e calcula índices de vegetação (NDVI, EVI, SAVI, GNDVI, NDRE e NDWI).',
      'Séries temporais usadas no acompanhamento da evolução das propriedades rurais e na identificação de anomalias, estresse hídrico, deficiências nutricionais e possíveis patologias agrícolas.',
      'Pipelines computacionalmente intensivos executados de forma assíncrona com Celery e Redis, atualizações em tempo real via Django Channels e WebSockets, e armazenamento de imagens, bandas espectrais e artefatos geoespaciais em MinIO/S3.',
      'Modelagem de dados espaciais com GeoDjango, PostGIS, GeoPandas e Shapely, incluindo versionamento de geometrias e validação topológica.',
      'Machine learning sobre os índices e as séries temporais para detectar anomalias, classificar áreas agrícolas, antecipar estresse vegetal e estimar risco.',
      'Evolução de mecanismos determinísticos por limiar fixo para abordagens híbridas que combinam regras de domínio, modelos estatísticos e algoritmos de ML sobre índices espectrais, histórico temporal, dados meteorológicos e características do solo.',
      'Frentes de computer vision e deep learning em imagens multiespectrais, cobrindo segmentação, classificação de regiões e detecção de mudanças, com feature engineering espectral, clustering e detecção de outliers.',
      'LLMs interpretam resultados já calculados pela plataforma e escrevem resumos técnicos e explicações de anomalia. O número continua vindo do dado geoespacial e dos algoritmos analíticos.',
      'Integração de fontes externas e científicas (Copernicus Data Space / SentinelHub, INMET, SoilGrids, TerraBrasilis, CAR/SICAR) e rastreabilidade com relatórios técnicos automatizados e registro de evidências em blockchain Polygon PoS.',
      'Interfaces cartográficas em Next.js 15, React 19 e TypeScript sobre Leaflet, com visualização de séries temporais e manipulação de propriedades e talhões em mapas interativos.',
    ],
  },

  'Positivo Tecnologia::Engenheiro de Software': {
    short: [
      'Arquitetei sistemas orientados a eventos com comunicação em tempo real, reconexão automática e baixa latência, integrados a mensageria e bancos relacionais.',
      'Desenvolvi pipelines de inferência em tempo real com modelos de linguagem natural, e instrumentei monitoramento para identificar e mitigar gargalos de performance.',
    ],
    long: [
      'Arquitetura de sistemas orientados a eventos com comunicação em tempo real e alta performance.',
      'Implementação de comunicação assíncrona resiliente com reconexão automática e baixa latência.',
      'Integração com sistemas de mensageria e bancos relacionais para escalar aplicações críticas.',
      'Aplicação de modelos de IA para análise de linguagem natural, automação de interações e decisões baseadas em dados, com pipelines otimizados para inferência em tempo real.',
      'Automação de CI/CD com foco em confiabilidade e tempo de entrega, e gestão de ambientes de staging e produção.',
      'Monitoramento em tempo real com Prometheus e Silk, identificando e mitigando gargalos de performance.',
      'Suporte a múltiplos canais de interação e funcionalidades multimodais.',
    ],
  },

  'UFRB::FullStack Developer — Node.js': {
    long: [
      'Desenvolvimento das regras de negócio do sistema de eventos da Pró-Reitoria de Pesquisa, Pós-Graduação, Criação e Inovação da UFRB, em produção.',
      'Backend em Node.js com MongoDB, sistema de filas e integração ao barramento de software institucional',
    ],
  },

  'SENAC BA::Instrutor do curso Programador de Sistemas': {
    long: [
      'Formação de novos programadores em algoritmos, lógica e linguagens de programação, com ênfase em Python.',
      'Orientação em princípios de orientação a objetos, modelagem UML e bancos de dados.',
      'Ensino de testes e manutenção de software, TDD e metodologias ágeis.',
    ],
  },

  'Prefeitura Municipal de Castro Alves — BA::Desenvolvedor Full Stack': {
    long: [
      'Desenvolvimento da Vitrine Virtual, plataforma municipal de valorização do comércio local, empreendedorismo e divulgação de serviços e pontos de interesse da cidade.',
      'Aplicativo Android em Kotlin consumindo APIs REST via Retrofit, com catálogo de estabelecimentos e anúncios, eventos, guias turísticos e roteiros.',
      'Recursos de geolocalização e mapas com Google Maps e OpenStreetMap/osmdroid para situar negócios e pontos de interesse no território.',
      'Interfaces voltadas ao acesso simples da população aos negócios e serviços locais.',
    ],
  },

  'Agência de Marketing Rainbow::Desenvolvedor Web': {
    long: [
      'Criação e manutenção de sites institucionais, landing pages e páginas promocionais para clientes da agência, como freelancer.',
      'Implementação de layouts em HTML, CSS e JavaScript e customização de soluções em WordPress/PHP.',
      'Integração de formulários e serviços externos, com ajustes de responsividade, SEO técnico, desempenho e compatibilidade entre navegadores.',
    ],
  },

  'Cidades Inteligentes — Smart Vagas::Backend Developer': {
    short: [
      'Projetei o backend do Smart Vagas, sistema de estacionamento público para municípios de pequeno e médio porte. API REST em Node.js e Express cobrindo veículos, vagas, créditos e transações, com MySQL, Sequelize e filas.',
      'Reconhecido com três prêmios Inventor UFRB; módulos Prefeitura, Motorista e Fiscal registrados como software com a UFRB como titular.',
    ],
    long: [
      'Arquitetura e desenvolvimento do backend do Smart Vagas, plataforma de mobilidade urbana concebida a partir de um modelo de Smart Cities para municípios de pequeno e médio porte.',
      'API REST em Node.js e Express cobrindo autenticação e autorização, usuários, veículos, estacionamentos, vagas, operações de estacionamento, créditos, transações, notificações e históricos.',
      'Autorização separada por perfil de motorista, fiscal de trânsito e administração municipal, com autenticação JWT e hashing de credenciais.',
      'Persistência relacional em MySQL com Sequelize, validação de dados, upload de arquivos e processamento assíncrono através de filas, com monitoramento de erros em Sentry.',
      'Integração entre backend e os aplicativos móveis em Kotlin, usando Google Maps e geolocalização para contextualizar estacionamentos e vagas no espaço urbano, com comunicação HTTP assíncrona via Coroutines, OkHttp e Gson.',
      'Dashboard web para gestão municipal, posteriormente estruturado com Next.js, React e TypeScript.',
      'O sistema substituiu o controle manual de vagas, a conferência em papel do fiscal e o pagamento presencial de crédito.',
    ],
  },
}

export function bulletsFor(entry: TimelineEntry, variant: 'short' | 'long'): string[] {
  return cvBullets[entryKey(entry)]?.[variant] ?? []
}

/** Experiências que entram na versão de 1 página. */
export const shortExperience = timeline.filter(
  (e) => e.kind === 'work' && (cvBullets[entryKey(e)]?.short?.length ?? 0) > 0,
)

/** As demais, condensadas numa única linha no fim da versão curta. */
export const shortExperienceRest = timeline.filter(
  (e) => e.kind === 'work' && !(cvBullets[entryKey(e)]?.short?.length ?? 0),
)

/* ------------------------------------------------------------------ *
 * Cases de engenharia (apenas na versão longa)
 * ------------------------------------------------------------------ */

export interface CvCase {
  name: string
  discipline: string
  body: string
  stack: string[]
  note?: string
}

export const engineeringCases: CvCase[] = [
  {
    name: 'Conecta AEE',
    discipline: 'SaaS Enterprise · Sistemas Distribuídos · Engenharia de IA',
    body:
      'Plataforma de gestão do Atendimento Educacional Especializado que atende vários municípios ' +
      'sob o mesmo produto. Cada município tem seus dados isolados, mas compartilha o mesmo modelo ' +
      'de domínio. As tarefas caras saem do caminho de requisição por fila. Busca, armazenamento de ' +
      'objetos e observabilidade ficam na camada de plataforma, não dentro de cada módulo. Os LLMs ' +
      'atuam sobre dado já estruturado e o que geram passa por revisão humana antes de publicar.',
    stack: [
      'Python', 'Django', 'Django REST Framework', 'Next.js', 'TypeScript', 'PostgreSQL',
      'Redis', 'Celery', 'Elasticsearch', 'SeaweedFS / S3', 'Docker', 'Kubernetes',
    ],
  },
  {
    name: 'GeoSpectra',
    discipline: 'Engenharia Geoespacial · Sensoriamento Remoto · Sistemas Orientados a Dados',
    body:
      'Monitoramento agrícola a partir de imagem de satélite. As imagens do Sentinel-2 entram em ' +
      'pipelines assíncronos que calculam índices espectrais por talhão e guardam a série temporal. ' +
      'É essa série que permite apontar anomalia, estresse hídrico e deficiência nutricional. O ' +
      'sistema junta satélite, clima, solo e registro ambiental de fontes científicas diferentes. A ' +
      'análise começou em limiar fixo e está migrando para modelos que combinam regra de domínio, ' +
      'estatística e machine learning.',
    stack: [
      'Python', 'Django', 'GeoDjango', 'PostGIS', 'GeoPandas', 'Shapely', 'Celery',
      'Redis', 'Django Channels', 'MinIO / S3', 'Sentinel-2', 'Next.js', 'Leaflet',
    ],
  },
  {
    name: 'Smart Vagas',
    discipline: 'Smart Cities · Mobilidade Urbana · Aplicação Distribuída',
    body:
      'Gestão de estacionamento público para municípios de pequeno e médio porte, em quatro ' +
      'módulos: API central, painel da prefeitura, aplicativo do motorista e aplicativo do fiscal. ' +
      'O backend concentra veículos, vagas, operações de estacionamento, créditos e transações, com ' +
      'autorização distinta por perfil. A geolocalização situa a vaga no mapa da cidade, o que é o ' +
      'que torna o aplicativo do fiscal utilizável em rua. Substituiu o controle em papel.',
    stack: [
      'Node.js', 'Express', 'MySQL', 'Sequelize', 'JWT', 'Bee-Queue', 'Sentry',
      'Kotlin', 'Android', 'Google Maps', 'Next.js', 'React', 'TypeScript',
    ],
    note:
      'Três prêmios Inventor UFRB. Os módulos Prefeitura, Motorista e Fiscal estão registrados como ' +
      'software com a Universidade Federal do Recôncavo da Bahia como titular.',
  },
]
