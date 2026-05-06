import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { cloneBlogEntries, defaultBlogEntries, type BlogEntryRecord } from "@/lib/blog-store";

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
    fetch(`${import.meta.env.BASE_URL}api/blogs`)
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
          await fetch(`${import.meta.env.BASE_URL}api/blogs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nextEntry),
          });
        } catch (err) {
          console.error("Failed to save blog", err);
        }
      },
      updateBlogEntry: async (entryId, updates) => {
        let updatedEntry: BlogEntryRecord | null = null;
        
        setBlogEntries((currentEntries) =>
          currentEntries.map((entry) => {
            if (entry.id === entryId) {
              updatedEntry = {
                ...entry,
                ...updates,
                whatILearned: updates.whatILearned ? [...updates.whatILearned] : entry.whatILearned,
                references: updates.references ? [...updates.references] : entry.references,
                tags: updates.tags ? [...updates.tags] : entry.tags,
                links: updates.links ? { ...updates.links } : entry.links,
              };
              return updatedEntry;
            }
            return entry;
          }),
        );
        
        if (updatedEntry) {
          try {
            await fetch(`${import.meta.env.BASE_URL}api/blogs`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedEntry),
            });
          } catch (err) {
            console.error("Failed to update blog", err);
          }
        }
      },
      deleteBlogEntry: async (entryId) => {
        setBlogEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== entryId));
        
        try {
          await fetch(`${import.meta.env.BASE_URL}api/blogs/${entryId}`, { method: 'DELETE' });
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