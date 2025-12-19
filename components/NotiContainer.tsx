"use client";

import { Noti } from "@/types/noti";
import NotiCard from "./NotiCard";

interface NotiContainerProps {
  noti: Noti;
}

export default function NotiContainer({ noti }: NotiContainerProps) {

  return (
    <div className="flex flex-col">
      <button
        className="capitalize"
      >
        mark all as read
      </button>
      <button>
        <NotiCard noti={noti} />
      </button>
    </div>
  );
}
