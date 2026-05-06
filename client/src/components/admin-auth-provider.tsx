import { createContext, useContext, useEffect, useMemo, useState } from "react";

const adminAuthStorageKey = "portfolio-admin-auth-v1";
const fallbackAdminPassword = "nexus";

type AdminAuthValue = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthValue | undefined>(undefined);

function getAdminPassword() {
  return import.meta.env.VITE_ADMIN_PASSWORD || fallbackAdminPassword;
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(window.sessionStorage.getItem(adminAuthStorageKey) === "true");
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.sessionStorage.setItem(adminAuthStorageKey, String(isAuthenticated));
  }, [hasHydrated, isAuthenticated]);

  const value = useMemo<AdminAuthValue>(() => {
    return {
      isAuthenticated,
      login: (password: string) => {
        const matched = password === getAdminPassword();
        setIsAuthenticated(matched);
        if (!matched) {
          window.sessionStorage.removeItem(adminAuthStorageKey);
        }
        return matched;
      },
      logout: () => {
        setIsAuthenticated(false);
        window.sessionStorage.removeItem(adminAuthStorageKey);
      },
    };
  }, [isAuthenticated]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }

  return context;
}