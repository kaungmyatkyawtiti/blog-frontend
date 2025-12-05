import { Bell, Plus } from "lucide-react";
import { Button } from "./ui/button";

export default function AdminPotion() {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="p-1 rounded-full"
      >
        <Plus size={24} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="p-1 rounded-full"
      >
        <Bell size={24} />
      </Button>
    </div>
  )
}
