export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  title: string[];
  location: string;
  email: string;
  website: string;
  avatar: string;
  portraitCutout: string;
  links: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  year: number;
  categories: string[];
  client?: string;
  isMock?: boolean;
  thumbnail: string;
  images: string[];
  color: string;
}

export interface CaseStudy {
  projectId: string;
  overview: { it: string; en: string };
  challenge: { it: string; en: string };
  process: { it: string; en: string };
  solution: { it: string; en: string };
  results: { it: string; en: string };
  testimonial?: {
    quote: { it: string; en: string };
    author: string;
    role: string;
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  grade?: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'design' | 'tools' | 'soft';
}
