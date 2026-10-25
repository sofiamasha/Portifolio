export const portfolio = {
  name: 'Sofia de Abreu',
  role: 'Engenharia de Software · Produto digital',
  course: 'Engenharia de Software — PUC Minas',
  courseDates: 'ago/2026 — dez/2028 · em andamento',
  email: 'sofiaabreubotelho@gmail.com',
  socials: {
    github: 'https://github.com/sofiamasha',
    linkedin: 'https://www.linkedin.com/in/sofiadeabreu/',
    instagram: 'https://www.instagram.com/sofia_vlaz_/',
  },
  bio: 'Estudante de Engenharia de Software na PUC Minas, focada em construir a ponte entre um backend robusto e a experiência de quem realmente vai usar o produto. Código não é o objetivo final: é a ferramenta para resolver problemas reais. Tenho base técnica em desenvolvimento web (Java com Spring Boot, Python, Node.js e SQL), mas também penso como Product Owner e Scrum Master: me preocupo com a jornada do usuário, o design da interface (Figma) e a organização tática do time (Trello e metodologias ágeis) antes mesmo de modelar a primeira tabela no banco de dados. Gosto de construir soluções completas e escaláveis em equipe — já estruturei arquiteturas backend, desenvolvi APIs REST e implementei operações CRUD completas em aplicações end-to-end como SafeHer e PetMatch. Busco desafios que me tirem da zona de conforto, como hackathons sob pressão, e compartilho conhecimento como instrutora no Projeto Beira Linha.',
} as const

export const skills = [
  { name: 'Java · Spring Boot', context: 'Base de desenvolvimento backend e arquitetura de aplicações.' },
  { name: 'Python', context: 'Análise de dados com Pandas e projetos acadêmicos.' },
  { name: 'Node.js', context: 'Desenvolvimento web e integração entre serviços.' },
  { name: 'SQL · Modelagem', context: 'Modelagem relacional aplicada à plataforma TSRCT Travels.' },
  { name: 'APIs REST', context: 'APIs e operações CRUD em projetos end-to-end como SafeHer.' },
  { name: 'JavaScript', context: 'Aplicações web, interações e projetos de produto digital.' },
  { name: 'HTML5', context: 'Estrutura semântica de interfaces web.' },
  { name: 'CSS3', context: 'Estilização e construção de interfaces responsivas.' },
  { name: 'Figma', context: 'Prototipação e design de experiência e interface.' },
  { name: 'Trello', context: 'Organização tática e acompanhamento de atividades em equipe.' },
  { name: 'Git · GitHub', context: 'Versionamento e colaboração em projetos de software.' },
  { name: 'Scrum', context: 'Organização de trabalho com metodologias ágeis.' },
  { name: 'Kanban', context: 'Gestão visual de fluxo de trabalho.' },
  { name: 'UX/UI Design', context: 'Jornada do usuário, experiência e design de interfaces.' },
]

export const experience = [
  {
    role: 'Assistente de Mídia e Conteúdo (Voluntário)',
    company: 'Engenharia de Software · PUC Minas',
    type: 'Meio período', date: 'out/2026 — atual', location: 'Híbrido',
    description: 'Estratégia de campanhas de mídia, produção multimídia institucional e alinhamento com a liderança.',
    icon: '◈',
  },
  {
    role: 'Desenvolvedora Front-End & Instrutora de Inglês',
    company: 'Projeto Beira Linha',
    type: 'Meio período', date: 'ago/2026 — atual', location: 'Remoto',
    description: 'Desenvolvimento e manutenção do portal, análise de requisitos e UX. Condução autônoma de oficinas de Inglês Intermediário. Repositório: Beira-Linha/Site-BL.',
    link: 'https://github.com/Beira-Linha/Site-BL', icon: '⌘',
  },
  {
    role: 'Produtora de Conteúdo Tech & Mídia Institucional',
    company: 'Ciência da Computação · PUC Minas',
    type: 'Meio período', date: 'abr/2026 — atual', location: 'Belo Horizonte · híbrido',
    description: 'Gestão de conteúdo e engajamento acadêmico, representação institucional no PUC Aberta e cobertura de mídia dos eventos do ICEI.',
    icon: '✳',
  },
  {
    role: 'Analista de Processos e Suporte de TI',
    company: 'Ferro Velho Piranga',
    type: 'Estágio', date: 'jan/2024 — jun/2026', location: 'Presencial',
    description: 'Automação de fluxos operacionais, suporte técnico de níveis 1 e 2 e estruturação da presença digital.',
    icon: '⌁',
  },
  {
    role: 'Vendedora', company: 'Papelaria Mixpel',
    type: 'Freelance · duas temporadas', date: 'jan–fev/2025 e jan–fev/2026', location: 'Contagem · MG',
    description: 'Atuação em duas temporadas consecutivas, com recontratação por mérito.',
    icon: '✳',
  },
]

export const education = [
  {
    school: 'PUC Minas', course: 'Engenharia de Software', date: 'ago/2026 — dez/2028', status: 'Em andamento',
    detail: 'Ciclo completo de desenvolvimento de produtos digitais, arquitetura de software e UX.',
  },
  {
    school: 'PUC Minas', course: 'Base em Ciência da Computação', date: 'fev/2025 — ago/2026', status: '',
    detail: 'Algoritmos, estruturas de dados, backend, frontend e bancos de dados relacionais.',
  },
  {
    school: 'Colégio Santo Agostinho', course: 'Ensino Médio', date: 'fev/2019 — dez/2024', status: '',
    detail: 'Atleta de vôlei e handebol por mais de dois anos. Participação em SIAC, Mini ONU, TRIE, Dom Helder e olimpíadas de matemática (Canguru e OBMEP).',
  },
]

export const projects = [
  { title: 'Bloom Finance', category: 'Produto digital', period: 'jun–ago/2026', description: 'Gestão financeira pessoal com IA e análise comportamental de gastos.', tags: ['LLMs', 'UX/UI', 'JavaScript', 'Python'], number: '01', accent: 'pink' },
  { title: 'Nexora', category: 'Produto digital', period: 'ago/2026', description: 'Gestão acadêmica e produtividade com cronograma de estudos e dashboard de bem-estar.', tags: ['Product Design', 'UI/UX', 'JavaScript', 'Arquitetura'], number: '02', accent: 'violet' },
  { title: 'SafeHer', category: 'Aplicação end-to-end', period: null, description: 'Aplicação completa, com APIs REST e operações CRUD.', tags: ['APIs REST', 'CRUD', 'Backend'], number: '03', accent: 'blue' },
  { title: 'TSRCT Travels', category: 'Plataforma web', period: 'out–nov/2025', description: 'Plataforma de viagens com modelagem relacional organizada em sete entidades.', tags: ['SQL', 'Modelagem relacional'], number: '04', accent: 'blue' },
  { title: 'Dashboard de Análise Salarial', category: 'Dados', period: 'ago/2025', description: 'Análise e visualização de dados salariais com Python e Pandas.', tags: ['Python', 'Pandas', 'Visualização de dados'], number: '05', accent: 'violet' },
  { title: 'PetMatch', category: 'Aplicação web', period: 'fev–jun/2025', description: 'Projeto em equipe voltado à adoção de animais, com desenvolvimento front-end.', tags: ['HTML', 'CSS', 'JavaScript', 'Equipe'], number: '06', accent: 'pink' },
  { title: 'TaskMaster Java', category: 'Aplicação Java', period: 'abr/2025', description: 'Gerenciador de tarefas com multithreading e filas de prioridade.', tags: ['Java', 'Multithreading'], number: '07', accent: 'pink' },
  { title: 'InfiniteGallery.js', category: 'Aplicação web', period: 'mar/2025', description: 'Galeria com rolagem infinita e integração de API externa.', tags: ['JavaScript', 'API'], number: '08', accent: 'blue' },
  { title: 'TextAnalyzer++', category: 'Programação', period: 'jan/2025', description: 'Análise de texto ASCII em C.', tags: ['C', 'Análise de texto'], number: '09', accent: 'violet' },
  { title: 'Monitoria & Cobertura de Mídia', category: 'Comunidade', period: 'mai/2026 · abr–mai/2025', description: 'Monitoria e cobertura de mídia no PUC Aberta; instrução voluntária de programação com Scratch para alunos do 5º ano.', tags: ['PUC Aberta', 'Scratch', 'Educação'], number: '10', accent: 'blue' },
]

export const languages = [
  { name: 'Português', level: 'Nativo', value: 100, index: '01' },
  { name: 'Espanhol', level: 'Fluente', value: 86, index: '02' },
  { name: 'Inglês', level: 'Avançado', value: 74, index: '03' },
  { name: 'Mandarim', level: 'Básico', value: 28, index: '04' },
]

export const hobbies = [
  { title: 'Vôlei & handebol', detail: 'Esportes que me acompanham desde o ensino médio.', skill: 'Trabalho em equipe & resiliência', icon: '◉', number: '01' },
  { title: 'Voluntariado com idosos', detail: 'Tempo dedicado à escuta, cuidado e presença.', skill: 'Empatia & propósito', icon: '♡', number: '02' },
  { title: 'Meu cachorro', detail: 'Boas pausas e companhia fora das telas.', skill: 'Cuidado & presença', icon: '✳', number: '03' },
  { title: 'Criação de conteúdo', detail: 'Interesse por influência digital e comunicação.', skill: 'Comunicação & storytelling', icon: '↗', number: '04' },
]
