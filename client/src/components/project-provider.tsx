import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { cloneProjects, defaultProjects, projectsStorageKey, type ProjectRecord } from "@/lib/project-store";

type ProjectStoreValue = {
  projects: ProjectRecord[];
  addProject: (project: ProjectRecord) => void;
  updateProject: (projectId: string, updates: Partial<ProjectRecord>) => void;
  deleteProject: (projectId: string) => void;
  resetProjects: () => void;
};

const ProjectStoreContext = createContext<ProjectStoreValue | undefined>(undefined);

function readStoredProjects() {
  if (typeof window === "undefined") {
    return cloneProjects(defaultProjects);
  }

  const storedValue = window.localStorage.getItem(projectsStorageKey);
  if (!storedValue) {
    return cloneProjects(defaultProjects);
  }

  try {
    const parsedValue = JSON.parse(storedValue) as ProjectRecord[];
    if (!Array.isArray(parsedValue)) {
      return cloneProjects(defaultProjects);
    }

    return parsedValue.map((project) => ({
      ...project,
      technologies: Array.isArray(project.technologies) ? project.technologies : [],
    }));
  } catch {
    return cloneProjects(defaultProjects);
  }
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<ProjectRecord[]>(cloneProjects(defaultProjects));
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setProjects(readStoredProjects());
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(projectsStorageKey, JSON.stringify(projects));
  }, [hasHydrated, projects]);

  const value = useMemo<ProjectStoreValue>(() => {
    return {
      projects,
      addProject: (project) => {
        setProjects((currentProjects) => [
          ...currentProjects,
          {
            ...project,
            technologies: [...project.technologies],
          },
        ]);
      },
      updateProject: (projectId, updates) => {
        setProjects((currentProjects) =>
          currentProjects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  ...updates,
                  technologies: updates.technologies
                    ? [...updates.technologies]
                    : project.technologies,
                }
              : project,
          ),
        );
      },
      deleteProject: (projectId) => {
        setProjects((currentProjects) => currentProjects.filter((project) => project.id !== projectId));
      },
      resetProjects: () => {
        setProjects(cloneProjects(defaultProjects));
      },
    };
  }, [projects]);

  return <ProjectStoreContext.Provider value={value}>{children}</ProjectStoreContext.Provider>;
}

export function useProjects() {
  const context = useContext(ProjectStoreContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }

  return context;
}