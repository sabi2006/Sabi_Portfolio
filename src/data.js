// All portfolio content lives here so it can be updated without touching components.

export const profile = {
  name: 'Sabi Ahamed J',
  role: 'Full-stack developer',
  location: 'Dindigul, Tamil Nadu',
  email: 'sabiahamed7@gmail.com',
  phone: '+91 9500959183',
  linkedin: 'https://linkedin.com/in/sabi-ahamed-j',
  github: 'https://github.com/sabi2006',
  resume: '/resume.pdf',
  availability: 'Open to internships & graduate roles, 2027',
}

export const facts = [
  { label: 'Based in', value: 'Dindigul, India' },
  { label: 'Studying', value: 'B.Tech IT, PSNA CET' },
  { label: 'Graduating', value: '2027' },
  { label: 'Focus', value: 'Full-stack, 3D web, applied AI' },
]

export const about = [
  "I'm a final-year Information Technology student who likes building software people can actually use. Most of my work sits where the web meets something harder: real-time 3D in the browser, retrieval pipelines over large datasets, or hardware reporting to a live dashboard.",
  'I recently completed an AI/ML internship at Phoenix Softech, taking a machine-learning project from data preprocessing through training, optimisation and testing. I care about clear interfaces, measurable results and code the next person can read.',
]

export const stats = [
  { value: '3', label: 'Production-style projects' },
  { value: '2', label: 'Hackathon podiums' },
  { value: '5', label: 'Certifications' },
  { value: '400+', label: 'Teams competed against' },
]

export const projects = [
  {
    id: 'construct',
    title: 'Construction 3D Visualizer & Brick Calculator',
    short: 'Estimation platform with a live 3D wall',
    category: 'Full-stack · 3D',
    year: 2026,
    visual: 'bricks',
    figure: 'Wall estimate with live material counts',
    description:
      'A construction estimation platform that turns wall dimensions into brick, mortar, material and cost figures in real time, then renders the wall in 3D so the estimate can be checked visually.',
    highlights: [
      'Real-time brick, mortar, material and cost calculations',
      'Unit conversion and wastage estimation built into every result',
      'Interactive 3D wall rendered with Three.js InstancedMesh for smooth performance',
    ],
    metrics: [
      { value: 'Live', label: 'Cost and material estimates' },
      { value: '1 draw call', label: 'Per wall via instancing' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'Three.js', 'React Three Fiber'],
    link: 'https://github.com/sabi2006',
  },
  {
    id: 'medical',
    title: 'Medical AI Assistant using RAG',
    short: 'Retrieval-augmented chatbot over 1.3 GB of data',
    category: 'Applied AI',
    year: 2026,
    visual: 'neural',
    figure: 'Query → retrieve → augment → generate',
    description:
      'An AI medical assistant built on retrieval-augmented generation. A 1.3 GB medical dataset was processed and indexed for semantic search, so answers are grounded in retrieved sources rather than the model alone.',
    highlights: [
      'Processed and indexed a 1.3 GB medical corpus for semantic search',
      'Optimised vector search for faster, more accurate retrieval',
      'Pipeline designed to handle 200+ concurrent queries',
    ],
    metrics: [
      { value: '+40%', label: 'Response accuracy' },
      { value: '−35%', label: 'Query response time' },
      { value: '200+', label: 'Concurrent queries' },
    ],
    stack: ['Python', 'RAG', 'Vector search', 'Semantic search', 'LLMs'],
    link: 'https://github.com/sabi2006',
  },
  {
    id: 'trolley',
    title: 'Smart Trolley',
    short: 'IoT shopping cart with automated checkout',
    category: 'IoT · Full-stack',
    year: 2025,
    visual: 'cart',
    figure: 'Scan → bill → pay, straight from the cart',
    description:
      'A smart shopping trolley that scans products as they go in, bills automatically and keeps inventory in sync, backed by REST APIs and live dashboards for the store.',
    highlights: [
      'Real-time barcode scanning with IoT sensor integration',
      'Automated billing and inventory management',
      'REST APIs and dashboards for live inventory tracking',
    ],
    metrics: [
      { value: '−40%', label: 'Checkout time' },
      { value: 'Live', label: 'Inventory sync' },
    ],
    stack: ['React', 'Flask', 'MongoDB', 'PostgreSQL', 'IoT'],
    link: 'https://github.com/sabi2006',
  },
]

export const experience = [
  {
    period: 'Jun 2026',
    role: 'AI/ML Intern',
    org: 'Phoenix Softech',
    points: [
      'Built applied AI projects in Python from problem definition to delivery.',
      'Designed and implemented machine-learning models for real-world problems.',
      'Owned data preprocessing, model training and performance optimisation.',
      'Delivered an end-to-end AI project covering design, implementation and testing.',
    ],
  },
  {
    period: '2023 – 2027',
    role: 'B.Tech, Information Technology',
    org: 'PSNA College of Engineering and Technology',
    points: [
      'CGPA 7.6. Coursework in data structures & algorithms, OOP, DBMS and operating systems.',
      'Two podium finishes at national hackathons hosted by VIT Chennai and VIT Vellore.',
    ],
  },
]

export const skillGroups = [
  { title: 'Languages', items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'HTML & CSS'] },
  { title: 'Frameworks', items: ['React', 'Next.js', 'Flask', 'Prisma'] },
  { title: '3D & graphics', items: ['Three.js', 'React Three Fiber', 'InstancedMesh'] },
  { title: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  {
    title: 'Applied AI',
    items: ['RAG pipelines', 'Vector & semantic search', 'Prompt design', 'Structured outputs', 'Machine learning'],
  },
  { title: 'Foundations & tools', items: ['DSA', 'OOP', 'DBMS', 'Operating systems', 'Git & GitHub', 'Linux'] },
]

export const awards = [
  { place: '3rd', title: 'Hack-a-Cure', host: 'VIT Chennai', year: 2025, detail: 'Second runner-up of 300+ teams' },
  { place: '3rd', title: 'Hackovation 2.0', host: 'VIT Vellore', year: 2025, detail: 'Second runner-up of 100+ teams' },
]

export const certifications = [
  { title: 'AIML Engineer Certification', issuer: 'Phoenix Softech', year: 2026 },
  { title: 'Linux Fundamentals (RH104)', issuer: 'Red Hat', year: 2026 },
  { title: 'HackSpora 2k25, 24-hour national hackathon', issuer: 'Karpagam Academy of Higher Education', year: 2025 },
  { title: 'JavaScript Certification', issuer: 'HackerRank', year: 2025 },
  { title: 'MongoDB CRUD Developer', issuer: 'MongoDB', year: 2024 },
]
