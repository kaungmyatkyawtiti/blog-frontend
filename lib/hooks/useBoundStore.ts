import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "../featues/auth/authSlice";
import { createNotiSlice, NotiSlice } from "../featues/noti/notiSlice";

export type BoundStore = AuthSlice & NotiSlice;

export const useBoundStore = create<BoundStore>()(
  devtools(
    immer((...args) => ({
      ...createAuthSlice(...args),
      ...createNotiSlice(...args),
    }))
  )
);
