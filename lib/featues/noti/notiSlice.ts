import { BoundStore } from "@/lib/hooks/useBoundStore";
import { StateCreator } from "zustand";

export interface NotiState {
  message: string;
}

export interface NotiActions {
  showNoti: (msg: string) => void;
  hideNoti: () => void;
}

export type NotiSlice = NotiState & NotiActions

export const initState: NotiState = {
  message: ""
}

export const createNotiSlice: StateCreator<
  BoundStore,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  NotiSlice
> = (set) => ({
  ...initState,
  showNoti: (msg: string) => {
    set((state) => { state.message = msg },
      undefined,
      "noti/showNoti"
    );
  },
  hideNoti: () => {
    set((state) => { state.message = "" },
      undefined,
      "noti/hideNoti"
    );
  },
});
