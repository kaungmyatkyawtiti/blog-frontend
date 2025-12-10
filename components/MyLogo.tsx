"use client";

import { useIsMobile } from "@/hooks/useMobile";
import Image from "next/image";

export default function MyLogo() {
  const isMobile = useIsMobile();

  return (
    <div
      className="flex items-center"
    >
      <Image
        src="/logo.jpg"
        alt="Logo"
        width={35}
        height={35}
        className="object-cover rounded-full"
      />
      {
        !isMobile &&
        <h2
          className="ml-3 text-xl font-bold whitespace-nowrap text-foreground"
        >
          Kiri's News
        </h2>
      }
    </div>
  );
}
