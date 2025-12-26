"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import NavPanel from "./NavPanel"
import NavUser from "./NavUser"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon" {...props}>
      {/* <SidebarHeader> */}
      {/* <TeamSwitcher teams={data.teams} /> */}
      {/* </SidebarHeader> */}
      <SidebarContent>
        <NavPanel />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
