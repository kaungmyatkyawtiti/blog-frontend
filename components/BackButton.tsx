import { ArrowLeftIcon } from "lucide-react";

export default function BackButton() {
  return (
    <button
      className="mr-4 text-foreground/80 hover:text-foreground hover-effect"
    >
      <ArrowLeftIcon size={26} />
    </button>
  )
}

