"use client";

import { useEffect } from "react";
import { useBoundStore } from "@/lib/hooks/useBoundStore";

export function useAuth() {
  const refreshAccess = useBoundStore((s) => s.refreshAccess);
  const setUser = useBoundStore((s) => s.setUser);
  const logout = useBoundStore((s) => s.logout);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshAccess();

        const res = await fetch("http://localhost:8000/api/auth/verify", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not authenticated");

        const json = await res.json();
        setUser(json.data);
      } catch {
        logout();
      }
    };

    initAuth();
  }, [refreshAccess]);
}
