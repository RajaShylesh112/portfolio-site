import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { cloneBlogEntries, defaultBlogEntries, type BlogEntryRecord } from "@/lib/blog-store";
import { API_BASE_URL } from "@/lib/api";

type BlogStoreValue = {
  blogEntries: BlogEntryRecord[];
  addBlogEntry: (entry: BlogEntryRecord) => void;
  updateBlogEntry: (entryId: string, updates: Partial<BlogEntryRecord>) => void;
  deleteBlogEntry: (entryId: string) => void;
  resetBlogEntries: () => void;
};

const BlogStoreContext = createContext<BlogStoreValue | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [blogEntries, setBlogEntries] = useState<BlogEntryRecord[]>(cloneBlogEntries(defaultBlogEntries));

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/blogs`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogEntries(data);
        }
      })
      .catch(err => console.error("Failed to load blogs", err));
  }, []);

  const value = useMemo<BlogStoreValue>(() => {
    return {
      blogEntries,
      addBlogEntry: async (entry) => {
        const nextEntry = {
          ...entry,
          whatILearned: [...entry.whatILearned],
          references: [...entry.references],
          tags: [...entry.tags],
          links: entry.links ? { ...entry.links } : undefined,
        };
        setBlogEntries((currentEntries) => [...currentEntries, nextEntry]);
        
        try {
          await fetch(`${API_BASE_URL}/api/blogs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nextEntry),
          });
        } catch (err) {
          console.error("Failed to save blog", err);
        }
      },
      updateBlogEntry: async (entryId, updates) => {
        const entryToUpdate = blogEntries.find(e => e.id === entryId);
        if (!entryToUpdate) return;
        
        const updatedEntry = {
          ...entryToUpdate,
          ...updates,
          whatILearned: updates.whatILearned ? [...updates.whatILearned] : entryToUpdate.whatILearned,
          references: updates.references ? [...updates.references] : entryToUpdate.references,
          tags: updates.tags ? [...updates.tags] : entryToUpdate.tags,
          links: updates.links ? { ...updates.links } : entryToUpdate.links ? { ...entryToUpdate.links } : undefined,
        };

        setBlogEntries((currentEntries) => currentEntries.map((entry) => entry.id === entryId ? updatedEntry : entry));
        
        try {
          const res = await fetch(`${API_BASE_URL}/api/blogs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEntry),
          });
          if (!res.ok) {
            console.error(`Failed to update blog: ${res.status} ${res.statusText}`);
          }
        } catch (err) {
          console.error("Failed to update blog network error", err);
        }
      },
      deleteBlogEntry: async (entryId) => {
        setBlogEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== entryId));
        
        try {
          await fetch(`${API_BASE_URL}/api/blogs/${entryId}`, { method: 'DELETE' });
        } catch (err) {
          console.error("Failed to delete blog", err);
        }
      },
      resetBlogEntries: () => {
        setBlogEntries(cloneBlogEntries(defaultBlogEntries));
      },
    };
  }, [blogEntries]);

  return <BlogStoreContext.Provider value={value}>{children}</BlogStoreContext.Provider>;
}

export function useBlogs() {
  const context = useContext(BlogStoreContext);
  if (!context) {
    throw new Error("useBlogs must be used within a BlogProvider");
  }
  return context;
}