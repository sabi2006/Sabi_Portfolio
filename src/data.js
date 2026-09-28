// All portfolio content lives here so it can be updated without touching components.

export const profile = {
  name: 'Sabi Ahamed J',
  roles: ['Full Stack Developer', 'AI / ML Engineer', '3D Web Builder', 'Problem Solver'],
  location: 'Dindigul, Tamil Nadu',
  email: 'sabiahamed7@gmail.com',
  phone: '+91 9500959183',
  linkedin: 'https://linkedin.com/in/sabi-ahamed-j',
  github: 'https://github.com/sabi2006',
  resume: '/resume.pdf',
  tagline:
    'I build fast, interactive web apps, from real-time 3D visualizers in Three.js to RAG-powered AI assistants.',
  summary:
    'Motivated full stack developer with hands-on experience building practical, user-friendly web applications through academic and personal projects. I enjoy applying problem solving to real-world challenges and turning ideas into efficient, working software.',
  summary2:
    "I'm pursuing a B.Tech in Information Technology at PSNA College of Engineering and Technology, and I'm continuously exploring AI and machine learning to build smarter, more useful products.",
}

export const stats = [
  { value: 3, suffix: '+', label: 'Full stack & AI projects shipped' },
  { value: 2, suffix: '', label: 'Hackathon podium finishes' },
  { value: 5, suffix: '', label: 'Industry certifications' },
  { value: 400, suffix: '+', label: 'Teams competed against' },
]

export const skillGroups = [
  { title: 'Languages', color: '#22d3ee', items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  { title: 'Frameworks & 3D', color: '#8b5cf6', items: ['React', 'Next.js', 'Three.js', 'React Three Fiber', 'Flask', 'Prisma'] },
  { title: 'Databases', color: '#10b981', items: ['MySQL', 'MongoDB', 'PostgreSQL'] },
  {
    title: 'AI & ML',
    color: '#f472b6',
    items: ['RAG', 'Vector Search', 'Semantic Search', 'Prompt Engineering', 'Structured Outputs', 'Machine Learning'],
  },
  { title: 'Core CS', color: '#f59e0b', items: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems'] },
  { title: 'Tools', color: '#60a5fa', items: ['Git', 'GitHub', 'VS Code', 'Linux'] },
]

export const experience = [
  {
    type: 'work',
    role: 'AIML Intern',
    org: 'Phoenix Softech',
    period: 'Jun 2026',
    points: [
      'Worked on applied artificial intelligence in Python through hands-on project development.',
      'Designed and implemented machine learning models for real-world problem solving.',
      'Focused on data preprocessing, model training and performance optimization.',
      'Delivered an end-to-end AI project covering solution design, implementation and testing.',
    ],
    tags: ['Python', 'Machine Learning', 'Data Preprocessing', 'Model Training'],
  },
  {
    type: 'education',
    role: 'B.Tech, Information Technology',
    org: 'PSNA College of Engineering and Technology',
    period: '2023 – 2027',
    meta: 'Dindigul, Tamil Nadu · CGPA 7.6',
    points: [
      'Core coursework in Data Structures & Algorithms, OOP, DBMS and Operating Systems.',
      'Podium finishes at national hackathons hosted by VIT Chennai and VIT Vellore.',
    ],
    tags: ['DSA', 'OOP', 'DBMS', 'OS'],
  },
]

export const projects = [
  {
    id: 'construct',
    title: 'Construction 3D Visualizer & Brick Calculator',
    category: 'Full Stack · 3D',
    year: 2026,
    visual: 'bricks',
    accent: '#f59e0b',
    accent2: '#ef4444',
    description:
      'A construction estimation platform with real-time brick, mortar, material and cost calculations, including unit conversion and wastage estimation, paired with an interactive 3D wall visualizer.',
    metrics: [
      { value: 'Real-time', label: 'cost & material estimates' },
      { value: 'Instanced', label: '3D wall rendering' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'Three.js', 'React Three Fiber'],
    link: 'https://github.com/sabi2006',
  },
  {
    id: 'medical',
    title: 'Medical AI Assistant using RAG',
    category: 'AI · Retrieval Augmented Generation',
    year: 2026,
    visual: 'neural',
    accent: '#22d3ee',
    accent2: '#8b5cf6',
    description:
      'An AI-powered medical chatbot built on a RAG architecture. A 1.3 GB medical dataset was processed and indexed for semantic search, with an optimized vector search pipeline.',
    metrics: [
      { value: '+40%', label: 'response accuracy' },
      { value: '−35%', label: 'query response time' },
      { value: '200+', label: 'concurrent queries' },
    ],
    stack: ['Python', 'RAG', 'Vector Search', 'Semantic Search', 'LLMs'],
    link: 'https://github.com/sabi2006',
  },
  {
    id: 'trolley',
    title: 'Smart Trolley',
    category: 'IoT · Full Stack',
    year: 2025,
    visual: 'cart',
    accent: '#10b981',
    accent2: '#22d3ee',
    description:
      'A smart shopping trolley with real-time IoT sensor integration, barcode scanning, automated billing and inventory management, backed by REST APIs and live dashboards.',
    metrics: [
      { value: '−40%', label: 'checkout time' },
      { value: 'Live', label: 'inventory tracking' },
    ],
    stack: ['React', 'Flask', 'MongoDB', 'PostgreSQL', 'IoT'],
    link: 'https://github.com/sabi2006',
  },
]

export const awards = [
  {
    place: '3rd',
    title: 'Hack-a-Cure',
    host: 'VIT Chennai',
    year: 2025,
    detail: 'Second runner-up among 300+ participating teams.',
  },
  {
    place: '3rd',
    title: 'Hackovation 2.0',
    host: 'VIT Vellore',
    year: 2025,
    detail: 'Second runner-up among 100+ participating teams.',
  },
]

export const certifications = [
  { title: 'AIML Engineer Certification', issuer: 'Phoenix Softech', year: 2026 },
  { title: 'Linux Fundamentals (RH104-RHA)', issuer: 'Red Hat', year: 2026 },
  { title: 'HackSpora 2k25 · 24h National Hackathon', issuer: 'Karpagam Academy of Higher Education', year: 2025 },
  { title: 'JavaScript Certification', issuer: 'HackerRank', year: 2025 },
  { title: 'MongoDB CRUD Developer Certification', issuer: 'MongoDB', year: 2024 },
]
