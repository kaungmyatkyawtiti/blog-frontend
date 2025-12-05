// "use client"
//
// import { ChevronRight, type LucideIcon } from "lucide-react"
//
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "./ui/collapsible"
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar"
//
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { BookOpen, Clapperboard, HeartHandshake, Home, MessageCircleReply, Panda, PartyPopper, Tv } from "lucide-react";
// import { useIsMobile } from "@/hooks/useMobile";
//
// export const links = [
//   {
//     title: "Home",
//     href: "/",
//     icon: <Home size={19} />
//   },
//   {
//     title: "TV Show",
//     href: "/tv-series",
//     icon: <Tv size={19} />
//   },
//   {
//     title: "Movies",
//     href: "/movies",
//     icon: <Clapperboard size={19} />
//   },
//   {
//     title: "Animation",
//     href: "/animated",
//     icon: <Panda size={19} />
//   },
//   {
//     title: "Novels",
//     href: "/novels",
//     icon: <BookOpen size={19} />
//   },
//   {
//     title: "Most Watched",
//     href: "/ranking-lists",
//     icon: <PartyPopper size={19} />
//   },
//   {
//     title: "Support",
//     href: "/support",
//     icon: <HeartHandshake size={19} />
//   },
//   {
//     title: "Feedback",
//     href: "/feedback",
//     icon: <MessageCircleReply size={19} />
//   },
// ]
//
// export default function NavPanel({
//   items,
// }: {
//   items: {
//     title: string
//     url: string
//     icon?: LucideIcon
//     isActive?: boolean
//     items?: {
//       title: string
//       url: string
//     }[]
//   }[]
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Platform</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) => (
//           <Collapsible
//             key={item.title}
//             asChild
//             defaultOpen={item.isActive}
//             className="group/collapsible"
//           >
//             <SidebarMenuItem>
//               <CollapsibleTrigger asChild>
//                 <SidebarMenuButton tooltip={item.title}>
//                   {item.icon && <item.icon />}
//                   <span>{item.title}</span>
//                   <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                 </SidebarMenuButton>
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <SidebarMenuSub>
//                   {item.items?.map((subItem) => (
//                     <SidebarMenuSubItem key={subItem.title}>
//                       <SidebarMenuSubButton asChild>
//                         <a href={subItem.url}>
//                           <span>{subItem.title}</span>
//                         </a>
//                       </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                   ))}
//                 </SidebarMenuSub>
//               </CollapsibleContent>
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   )
// }
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartHandshake, Home, MessageCircleReply, User } from "lucide-react";
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
