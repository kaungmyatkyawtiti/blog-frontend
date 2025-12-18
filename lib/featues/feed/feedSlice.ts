import { StateCreator } from "zustand";
import { BoundStore } from "@/lib/hooks/useBoundStore";

export interface FeedState {
  showLatest: boolean;
}

export interface FeedActions {
  toggleShowLatest: (value: boolean) => void;
}

export type FeedSlice = FeedState & FeedActions;

export const initState: FeedState = {
  showLatest: true,
};

export const createFeedSlice: StateCreator<
  BoundStore,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  FeedSlice
> = (set) => ({
  ...initState,

  toggleShowLatest: (value: boolean) =>
    set((state) => { state.showLatest = value },
      undefined,
      "feed/toggleShowLatest"
    ),
});
