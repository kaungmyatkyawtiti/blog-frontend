import { Skeleton } from "./ui/skeleton";

export default function AuthPortionSkeletion() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="w-10 h-10 rounded-full" />

      <Skeleton className="w-10 h-10 rounded-full" />
    </div>
  )
}

