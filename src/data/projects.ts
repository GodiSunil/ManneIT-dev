export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  accent: 'cyan' | 'violet' | 'gold';
}

export const projects: Project[] = [
  {
    id: 'aurora',
    number: '01',
    title: 'Aurora Commerce',
    category: 'Web Development / UI-UX',
    description:
      'A headless commerce platform rebuilt for speed — a premium storefront with sub-second navigation, editorial product storytelling and a fully custom design system.',
    image:
      'https://images.pexels.com/photos/7191162/pexels-photo-7191162.jpeg?auto=compress&cs=tinysrgb&w=1600',
    tags: ['Headless', 'Design System', 'Performance'],
    accent: 'cyan',
  },
  {
    id: 'sentinel',
    number: '02',
    title: 'Sentinel Cloud',
    category: 'Cybersecurity / Platform',
    description:
      'A security monitoring dashboard built for engineering teams — real-time threat visualization, audit-ready logging and a calm, focused command-center interface.',
    image:
      'https://images.pexels.com/photos/5380591/pexels-photo-5380591.jpeg?auto=compress&cs=tinysrgb&w=1400',
    tags: ['Security', 'Realtime', 'Dashboard'],
    accent: 'cyan',
  },
  {
    id: 'nova',
    number: '03',
    title: 'Nova Studio',
    category: 'Brand / Graphic Design',
    description:
      'A complete brand identity for a creative studio — typographic system, motion guidelines and a digital art direction that translates cleanly across screen and print.',
    image:
      'https://images.pexels.com/photos/7661411/pexels-photo-7661411.jpeg?auto=compress&cs=tinysrgb&w=1400',
    tags: ['Brand Identity', 'Art Direction', 'Motion'],
    accent: 'violet',
  },
  {
    id: 'pulse',
    number: '04',
    title: 'Pulse AI',
    category: 'AI & ML / Product',
    description:
      'An AI assistant product built around a custom RAG pipeline — contextual retrieval, structured tool use and a conversational UI designed for serious daily work.',
    image:
      'https://images.pexels.com/photos/17483871/pexels-photo-17483871.png?auto=compress&cs=tinysrgb&w=1600',
    tags: ['LLM', 'RAG', 'Product Design'],
    accent: 'violet',
  },
];

export const projectAccentHex: Record<Project['accent'], string> = {
  cyan: '#18D9FF',
  violet: '#8B5CF6',
  gold: '#FFB000',
};
