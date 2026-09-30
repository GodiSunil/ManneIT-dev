export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  /** brand color accent for this service visual */
  color: 'cyan' | 'violet' | 'gold';
  /** visual motif key rendered by the ServiceVisual component */
  visual:
    | 'growth'
    | 'composition'
    | 'layers'
    | 'architecture'
    | 'mobile'
    | 'nodes'
    | 'neural'
    | 'shield'
    | 'timeline';
}

export const services: ServiceItem[] = [
  {
    id: 'digital-marketing',
    index: '01',
    title: 'Digital Marketing',
    tagline: 'Reach, resonate, convert.',
    description:
      'Data-driven campaigns across search, social and paid channels — engineered to put your brand in front of the right audience and turn attention into measurable growth.',
    capabilities: ['SEO & SEM', 'Paid Social', 'Content Strategy', 'Performance Analytics'],
    color: 'cyan',
    visual: 'growth',
  },
  {
    id: 'graphic-design',
    index: '02',
    title: 'Graphic Design',
    tagline: 'Visual identity with intent.',
    description:
      'Brand systems, editorial layouts and marketing collateral designed with a sharp editorial eye — every asset crafted to communicate clearly and look unmistakably premium.',
    capabilities: ['Brand Identity', 'Editorial Layout', 'Visual Systems', 'Art Direction'],
    color: 'violet',
    visual: 'composition',
  },
  {
    id: 'ui-ux-design',
    index: '03',
    title: 'UI/UX Design',
    tagline: 'Interfaces that feel inevitable.',
    description:
      'Research-led product design — mapping user journeys, prototyping interactions and refining every screen until the experience feels effortless and considered.',
    capabilities: ['User Research', 'Interaction Design', 'Prototyping', 'Design Systems'],
    color: 'cyan',
    visual: 'layers',
  },
  {
    id: 'web-development',
    index: '04',
    title: 'Web Development',
    tagline: 'Fast, modern, built to scale.',
    description:
      'Production-grade web platforms engineered with modern frameworks — performant, accessible and architected to grow with your product and your audience.',
    capabilities: ['React & Next.js', 'Headless CMS', 'Performance Engineering', 'API Integration'],
    color: 'cyan',
    visual: 'architecture',
  },
  {
    id: 'mobile-development',
    index: '05',
    title: 'Mobile Development',
    tagline: 'Native-grade mobile experiences.',
    description:
      'Cross-platform mobile apps built with React Native and native tooling — smooth, responsive and crafted to feel native on every device from day one.',
    capabilities: ['React Native', 'iOS & Android', 'Offline-First', 'App Store Delivery'],
    color: 'violet',
    visual: 'mobile',
  },
  {
    id: 'mcp-development',
    index: '06',
    title: 'MCP Development',
    tagline: 'Model context infrastructure.',
    description:
      'Custom Model Context Protocol servers and integrations — connecting your data, tools and language models with secure, structured, production-ready pipelines.',
    capabilities: ['MCP Servers', 'Tool Integrations', 'Context Pipelines', 'AI Infrastructure'],
    color: 'gold',
    visual: 'nodes',
  },
  {
    id: 'ai-ml-development',
    index: '07',
    title: 'AI & ML Development',
    tagline: 'Intelligence, applied.',
    description:
      'From model integration to custom ML pipelines — we build practical AI features that automate work, surface insight and create genuinely new product capabilities.',
    capabilities: ['LLM Integration', 'RAG Pipelines', 'Custom Models', 'MLOps'],
    color: 'violet',
    visual: 'neural',
  },
  {
    id: 'cybersecurity',
    index: '08',
    title: 'Cybersecurity',
    tagline: 'Secure by engineering.',
    description:
      'Proactive security assessments, hardening and monitoring — protecting your applications, data and infrastructure without slowing your team down.',
    capabilities: ['Security Audits', 'Penetration Testing', 'Hardening', 'Compliance'],
    color: 'cyan',
    visual: 'shield',
  },
  {
    id: 'video-editing',
    index: '09',
    title: 'Video Editing',
    tagline: 'Motion that moves people.',
    description:
      'Cinematic editing, motion graphics and post-production — turning raw footage into polished narrative content built for campaigns, social and product launches.',
    capabilities: ['Cinematic Editing', 'Motion Graphics', 'Color Grading', 'Post-Production'],
    color: 'gold',
    visual: 'timeline',
  },
];

export const serviceColorHex: Record<ServiceItem['color'], string> = {
  cyan: '#18D9FF',
  violet: '#8B5CF6',
  gold: '#FFB000',
};
