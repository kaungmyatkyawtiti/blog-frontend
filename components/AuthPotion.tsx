import { Bell, Plus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function AuthPotion() {
  return (
    <div className="flex items-center gap-2">
      <Link href={"/add"}>
        <Button
          variant="ghost"
          size="icon"
          className="p-1 rounded-full"

        >
          <Plus size={24} />
        </Button>

      </Link>

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
