import { Avatar } from "./ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export default function NavUserSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <Avatar className="h-9 w-9 rounded-full">
            <Skeleton className="h-9 w-9 rounded-full" />
          </Avatar>
          <div className="grid flex-1 gap-1 ml-2">
            <Skeleton className="h-4 w-26" />
            <Skeleton className="h-3 w-36" />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
