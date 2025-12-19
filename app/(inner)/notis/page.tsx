"use client";

import BackButton from "@/components/BackButton";
import NotiCard from "@/components/NotiCard";
import { useGetAllNotis, useMutationReadAllNotis } from "@/hooks/notiHook";

export default function NotiPage() {
  const { data, isLoading, isError, error, refetch } = useGetAllNotis();
  console.log("data", data);

  const { mutateAsync: readAllNotis } = useMutationReadAllNotis();

  const handleReadAllNotis = async () => {
    try {
      await readAllNotis();
      console.log("Read all notis success");
    } catch (err) {
      console.log("Read all notis failed", err);
    }
  }

  if (!data) return <div>No data</div>

  return (
    <div className="px-4 mx-auto my-10 w-full max-w-3xl">
      <div className="flex items-center mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>
      <div className="flex justify-end mb-4">
        <button
          className="text-[13px] font-medium px-4 py-2 rounded-full border border-social-indigo 
          bg-social-indigo text-white hover:scale-110 hover-effect"
          onClick={handleReadAllNotis}
        >
          Mark all read
        </button>
      </div>
      {
        data.map(noti =>
          <NotiCard key={noti.id} noti={noti} />
        )
      }
    </div>
  )
}
