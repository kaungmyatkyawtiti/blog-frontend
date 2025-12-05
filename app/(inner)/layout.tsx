"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import Header from "@/components/Header"
import IsAuth from "@/components/IsAuth"

function HomeLayout({ children }: { children: React.ReactNode }) {
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

export default IsAuth(HomeLayout);
