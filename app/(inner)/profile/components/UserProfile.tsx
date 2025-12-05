import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Image from "next/image"

interface User {
  id: number;
  name: string;
  username: string;
  image: string | null;
  bio: string | null;
  created: Date;
}

const mockUser: User = {
  id: 1,
  name: "Jane Doe",
  username: "janedoe_dev",
  image:
    "https://images.unsplash.com/photo-1517849845537-4d257902a963?auto=format&fit=crop&q=80&w=320",
  bio: "Full-stack developer with a passion for clean code and efficient design. Currently learning new things and loving Tailwind CSS.",
  created: new Date("2023-01-15T12:00:00Z"),
};

export default function UserProfile() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* profile image */}
        <div>
          <Image
            width={160}
            height={160}
            src={"/logo.jpg"}
            alt={`${mockUser.name} profile`}
            className="rounded-full object-cover shadow-lg border border-border"
          />
        </div>

        {/* user info */}
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center mb-4 gap-4">
            <div className="self-center">
              <h1 className="text-3xl font-bold text-foreground leading-tight">
                {mockUser.name}
              </h1>
              <p className="text-lg text-social-indigo font-medium mb-6 hover:underline cursor-pointer">
                @{mockUser.username}
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
              {mockUser.bio || "No bio provided yet."}
            </p>
          </div>

          {/* register since */}
          <div className="mt-5 text-sm text-green-500">
            <span className="font-semibold">Member Since:</span>{" "}
            {mockUser.created.getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
