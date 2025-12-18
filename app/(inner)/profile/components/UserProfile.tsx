"use client";

import { Button } from "@/components/ui/button";
import { useGetUserById } from "@/hooks/userHook";
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { Edit } from "lucide-react";
import Image from "next/image";
import { formatRelative } from "date-fns"

export default function UserProfile() {
  const user = useBoundStore(state => state.user);
  const { data: profile, isLoading, isError, error, refetch } = useGetUserById(user?.id!);

  if (isLoading) return <p>Loading profile...</p>;

  if (!profile) return <div>No profile</div>;

  if (isError) return <p>Error fetching profile: {error?.message}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* profile image */}
        <div>
          <Image
            width={160}
            height={160}
            src={"/logo.jpg"}
            alt={profile?.username}
            className="rounded-full object-cover shadow-lg border border-border"
          />
        </div>

        {/* user info */}
        <div className="flex-1 min-w-xl">
          <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center mb-4 gap-4">
            <div className="self-center">
              <h1 className="text-3xl font-bold text-foreground leading-tight">
                {profile?.name}
              </h1>
              <p className="text-lg text-social-indigo font-medium mb-6 hover:underline cursor-pointer">
                @{profile?.username}
              </p>
            </div>

            <Button
              className="bg-social-indigo hover:bg-social-indigo/90 text-white"
            >
              <Edit size={18} />
              Edit Profile
            </Button>
          </div>

          {/* bio */}
          <div className="bg-card border border-dashed border-border rounded-xl p-5">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">
              About Me
            </h2>
            <p className="text-card-foreground/70 leading-relaxed text-[15px] font-medium">
              {profile?.bio || "No bio provided yet."}
            </p>
          </div>

          {/* register since */}
          <div className="mt-5 text-sm text-social-indigo">
            <span className="font-semibold text-foreground/80">Member Since:</span>{" "}
            {formatRelative(profile?.created, new Date())}
          </div>
        </div>
      </div>
    </div>
  );
}
