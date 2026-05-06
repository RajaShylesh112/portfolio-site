import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ProjectProvider } from "@/components/project-provider";
import { BlogProvider } from "@/components/blog-provider";
import { AdminAuthProvider } from "@/components/admin-auth-provider";
import Home from "@/pages/home";
import About from "@/pages/about";
import Projects from "@/pages/projects";
import Blog from "@/pages/blog";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/projects" component={Projects} />
      <Route path="/blog" component={Blog} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AdminAuthProvider>
          <ProjectProvider>
            <BlogProvider>
              <TooltipProvider>
                <Toaster />
                <Router />
              </TooltipProvider>
            </BlogProvider>
          </ProjectProvider>
        </AdminAuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
