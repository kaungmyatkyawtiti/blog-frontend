import AdminPotion from "./AdminPotion";
import { ModeToggle } from "./ModeToggle";
import MyLogo from "./MyLogo";
import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
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
          <AdminPotion />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

