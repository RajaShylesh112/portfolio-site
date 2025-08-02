import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Blueprints" },
    { path: "/blog", label: "Field Notes" },
    { path: "/about", label: "About" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--architect-charcoal)]/95 backdrop-blur-md border-b border-[var(--architect-teal)]/30 blueprint-grid"
          : "bg-[var(--architect-charcoal)]/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold font-mono text-[var(--architect-teal)] cursor-pointer hover:text-[var(--architect-rust)] transition-colors tracking-wider">
            [PORTFOLIO]
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`font-mono text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer relative group ${
                    location === item.path
                      ? "text-[var(--architect-teal)] after:w-full"
                      : "text-[var(--architect-concrete)] hover:text-[var(--architect-teal)]"
                  } after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[var(--architect-teal)] after:transition-all after:duration-300 ${
                    location === item.path ? "after:w-full" : "after:w-0 group-hover:after:w-full"
                  }`}
                >
                  <span className="relative">
                    [{String(index + 1).padStart(2, '0')}] {item.label}
                    {location === item.path && (
                      <span className="absolute -right-3 top-0 w-1 h-1 bg-[var(--architect-teal)] animate-pulse" />
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* System Controls */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 font-mono text-xs text-[var(--architect-concrete)]/60">
              <span>SYS:</span>
              <span className="text-[var(--architect-teal)]">ONLINE</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="border border-[var(--architect-teal)]/30 hover:bg-[var(--architect-teal)]/10 cursor-pointer font-mono text-xs"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile Command Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden border border-[var(--architect-teal)]/30 hover:bg-[var(--architect-teal)]/10 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Command Interface */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 py-4 bg-[var(--architect-navy)]/95 backdrop-blur-md border-t border-[var(--architect-teal)]/30">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={closeMenu}
                    className={`block font-mono text-sm tracking-wider uppercase px-3 py-2 transition-colors duration-200 border-l-2 ${
                      location === item.path
                        ? "text-[var(--architect-teal)] border-[var(--architect-teal)]"
                        : "text-[var(--architect-concrete)] hover:text-[var(--architect-teal)] border-transparent hover:border-[var(--architect-teal)]/50"
                    }`}
                  >
                    [{String(index + 1).padStart(2, '0')}] {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
