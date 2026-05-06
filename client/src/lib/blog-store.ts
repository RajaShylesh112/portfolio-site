export interface BlogEntryRecord {
  id: string;
  date: string;
  title: string;
  category: string;
  level: "Beginner" | "Student Project" | "Deep Dive";
  readTime: string;
  hook: string;
  background: string;
  whatITried: string;
  whereItFailed: string;
  finalDecision: string;
  whatILearned: string[];
  references: string[];
  tags: string[];
  featured: boolean;
  links?: {
    github?: string;
    demo?: string;
    docs?: string;
  };
}

export const defaultBlogEntries: BlogEntryRecord[] = [
  {
    id: "how-i-built-wanderguide",
    date: "2026-04-09",
    title: "How I Built WanderGuide: Architecture, APIs, and Real-World Tradeoffs",
    category: "Full-stack",
    level: "Student Project",
    readTime: "11 min read",
    hook: "I wanted to build a travel planner that felt practical, not just pretty: multi-stop itineraries, route visualization, and realistic cost estimates in one place. WanderGuide became that project, and it taught me how to connect UX decisions to backend architecture.",
    background: "WanderGuide is a full-stack travel planning application built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, and Supabase. From day one, I scoped it around three core workflows: discover destinations, build a multi-stop trip, and understand expected costs before booking anything.",
    whatITried: "I designed the backend around Supabase tables for cities, destinations, trips, trip_stops, trip_activities, reviews, and user_profiles. For mapping and travel calculations, I integrated Geoapify for geocoding and OpenRouteService for route/distance logic, then used Leaflet for map rendering. For destination visuals, I implemented a fallback chain (Pexels to Unsplash to Wikimedia Commons) so the UI would remain rich even when one provider had limited results.",
    whereItFailed: "My first iterations surfaced common full-stack issues: API response shape mismatches between route services and map components, cost estimates that felt inconsistent when not normalized by route distance, and UI loading states that looked broken when external APIs were slow. I also had to tighten how trip-stop ordering was persisted to avoid itinerary sequencing bugs.",
    finalDecision: "I standardized API adapters for geospatial providers, moved cost estimation into a dedicated pricing flow, and treated trip ordering as first-class data in the schema. On the frontend, I paired server-rendered screens with clear loading/error states and used reusable UI primitives (shadcn + Tailwind) for consistency. This gave me a project that is easier to extend and significantly more reliable during real usage.",
    whatILearned: [
      "A clear data model for trips and stop ordering prevents a lot of downstream bugs",
      "External API integration is mostly about normalization and resilience, not just fetch calls",
      "Pricing logic should be explicit and testable instead of scattered across UI components",
      "Fallback content pipelines noticeably improve perceived product quality",
      "Docker support and reproducible setup docs make collaboration and deployment much smoother",
    ],
    references: [
      "WanderGuide README architecture and setup notes",
      "Supabase docs for relational schema and auth",
      "OpenRouteService + Geoapify API docs",
    ],
    tags: ["Next.js", "Supabase", "System Design", "Mapping APIs", "Full-stack"],
    featured: true,
    links: {
      github: "https://github.com/RajaShylesh112/WanderGuide",
      demo: "https://wander-guide-website.vercel.app/",
      docs: "https://github.com/RajaShylesh112/WanderGuide#readme",
    },
  },
];

export const blogStorageKey = "portfolio-blog-posts-v1";

export function cloneBlogEntries(entries: BlogEntryRecord[]) {
  return entries.map((entry) => ({
    ...entry,
    whatILearned: [...entry.whatILearned],
    references: [...entry.references],
    tags: [...entry.tags],
    links: entry.links ? { ...entry.links } : undefined,
  }));
}

export function createEmptyBlogEntry(): BlogEntryRecord {
  return {
    id: "",
    date: new Date().toISOString().slice(0, 10),
    title: "",
    category: "",
    level: "Student Project",
    readTime: "",
    hook: "",
    background: "",
    whatITried: "",
    whereItFailed: "",
    finalDecision: "",
    whatILearned: [],
    references: [],
    tags: [],
    featured: false,
    links: {
      github: "",
      demo: "",
      docs: "",
    },
  };
}