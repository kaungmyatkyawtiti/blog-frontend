"use client";

import AuthPortionSkeletion from "./AuthPortionSkeletion";
import AuthPotion from "./AuthPotion";
import { ModeToggle } from "./ModeToggle";
import MyLogo from "./MyLogo";
import { SidebarTrigger } from "./ui/sidebar";
import { useBoundStore } from "@/lib/hooks/useBoundStore";

export default function Header() {
  const status = useBoundStore(state => state.status);

  return (
    <header
      className="py-5 border-b border-border top-0 z-50 sticky backdrop-blur-lg bg-sidebar/70"
    >
      <div
        className="flex items-center justify-between text-foreground/90 px-5"
      >
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <MyLogo />
        </div>

        <div className="flex items-center gap-4">
          {status === "loading" && <AuthPortionSkeletion />}
          {status === "authenticated" && <AuthPotion />}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
