import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useProjects } from "@/components/project-provider";
import { useBlogs } from "@/components/blog-provider";
import { useAdminAuth } from "@/components/admin-auth-provider";
import { toast } from "@/hooks/use-toast";
import { createEmptyProject, type ProjectRecord } from "@/lib/project-store";
import { createEmptyBlogEntry, type BlogEntryRecord } from "@/lib/blog-store";

function toProjectDraft(project: ProjectRecord): ProjectRecord {
  return {
    ...project,
    technologies: [...project.technologies],
  };
}

function toBlogDraft(entry: BlogEntryRecord): BlogEntryRecord {
  return {
    ...entry,
    whatILearned: [...entry.whatILearned],
    references: [...entry.references],
    tags: [...entry.tags],
    links: entry.links ? { ...entry.links } : undefined,
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function makeUniqueId(value: string, existingIds: string[]) {
  const baseId = slugify(value) || `item-${Date.now()}`;
  if (!existingIds.includes(baseId)) {
    return baseId;
  }

  let suffix = 2;
  while (existingIds.includes(`${baseId}-${suffix}`)) {
    suffix += 1;
  }

  return `${baseId}-${suffix}`;
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Unable to read file"));
    reader.readAsDataURL(file);
  });
}

function ThumbnailPreview({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="aspect-video rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center text-4xl">
        🖼️
      </div>
    );
  }

  return <img src={src} alt={alt} className="aspect-video w-full rounded-lg object-cover" />;
}

interface FrontmatterData {
  title: string;
  date: string;
  category: string;
  level: "Beginner" | "Student Project" | "Deep Dive";
  readTime: string;
  featured: boolean;
  tags: string[];
  links?: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  whatILearned: string[];
  references: string[];
}

function parseMarkdownBlog(content: string): { frontmatter: FrontmatterData; sections: Record<string, string> } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error("Invalid markdown format. Expected frontmatter between --- markers.");
  }

  const frontmatterStr = match[1];
  const bodyStr = match[2];

  // Parse YAML frontmatter (simple parser)
  const frontmatter = {
    title: "",
    date: new Date().toISOString().slice(0, 10),
    category: "",
    level: "Student Project" as const,
    readTime: "",
    featured: false,
    tags: [] as string[],
    whatILearned: [] as string[],
    references: [] as string[],
    thumbnail: "",
  };

  const lines = frontmatterStr.split("\n");
  let currentKey = "";
  let inArray = false;

  for (const line of lines) {
    if (!line.trim()) continue;

    if (line.startsWith("  - ")) {
      if (inArray && currentKey === "tags") {
        const value = line.replace("  - ", "").trim();
        frontmatter.tags.push(value);
      }
    } else if (line.includes(":")) {
      inArray = false;
      const [key, ...valueParts] = line.split(":");
      const value = valueParts.join(":").trim();

      if (key === "title" || key === "category" || key === "readTime") {
        (frontmatter as Record<string, unknown>)[key] = value.replace(/^["']|["']$/g, "");
      } else if (key === "date") {
        frontmatter.date = value;
      } else if (key === "level") {
        frontmatter.level = value as "Beginner" | "Student Project" | "Deep Dive";
      } else if (key === "featured") {
        frontmatter.featured = value.toLowerCase() === "true";
      } else if (key === "thumbnail") {
        frontmatter.thumbnail = value.replace(/^["']|["']$/g, "");
      } else if (key === "tags") {
        currentKey = key;
        inArray = true;
      } else if (key === "links") {
        frontmatter.links = {};
      } else if (key === "  github" || key === "  demo" || key === "  docs") {
        const linkKey = key.trim();
        if (!frontmatter.links) frontmatter.links = {};
        (frontmatter.links as Record<string, unknown>)[linkKey] = value.replace(/^["']|["']$/g, "");
      }
    }
  }

  // Parse sections from body
  const sections: Record<string, string> = {};
  const bodyLines = bodyStr.split("\n");
  let currentSection = "";
  let currentContent: string[] = [];

  for (const line of bodyLines) {
    if (line.startsWith("# ")) {
      // Save previous section if exists
      if (currentSection && currentContent.length > 0) {
        sections[currentSection] = currentContent.join("\n").trim();
      }
      // Start new section
      currentSection = line.replace(/^# /, "").trim();
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    }
  }

  // Don't forget the last section
  if (currentSection && currentContent.length > 0) {
    sections[currentSection] = currentContent.join("\n").trim();
  }

  // Parse whatILearned and references from markdown sections
  if (sections["What I Learned"]) {
    const content = sections["What I Learned"].trim();
    if (content) {
      frontmatter.whatILearned = content
        .split("\n")
        .map((line) => line.replace(/^[\s-]*/, "").trim())
        .filter((line) => line.length > 0);
    }
  }

  if (sections["References"]) {
    const content = sections["References"].trim();
    if (content) {
      frontmatter.references = content
        .split("\n")
        .map((line) => line.replace(/^[\s-]*/, "").trim())
        .filter((line) => line.length > 0);
    }
  }

  return { frontmatter, sections };
}

function blogToMarkdown(entry: BlogEntryRecord): string {
  const tagsSection = entry.tags.length > 0 ? entry.tags.map((tag) => `  - ${tag}`).join("\n") : "";
  
  const linksSection = entry.links ? 
    `links:\n${entry.links.github ? `  github: "${entry.links.github}"\n` : ""}${entry.links.demo ? `  demo: "${entry.links.demo}"\n` : ""}${entry.links.docs ? `  docs: "${entry.links.docs}"` : ""}`.trim() : "";

  const whatILearnedSection = entry.whatILearned.length > 0 
    ? entry.whatILearned.map((item) => `- ${item}`).join("\n") 
    : "";

  const referencesSection = entry.references.length > 0 
    ? entry.references.map((ref) => `- ${ref}`).join("\n") 
    : "";

  const parts: string[] = [
    "---",
    `title: "${entry.title}"`,
    `date: ${entry.date}`,
    `category: ${entry.category}`,
    `level: ${entry.level}`,
    `readTime: ${entry.readTime}`,
    `featured: ${entry.featured}`,
    `thumbnail: "${entry.thumbnail ?? ""}"`,
    "tags:",
  ];

  if (tagsSection) {
    parts.push(tagsSection);
  }

  if (linksSection) {
    parts.push(linksSection);
  }

  parts.push("---", "", "# Hook", entry.hook, "", "# Background", entry.background, "", "# What I Tried", entry.whatITried, "", "# Where It Failed", entry.whereItFailed, "", "# Final Decision", entry.finalDecision, "", "# What I Learned");

  if (whatILearnedSection) {
    parts.push(whatILearnedSection);
  }

  parts.push("", "# References");

  if (referencesSection) {
    parts.push(referencesSection);
  }

  return parts.join("\n");
}

function markdownToBlog(markdown: string, id: string): BlogEntryRecord {
  const { frontmatter, sections } = parseMarkdownBlog(markdown);

  return {
    id,
    title: frontmatter.title,
    date: frontmatter.date,
    category: frontmatter.category,
    level: frontmatter.level,
    readTime: frontmatter.readTime,
    featured: frontmatter.featured,
    tags: frontmatter.tags,
    whatILearned: frontmatter.whatILearned,
    references: frontmatter.references,
    links: frontmatter.links,
    hook: sections["Hook"] || "",
    background: sections["Background"] || "",
    whatITried: sections["What I Tried"] || "",
    whereItFailed: sections["Where It Failed"] || "",
    finalDecision: sections["Final Decision"] || "",
    thumbnail: frontmatter.thumbnail || "",
  };
}

export default function Admin() {
  const { isAuthenticated, login, logout } = useAdminAuth();
  const { projects, addProject, updateProject, deleteProject, resetProjects } = useProjects();
  const { blogEntries, addBlogEntry, updateBlogEntry, deleteBlogEntry, resetBlogEntries } = useBlogs();

  const [adminPassword, setAdminPassword] = useState("");
  const [activeSection, setActiveSection] = useState<"projects" | "blogs">("projects");
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id ?? "");
  const [selectedBlogId, setSelectedBlogId] = useState(blogEntries[0]?.id ?? "");
  const [projectDraft, setProjectDraft] = useState<ProjectRecord | null>(projects[0] ? toProjectDraft(projects[0]) : null);
  const [blogDraft, setBlogDraft] = useState<BlogEntryRecord | null>(blogEntries[0] ? toBlogDraft(blogEntries[0]) : null);
  const [blogMarkdown, setBlogMarkdown] = useState<string>(blogEntries[0] ? blogToMarkdown(blogEntries[0]) : "");
  const [newProjectDraft, setNewProjectDraft] = useState<ProjectRecord>(createEmptyProject());
  const [newBlogMarkdown, setNewBlogMarkdown] = useState<string>(`---
title: ""
date: ${new Date().toISOString().slice(0, 10)}
category: ""
level: Student Project
readTime: ""
featured: false
tags:
references:
whatILearned:
links:
---

# Hook


# Background


# What I Tried


# Where It Failed


# Final Decision
`);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? projects[0],
    [projects, selectedProjectId],
  );
  const selectedBlog = useMemo(
    () => blogEntries.find((entry) => entry.id === selectedBlogId) ?? blogEntries[0],
    [blogEntries, selectedBlogId],
  );

  useEffect(() => {
    if (!projects.length) {
      setProjectDraft(null);
      return;
    }

    if (!projects.some((project) => project.id === selectedProjectId)) {
      setSelectedProjectId(projects[0].id);
      return;
    }

    if (selectedProject) {
      setProjectDraft(toProjectDraft(selectedProject));
    }
  }, [projects, selectedProject, selectedProjectId]);

  useEffect(() => {
    if (!blogEntries.length) {
      setBlogDraft(null);
      return;
    }

    if (!blogEntries.some((entry) => entry.id === selectedBlogId)) {
      setSelectedBlogId(blogEntries[0].id);
      return;
    }

    if (selectedBlog) {
      setBlogDraft(toBlogDraft(selectedBlog));
      setBlogMarkdown(blogToMarkdown(selectedBlog));
    }
  }, [blogEntries, selectedBlog, selectedBlogId]);

  const updateProjectDraft = <K extends keyof ProjectRecord>(key: K, value: ProjectRecord[K]) => {
    setProjectDraft((currentDraft) => {
      if (!currentDraft) {
        return currentDraft;
      }

      return {
        ...currentDraft,
        [key]: value,
      };
    });
  };

  const updateBlogDraft = <K extends keyof BlogEntryRecord>(key: K, value: BlogEntryRecord[K]) => {
    setBlogDraft((currentDraft) => {
      if (!currentDraft) {
        return currentDraft;
      }

      return {
        ...currentDraft,
        [key]: value,
      };
    });
  };

  const handleUploadToProject = async (file?: File | null, onValue?: (value: string) => void) => {
    if (!file || !onValue) {
      return;
    }

    onValue(await readFileAsDataUrl(file));
  };

  const saveProject = () => {
    if (!projectDraft || !projectDraft.id) {
      toast({ title: "Missing project", description: "Select a project before saving." });
      return;
    }

    updateProject(projectDraft.id, projectDraft);
    toast({ title: "Project saved", description: `${projectDraft.title} has been updated.` });
  };

  const addProjectHandler = () => {
    if (!newProjectDraft.title.trim()) {
      toast({ title: "Project title required", description: "Enter a title before adding a project." });
      return;
    }

    const nextProject: ProjectRecord = {
      ...newProjectDraft,
      id: makeUniqueId(newProjectDraft.title, projects.map((project) => project.id)),
      title: newProjectDraft.title.trim(),
      description: newProjectDraft.description.trim(),
      longDescription: newProjectDraft.longDescription.trim(),
      category: newProjectDraft.category.trim() || "Full-stack",
      technologies: newProjectDraft.technologies.filter(Boolean),
      githubUrl: newProjectDraft.githubUrl.trim(),
      demoUrl: newProjectDraft.demoUrl?.trim() || undefined,
      image: newProjectDraft.image.trim(),
      period: newProjectDraft.period?.trim() || undefined,
      icon: newProjectDraft.icon?.trim() || undefined,
      featured: newProjectDraft.featured,
    };

    addProject(nextProject);
    setSelectedProjectId(nextProject.id);
    setProjectDraft(toProjectDraft(nextProject));
    setNewProjectDraft(createEmptyProject());
    toast({ title: "Project added", description: `${nextProject.title} was added to your portfolio.` });
  };

  const resetProjectData = () => {
    if (!selectedProjectId) return;
    deleteProject(selectedProjectId);
    setSelectedProjectId(projects[0]?.id ?? "");
    setProjectDraft(null);
    toast({ title: "Project deleted", description: "The project has been removed." });
  };

  const saveBlog = () => {
    if (!blogDraft || !blogDraft.id) {
      toast({ title: "Missing blog post", description: "Select a blog post before saving." });
      return;
    }

    try {
      const updated = markdownToBlog(blogMarkdown, blogDraft.id);
      updateBlogEntry(updated.id, updated);
      setBlogDraft(updated);
      toast({ title: "Blog post saved", description: `${updated.title} has been updated.` });
    } catch (error) {
      toast({ title: "Save failed", description: error instanceof Error ? error.message : "Unable to parse markdown" });
    }
  };

  const addBlogHandler = () => {
    try {
      const newId = makeUniqueId("new-blog", blogEntries.map((entry) => entry.id));
      const newBlog = markdownToBlog(newBlogMarkdown, newId);

      if (!newBlog.title.trim()) {
        toast({ title: "Blog title required", description: "Enter a title in the frontmatter before adding a post." });
        return;
      }

      addBlogEntry(newBlog);
      setSelectedBlogId(newBlog.id);
      setBlogDraft(newBlog);
      setBlogMarkdown(blogToMarkdown(newBlog));
      setNewBlogMarkdown(`---
title: ""
date: ${new Date().toISOString().slice(0, 10)}
category: ""
level: Student Project
readTime: ""
featured: false
tags:
links:
---

# Hook


# Background


# What I Tried


# Where It Failed


# Final Decision


# What I Learned


# References
`);
      toast({ title: "Blog added", description: `${newBlog.title} was added to your blog.` });
    } catch (error) {
      toast({ title: "Add failed", description: error instanceof Error ? error.message : "Unable to parse markdown" });
    }
  };

  const resetBlogData = () => {
    if (!selectedBlogId) return;
    deleteBlogEntry(selectedBlogId);
    setSelectedBlogId(blogEntries[0]?.id ?? "");
    setBlogDraft(null);
    setBlogMarkdown("");
    toast({ title: "Blog deleted", description: "The blog post has been removed." });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white relative overflow-hidden">
        <Navigation />
        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="bg-white/80 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Admin Login</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enter the admin password to manage projects and blog content.
                  </p>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      type="password"
                      value={adminPassword}
                      onChange={(event) => setAdminPassword(event.target.value)}
                      placeholder="Admin password"
                    />
                  </div>
                  <Button
                    className="w-full bg-cyan-600 hover:bg-cyan-700"
                    onClick={() => {
                      const success = login(adminPassword);
                      if (!success) {
                        toast({ title: "Login failed", description: "The admin password was not correct." });
                        return;
                      }

                      toast({ title: "Logged in", description: "Admin access granted." });
                      setAdminPassword("");
                    }}
                  >
                    Sign In
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Tip: set VITE_ADMIN_PASSWORD in your Vercel environment for a custom password. A fallback password is available in development.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white relative overflow-hidden">
      <Navigation />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
              Edit your portfolio projects and blog content here. Changes are stored locally in the browser and update the public pages immediately.
            </p>
          </motion.div>

          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex gap-2">
              <Button
                variant={activeSection === "projects" ? "default" : "outline"}
                onClick={() => setActiveSection("projects")}
                className={activeSection === "projects" ? "bg-cyan-600 hover:bg-cyan-700" : "border-cyan-500 dark:border-cyan-400/50"}
              >
                Projects
              </Button>
              <Button
                variant={activeSection === "blogs" ? "default" : "outline"}
                onClick={() => setActiveSection("blogs")}
                className={activeSection === "blogs" ? "bg-cyan-600 hover:bg-cyan-700" : "border-cyan-500 dark:border-cyan-400/50"}
              >
                Blogs
              </Button>
            </div>
            <Button variant="outline" onClick={logout} className="border-cyan-500 dark:border-cyan-400/50">
              Logout
            </Button>
          </div>

          {activeSection === "projects" ? (
            <div className="space-y-8">
              <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-8 items-start">
                <Card className="bg-white/80 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Projects</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {projects.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        className={`w-full text-left rounded-lg border px-4 py-3 transition-all ${
                          selectedProjectId === project.id
                            ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-400/10"
                            : "border-gray-200 dark:border-slate-700 hover:border-cyan-400/60"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-medium">{project.title}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{project.category}</div>
                          </div>
                          {project.featured && <Badge className="bg-cyan-600 text-white">Featured</Badge>}
                        </div>
                      </button>
                    ))}
                    <div className="pt-2 flex gap-2">
                      <Button onClick={saveProject} className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                        Save
                      </Button>
                      <Button onClick={resetProjectData} variant="outline" className="flex-1 border-red-500 dark:border-red-400/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10">
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-8">
                  <Card className="bg-white/80 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Edit Project Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">Thumbnail</label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            void handleUploadToProject(event.target.files?.[0], (value) => updateProjectDraft("image", value));
                          }}
                        />
                        <Input
                          value={projectDraft?.image ?? ""}
                          onChange={(event) => updateProjectDraft("image", event.target.value)}
                          placeholder="Thumbnail URL or uploaded image data"
                        />
                        <ThumbnailPreview src={projectDraft?.image} alt={projectDraft?.title ?? "Project thumbnail"} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input value={projectDraft?.title ?? ""} onChange={(event) => updateProjectDraft("title", event.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Input value={projectDraft?.category ?? ""} onChange={(event) => updateProjectDraft("category", event.target.value)} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">Short Description</label>
                        <Textarea rows={3} value={projectDraft?.description ?? ""} onChange={(event) => updateProjectDraft("description", event.target.value)} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">Long Description</label>
                        <Textarea rows={6} value={projectDraft?.longDescription ?? ""} onChange={(event) => updateProjectDraft("longDescription", event.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">GitHub URL</label>
                        <Input value={projectDraft?.githubUrl ?? ""} onChange={(event) => updateProjectDraft("githubUrl", event.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Demo URL</label>
                        <Input value={projectDraft?.demoUrl ?? ""} onChange={(event) => updateProjectDraft("demoUrl", event.target.value)} placeholder="Leave blank to hide demo button" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Period</label>
                        <Input value={projectDraft?.period ?? ""} onChange={(event) => updateProjectDraft("period", event.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Icon</label>
                        <Input value={projectDraft?.icon ?? ""} onChange={(event) => updateProjectDraft("icon", event.target.value)} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">Technologies</label>
                        <Textarea
                          rows={3}
                          value={projectDraft?.technologies.join(", ") ?? ""}
                          onChange={(event) => {
                            const technologies = event.target.value.split(",").map((item) => item.trim()).filter(Boolean);
                            setProjectDraft((currentDraft) => currentDraft ? { ...currentDraft, technologies } : currentDraft);
                          }}
                          placeholder="Comma-separated technologies"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-950 text-white border-slate-800 overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-white">Live Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-xl border border-cyan-400/20 bg-slate-900/60 p-6 space-y-4">
                        <ThumbnailPreview src={projectDraft?.image} alt={projectDraft?.title ?? "Project thumbnail"} />
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="text-3xl mb-2">{projectDraft?.icon ?? "🚀"}</div>
                            <h2 className="text-2xl font-bold">{projectDraft?.title ?? "Untitled project"}</h2>
                          </div>
                          {projectDraft?.featured && <Badge className="bg-cyan-500 text-black">Featured</Badge>}
                        </div>
                        <p className="text-slate-300">{projectDraft?.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {(projectDraft?.technologies ?? []).map((technology) => (
                            <Badge key={technology} variant="secondary" className="bg-white/10 text-white">
                              {technology}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-slate-400">
                          {projectDraft?.category} {projectDraft?.period ? `• ${projectDraft.period}` : ""}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card className="bg-white/80 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Add New Project</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Thumbnail</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        void handleUploadToProject(event.target.files?.[0], (value) => setNewProjectDraft((currentDraft) => ({ ...currentDraft, image: value })));
                      }}
                    />
                    <Input
                      value={newProjectDraft.image}
                      onChange={(event) => setNewProjectDraft((currentDraft) => ({ ...currentDraft, image: event.target.value }))}
                      placeholder="Thumbnail URL or uploaded image data"
                    />
                    <ThumbnailPreview src={newProjectDraft.image} alt="New project thumbnail" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input value={newProjectDraft.title} onChange={(event) => setNewProjectDraft((currentDraft) => ({ ...currentDraft, title: event.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Input value={newProjectDraft.category} onChange={(event) => setNewProjectDraft((currentDraft) => ({ ...currentDraft, category: event.target.value }))} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Short Description</label>
                    <Textarea rows={3} value={newProjectDraft.description} onChange={(event) => setNewProjectDraft((currentDraft) => ({ ...currentDraft, description: event.target.value }))} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Long Description</label>
                    <Textarea rows={6} value={newProjectDraft.longDescription} onChange={(event) => setNewProjectDraft((currentDraft) => ({ ...currentDraft, longDescription: event.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">GitHub URL</label>
                    <Input value={newProjectDraft.githubUrl} onChange={(event) => setNewProjectDraft((currentDraft) => ({ ...currentDraft, githubUrl: event.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Demo URL</label>
                    <Input value={newProjectDraft.demoUrl ?? ""} onChange={(event) => setNewProjectDraft((currentDraft) => ({ ...currentDraft, demoUrl: event.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Period</label>
                    <Input value={newProjectDraft.period ?? ""} onChange={(event) => setNewProjectDraft((currentDraft) => ({ ...currentDraft, period: event.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Icon</label>
                    <Input value={newProjectDraft.icon ?? ""} onChange={(event) => setNewProjectDraft((currentDraft) => ({ ...currentDraft, icon: event.target.value }))} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Technologies</label>
                    <Textarea
                      rows={3}
                      value={newProjectDraft.technologies.join(", ")}
                      onChange={(event) => {
                        const technologies = event.target.value.split(",").map((item) => item.trim()).filter(Boolean);
                        setNewProjectDraft((currentDraft) => ({ ...currentDraft, technologies }));
                      }}
                      placeholder="Comma-separated technologies"
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <Button onClick={addProjectHandler} className="bg-cyan-600 hover:bg-cyan-700">
                      Add Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-8 items-start">
                <Card className="bg-white/80 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Blog Posts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {blogEntries.map((entry) => (
                      <button
                        key={entry.id}
                        type="button"
                        onClick={() => setSelectedBlogId(entry.id)}
                        className={`w-full text-left rounded-lg border px-4 py-3 transition-all ${
                          selectedBlogId === entry.id
                            ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-400/10"
                            : "border-gray-200 dark:border-slate-700 hover:border-cyan-400/60"
                        }`}
                      >
                        <div className="font-medium line-clamp-2">{entry.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{entry.category}</div>
                      </button>
                    ))}
                    <div className="pt-2 flex gap-2">
                      <Button onClick={saveBlog} className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                        Save
                      </Button>
                      <Button onClick={resetBlogData} variant="outline" className="flex-1 border-red-500 dark:border-red-400/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10">
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-8">
                  <Card className="bg-white/80 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Edit Blog Post (Markdown)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Thumbnail</label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={async (event) => {
                              const base64 = await readFileAsDataUrl(event.target.files?.[0]!);
                              // Update frontmatter in markdown string
                              setBlogMarkdown(prev => {
                                const match = prev.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
                                if (match) {
                                  let fm = match[1];
                                  if (fm.includes("thumbnail:")) {
                                    fm = fm.replace(/thumbnail:.*?\n/, `thumbnail: "${base64}"\n`);
                                  } else {
                                    fm += `thumbnail: "${base64}"\n`;
                                  }
                                  return `---\n${fm}---\n${match[2]}`;
                                }
                                return prev;
                              });
                            }}
                          />
                          <ThumbnailPreview src={blogDraft?.thumbnail} alt={blogDraft?.title ?? "Blog thumbnail"} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Blog Content</label>
                        <Textarea 
                          rows={40}
                          value={blogMarkdown}
                          onChange={(event) => setBlogMarkdown(event.target.value)}
                          placeholder="Edit blog in markdown with frontmatter..."
                          className="font-mono text-xs bg-slate-950 text-white border-gray-600 focus:border-cyan-500 resize-vertical"
                        />
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button onClick={saveBlog} className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                          Save
                        </Button>
                        <Button onClick={resetBlogData} variant="outline" className="flex-1 border-red-500 dark:border-red-400/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10">
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-950 text-white border-slate-800 overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-white">Blog Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-xl border border-cyan-400/20 bg-slate-900/60 p-6 space-y-4">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                          <span>{blogDraft?.date}</span>
                          <Badge className="bg-white/10 text-white">{blogDraft?.category}</Badge>
                          <Badge className="bg-white/10 text-white">{blogDraft?.readTime}</Badge>
                        </div>
                        <h2 className="text-2xl font-bold">{blogDraft?.title ?? "Untitled post"}</h2>
                        <p className="text-slate-300 italic">{blogDraft?.hook}</p>
                        <div className="flex flex-wrap gap-2">
                          {(blogDraft?.tags ?? []).map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-white/10 text-white">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card className="bg-white/80 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Add New Blog Post (Markdown)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <label className="text-sm font-medium">Blog Content</label>
                    <Textarea 
                      rows={40}
                      value={newBlogMarkdown}
                      onChange={(event) => setNewBlogMarkdown(event.target.value)}
                      placeholder="Create blog in markdown with frontmatter..."
                      className="font-mono text-xs bg-slate-950 text-white border-gray-600 focus:border-cyan-500 resize-vertical"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={addBlogHandler} className="bg-cyan-600 hover:bg-cyan-700">
                      Add Blog Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}