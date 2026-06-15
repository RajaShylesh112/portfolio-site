import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { cloneProjects, defaultProjects, type ProjectRecord } from "@/lib/project-store";
import { API_BASE_URL } from "@/lib/api";

type ProjectStoreValue = {
  projects: ProjectRecord[];
  addProject: (project: ProjectRecord) => void;
  updateProject: (projectId: string, updates: Partial<ProjectRecord>) => void;
  deleteProject: (projectId: string) => void;
  reorderProjects: (orderedIds: string[]) => void;
  resetProjects: () => void;
};

const ProjectStoreContext = createContext<ProjectStoreValue | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<ProjectRecord[]>(cloneProjects(defaultProjects));

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Sort by order field, falling back to array position
          const sorted = [...data].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
          setProjects(sorted);
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
          await fetch(`${API_BASE_URL}/api/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nextProject),
          });
        } catch (err) {
          console.error("Failed to save project", err);
        }
      },
      updateProject: async (projectId, updates) => {
        const projectToUpdate = projects.find(p => p.id === projectId);
        if (!projectToUpdate) return;
        
        const updatedProject = {
          ...projectToUpdate,
          ...updates,
          technologies: updates.technologies ? [...updates.technologies] : projectToUpdate.technologies,
        };
        
        setProjects((currentProjects) => currentProjects.map((project) => project.id === projectId ? updatedProject : project));
        
        try {
          const res = await fetch(`${API_BASE_URL}/api/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProject),
          });
          if (!res.ok) {
            console.error(`Failed to update project: ${res.status} ${res.statusText}`);
          }
        } catch (err) {
          console.error("Failed to update project network error", err);
        }
      },
      deleteProject: async (projectId) => {
        setProjects((currentProjects) => currentProjects.filter((project) => project.id !== projectId));
        
        try {
          await fetch(`${API_BASE_URL}/api/projects/${projectId}`, { method: 'DELETE' });
        } catch (err) {
          console.error("Failed to delete project", err);
        }
      },
      reorderProjects: async (orderedIds: string[]) => {
        setProjects((currentProjects) => {
          const projectMap = new Map(currentProjects.map(p => [p.id, p]));
          return orderedIds
            .map((id, index) => {
              const project = projectMap.get(id);
              return project ? { ...project, order: index } : null;
            })
            .filter(Boolean) as ProjectRecord[];
        });

        try {
          await fetch(`${API_BASE_URL}/api/projects/reorder`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderedIds }),
          });
        } catch (err) {
          console.error("Failed to reorder projects", err);
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
