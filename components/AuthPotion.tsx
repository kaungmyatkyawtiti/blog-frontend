import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import NotiButton from "./NotiButton";

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
      <Link href={"/notis"}>
        <NotiButton />
      </Link>
    </div>
  )
}
