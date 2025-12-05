"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { useIsMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";

export default function GlobalSnackbar() {
  const isMobile = useIsMobile();
  const message = useBoundStore(state => state.message)
  const { hideNoti } = useBoundStore();

  const handleClose = () => {
    hideNoti();
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        hideNoti();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-2 bg-snackbar text-snackbar-foreground/90 p-4 rounded-sm shadow-sm flex items-center gap-3 w-full max-w-sm border border-border",
        isMobile && "left-1/2 -translate-x-1/2"
      )}
    >
      <span className="text-sm font-medium flex-1">
        {message}
      </span>

      <button
        className="text-snackbar-foreground/60 hover:text-snackbar-foreground"
        title="close"
        onClick={handleClose}
      >
        <X size={20} />
      </button>
    </div >
  )
}
