"use client";

import { useEffect } from "react";
import { useBoundStore } from "@/lib/hooks/useBoundStore";

export function useAuth() {
  const { setUser } = useBoundStore();
  console.log("useAuth running");

  useEffect(() => {
    async function verifyUser() {
      try {
        const res = await fetch("http://localhost:8000/api/auth/verify", {
          credentials: "include",
        });

        const data = await res.json();
        console.log("data", data);

        if (res.ok) {
          setUser(data.data)
        }
      } catch (error) {
        console.log("verifyUser error:", error)
      }
    }

    verifyUser();
  }, []);
}
