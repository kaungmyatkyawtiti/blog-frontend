import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { Edit } from "lucide-react";
import Image from "next/image";
import { formatRelative } from "date-fns"

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
      {/* profile image */}
      <div className="relative w-40 h-40">
        <Image
          src={user.image || "/default_user.png"}
          alt={user.username}
          sizes="auto"
          fill
          loading="eager"
          className="rounded-full object-cover shadow-md border border-border"
          priority
        />
      </div>

      {/* user info */}
      <div className="flex-1 w-full" >
        <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center mb-4 gap-4">
          <div className="self-center">
            <h1 className="text-2xl font-bold text-foreground leading-tight">
              {user.name}
            </h1>
            <p className="text-social-indigo mb-6 hover:underline cursor-pointer font-semibold">
              @{user.username}
            </p>
          </div>

          <Button
            className="bg-social-indigo hover:bg-social-indigo/90 text-white text-sm"
          >
            <Edit size={18} />
            Edit Profile
          </Button>
        </div>

        {
          !user.bio
            ? (
              <div>No bio provided yet.</div>
            ) : (
              < div className="bg-card border border-dashed border-border rounded-xl p-5">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">
                  About Me
                </h2>
                <p className="text-card-foreground/70 leading-relaxed text-[15px] font-medium">
                  {user.bio}
                </p>
              </div>
            )
        }

        {/* register since */}
        <div className="mt-5 text-sm text-social-indigo">
          <span className="font-semibold text-foreground/80">Member Since:</span>{" "}
          {formatRelative(user.created, new Date())}
        </div>
      </div>
    </div >
  )
}

