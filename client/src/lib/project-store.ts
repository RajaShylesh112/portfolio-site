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
    image: "/portfolio-site/wanderguide-thumbnail.png",
    technologies: ["Next.js 15", "React 19", "TypeScript", "Supabase", "Leaflet", "OpenRouteService", "Geoapify"],
    category: "Full-stack",
    githubUrl: "https://github.com/RajaShylesh112/WanderGuide",
    demoUrl: "https://wander-guide-website.vercel.app/",
    featured: true,
    period: "2026",
    icon: "🧭"
  },
  {
    id: "keyboard-3d",
    title: "KX-01 Mechanical Keyboard (3D Scrollytelling)",
    description: "Experimental landing page that tells the story of the KX-01 mechanical keyboard through a cinematic, scroll-driven 3D image sequence.",
    longDescription: "A sleek Next.js landing page that showcases the KX-01 mechanical keyboard using an Apple-style dark UI and synchronized copy. It features a cinematic, scroll-driven 3D image sequence where the user's scroll controls a full-screen canvas, animating the keyboard as it explodes into an engineering diagram and seamlessly reassembles.",
    image: "/portfolio-site/kx01-thumbnail.png",
    technologies: ["Next.js", "React", "HTML5 Canvas", "TypeScript"],
    category: "Frontend Development",
    githubUrl: "https://github.com/RajaShylesh112/keyboard-3D",
    demoUrl: "/portfolio-site/keyboard-3d-demo.mp4",
    featured: true,
    period: "May 2026",
    icon: "⌨️"
  }
];

export const projectsStorageKey = "portfolio-projects-v2";

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