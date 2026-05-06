export interface ProjectRecord {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  period?: string;
  icon?: string;
}

export const defaultProjects: ProjectRecord[] = [
  {
    id: "wanderguide",
    title: "WanderGuide",
    description: "An intelligent travel planning app for building multi-stop itineraries with dynamic routing and pricing estimates",
    longDescription: "WanderGuide is a premium full-stack travel planning application built with Next.js 15, React 19, and Supabase. It lets users create multi-stop itineraries, visualize routes in real time with Leaflet and OpenRouteService, estimate travel costs, and personalize recommendations with travel preferences and community reviews.",
    image: "/api/placeholder/400/300",
    technologies: ["Next.js 15", "React 19", "TypeScript", "Supabase", "Leaflet", "OpenRouteService", "Geoapify"],
    category: "Full-stack",
    githubUrl: "https://github.com/RajaShylesh112/WanderGuide",
    demoUrl: "https://wander-guide-website.vercel.app/",
    featured: true,
    period: "2026",
    icon: "🧭"
  }
];

export const projectsStorageKey = "portfolio-projects-v1";

export function cloneProjects(projects: ProjectRecord[]) {
  return projects.map((project) => ({
    ...project,
    technologies: [...project.technologies],
  }));
}

export function createEmptyProject(): ProjectRecord {
  return {
    id: "",
    title: "",
    description: "",
    longDescription: "",
    image: "",
    technologies: [],
    category: "",
    githubUrl: "",
    demoUrl: "",
    featured: false,
    period: "",
    icon: "🚀",
  };
}