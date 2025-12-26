import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  }

  return (
    <button
      className="
      mr-4 rounded-full p-2
      text-foreground/80
      hover:bg-foreground/10 active:bg-foreground/20 hover-effect"
      onClick={handleBack}
    >
      <ArrowLeftIcon size={26} />
    </button>
  )
}
