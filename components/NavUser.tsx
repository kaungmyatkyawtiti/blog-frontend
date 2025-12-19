"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogIn,
  LogOut,
  UserRoundPen,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import NavUserSkeleton from "./NavUserSkeleton";

export default function NavUser() {
  const { isMobile } = useSidebar();
  const user = useBoundStore((state) => state.user);
  const status = useBoundStore(state => state.status)
  console.log("status", status, "user", user)
  const isAuth = status === "authenticated";
  if (status === "loading") return <NavUserSkeleton />

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-accent data-[state=open]:bg-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-9 w-9 rounded-full">
                <AvatarImage
                  src={user?.image ?? "/default_user.png"}
                  alt={isAuth ? user?.name : "Guest"}
                />
                {/* <AvatarFallback className="rounded-full"> */}
                {/*   {user ? "ME" : "G"} */}
                {/* </AvatarFallback> */}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {isAuth ? user?.name : "Guest"}
                </span>
                <span className="truncate text-xs">
                  {isAuth ? user?.username : "Please log in"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {
              isAuth ?
                (
                  <>
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage src="logo.jpg" alt={user?.name} />
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-medium">{user?.name}</span>
                          <span className="truncate text-xs">{user?.username}</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link href="/profile">
                        <DropdownMenuItem>
                          <BadgeCheck />
                          Account
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>
                        <Bell />
                        Notifications
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut />
                      Log out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuGroup>
                    <Link href="/login">
                      <DropdownMenuItem>
                        <LogIn />
                        Login
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/register">
                      <DropdownMenuItem>
                        <UserRoundPen />
                        Register
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                )
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
