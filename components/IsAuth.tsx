"use client";

import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function IsAuth<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const router = useRouter();
    const { refreshAccess } = useBoundStore();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      async function verifyToken() {
        // refresh access token
        try {
          await refreshAccess();
          setIsAuth(true);
        } catch (err) {
          console.log("Access token refresh failed in isAuth", err);
          router.replace("/login");
        }
      }

      verifyToken();
    }, []);

    if (!isAuth) {
      return <div>Loading</div>;
    }

    return <Component {...props!} />;
  };
}
