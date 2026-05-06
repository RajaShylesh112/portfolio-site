import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { cloneProjects, defaultProjects, type ProjectRecord } from "@/lib/project-store";

type ProjectStoreValue = {
  projects: ProjectRecord[];
  addProject: (project: ProjectRecord) => void;
  updateProject: (projectId: string, updates: Partial<ProjectRecord>) => void;
  deleteProject: (projectId: string) => void;
  resetProjects: () => void;
};

const ProjectStoreContext = createContext<ProjectStoreValue | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<ProjectRecord[]>(cloneProjects(defaultProjects));

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/projects`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(err => console.error("Failed to load projects", err));
  }, []);

  const value = useMemo<ProjectStoreValue>(() => {
    return {
      projects,
      addProject: async (project) => {
        const nextProject = { ...project, technologies: [...project.technologies] };
        setProjects((currentProjects) => [...currentProjects, nextProject]);
        
        try {
          await fetch(`${import.meta.env.BASE_URL}api/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nextProject),
          });
        } catch (err) {
          console.error("Failed to save project", err);
        }
      },
      updateProject: async (projectId, updates) => {
        let updatedProject: ProjectRecord | null = null;
        
        setProjects((currentProjects) =>
          currentProjects.map((project) => {
            if (project.id === projectId) {
              updatedProject = {
                ...project,
                ...updates,
                technologies: updates.technologies ? [...updates.technologies] : project.technologies,
              };
              return updatedProject;
            }
            return project;
          }),
        );
        
        if (updatedProject) {
          try {
            await fetch(`${import.meta.env.BASE_URL}api/projects`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedProject),
            });
          } catch (err) {
            console.error("Failed to update project", err);
          }
        }
      },
      deleteProject: async (projectId) => {
        setProjects((currentProjects) => currentProjects.filter((project) => project.id !== projectId));
        
        try {
          await fetch(`${import.meta.env.BASE_URL}api/projects/${projectId}`, { method: 'DELETE' });
        } catch (err) {
          console.error("Failed to delete project", err);
        }
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