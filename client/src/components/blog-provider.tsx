import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { cloneBlogEntries, defaultBlogEntries, blogStorageKey, type BlogEntryRecord } from "@/lib/blog-store";

type BlogStoreValue = {
  blogEntries: BlogEntryRecord[];
  addBlogEntry: (entry: BlogEntryRecord) => void;
  updateBlogEntry: (entryId: string, updates: Partial<BlogEntryRecord>) => void;
  deleteBlogEntry: (entryId: string) => void;
  resetBlogEntries: () => void;
};

const BlogStoreContext = createContext<BlogStoreValue | undefined>(undefined);

function readStoredBlogEntries() {
  if (typeof window === "undefined") {
    return cloneBlogEntries(defaultBlogEntries);
  }

  const storedValue = window.localStorage.getItem(blogStorageKey);
  if (!storedValue) {
    return cloneBlogEntries(defaultBlogEntries);
  }

  try {
    const parsedValue = JSON.parse(storedValue) as BlogEntryRecord[];
    if (!Array.isArray(parsedValue)) {
      return cloneBlogEntries(defaultBlogEntries);
    }

    return parsedValue.map((entry) => ({
      ...entry,
      whatILearned: Array.isArray(entry.whatILearned) ? entry.whatILearned : [],
      references: Array.isArray(entry.references) ? entry.references : [],
      tags: Array.isArray(entry.tags) ? entry.tags : [],
      links: entry.links ? { ...entry.links } : undefined,
    }));
  } catch {
    return cloneBlogEntries(defaultBlogEntries);
  }
}

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [blogEntries, setBlogEntries] = useState<BlogEntryRecord[]>(cloneBlogEntries(defaultBlogEntries));
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setBlogEntries(readStoredBlogEntries());
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(blogStorageKey, JSON.stringify(blogEntries));
  }, [blogEntries, hasHydrated]);

  const value = useMemo<BlogStoreValue>(() => {
    return {
      blogEntries,
      addBlogEntry: (entry) => {
        setBlogEntries((currentEntries) => [
          ...currentEntries,
          {
            ...entry,
            whatILearned: [...entry.whatILearned],
            references: [...entry.references],
            tags: [...entry.tags],
            links: entry.links ? { ...entry.links } : undefined,
          },
        ]);
      },
      updateBlogEntry: (entryId, updates) => {
        setBlogEntries((currentEntries) =>
          currentEntries.map((entry) =>
            entry.id === entryId
              ? {
                  ...entry,
                  ...updates,
                  whatILearned: updates.whatILearned ? [...updates.whatILearned] : entry.whatILearned,
                  references: updates.references ? [...updates.references] : entry.references,
                  tags: updates.tags ? [...updates.tags] : entry.tags,
                  links: updates.links ? { ...updates.links } : entry.links,
                }
              : entry,
          ),
        );
      },
      deleteBlogEntry: (entryId) => {
        setBlogEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== entryId));
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