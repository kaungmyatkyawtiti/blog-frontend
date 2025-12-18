"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartHandshake, Home, MessageCircleReply } from "lucide-react";
import { useIsMobile } from "@/hooks/useMobile";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"


export const links = [
  {
    title: "Home",
    href: "/",
    icon: <Home />
  },
  {
    title: "Support",
    href: "/support",
    icon: <HeartHandshake />
  },
  {
    title: "Feedback",
    href: "/feedback",
    icon: <MessageCircleReply />
  },
]

export default function NavPanel() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-2">
        {
          links.map((link, ind) =>
            <Link
              key={ind}
              href={link.href}
            >
              <Collapsible
                asChild
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={link.title}
                      className={cn(
                        "py-4 w-full font-medium text-[15px] hover-effect text-foreground hover:bg-accent",
                        pathname === link.href && "text-social-indigo bg-accent hover:text-social-indigo hover-effect"
                      )}
                    >
                      {link.icon}
                      {link.title}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
              </Collapsible>
            </Link>
          )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
