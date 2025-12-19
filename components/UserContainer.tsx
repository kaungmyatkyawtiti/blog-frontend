"use client";

import { useIsMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";
import Image from 'next/image';
import FollowButton from "./FollowButton";

interface UserContainerProps {
  user: User;
}

const UserContainer = ({ user }: UserContainerProps) => {
  const isMobile = useIsMobile();

  return (
    <div
      className="flex items-start justify-between p-4 cursor-pointer border-b border-border last:border-b-0 hover:bg-card hover-effect gap-6"
    >
      <div
        className={cn(
          'flex gap-4 items-center',
          isMobile && "flex-col items-start"
        )}
      >
        <Image
          src={user.image || "/default_user.png"}
          alt="avatar"
          width={40}
          height={40}
          className="object-cover rounded-full overflow-hidden"
        />
        <div className="space-y-2">
          <p className="font-semibold hover:text-social-indigo hover:underline">{user.username}</p>
          <p className="text-sm text-foreground/70">{user.bio}</p>
        </div>
      </div>

      <FollowButton user={user} />
      {/* <button */}
      {/*   className='bg-social-indigo font-medium px-2 py-1 rounded-lg text-sm' */}
      {/* > */}
      {/*   follow */}
      {/* </button> */}
    </div>
  )
}

export default UserContainer;
