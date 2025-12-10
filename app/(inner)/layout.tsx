"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import Header from "@/components/Header"
import { useAuth } from "@/hooks/useAuth";

function HomeLayout({ children }: { children: React.ReactNode }) {
  useAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="relative">
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default HomeLayout;
