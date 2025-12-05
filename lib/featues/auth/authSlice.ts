import { BoundStore } from "@/lib/hooks/useBoundStore";
import { LoginResponse, LoginUser, RefreshResponse, ResponseUser } from "@/types/auth";
import { apiUrl } from "@/utils/env";
import { StateCreator } from "zustand";

export interface AuthState {
  accessToken: string;
  user: ResponseUser | null
}

export interface AuthActions {
  login: (user: LoginUser) => Promise<LoginResponse>;
  logout: () => void;
  refreshAccess: () => Promise<RefreshResponse>;
}

export type AuthSlice = AuthState & AuthActions

export const initState: AuthState = {
  accessToken: "",
  user: null
}

export const createAuthSlice: StateCreator<
  BoundStore,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  AuthSlice
> = (set) => ({
  ...initState,
  login: async (user: LoginUser) => {
    try {
      const response = await fetch(apiUrl + `/api/auth/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
        credentials: "include",
      });
      const json = await response.json();
      console.log("login response", response, "login json", json);
      const data = json.data;

      if (!response.ok) {
        set((state) => {
          state.accessToken = ""
          state.user = null
        },
          undefined,
          "auth/login"
        );
        throw new Error(json.error || "Invalid user");
      }
      set((state) => {
        state.accessToken = data.accessToken,
          state.user = data.user
      },
        undefined,
        "auth/login"
      );

      return data;
    } catch (err) {
      set((state) => {
        state.accessToken = "",
          state.user = null
      },
        undefined,
        "auth/login"
      );
      throw err;
    }
  },

  refreshAccess: async () => {
    try {
      const response = await fetch(apiUrl + `/api/auth/refresh`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
      });
      const json = await response.json();
      console.log("refresh accessToken response", response, "refresh accessToken json", json);
      const data = json.data;

      if (!response.ok) {
        set((state) => { state.accessToken = "" },
          undefined,
          "auth/refresh"
        );
        throw new Error(json.error || "Invalid user");
      }
      set((state) => { state.accessToken = data },
        undefined,
        "auth/refresh"
      );

      return data;
    } catch (err) {
      set((state) => { state.accessToken = "" },
        undefined,
        "auth/refresh"
      );
      throw err;
    }
  },

  logout: () => {
    set((state) => {
      state.accessToken = "",
        state.user = null
    },
      undefined,
      "auth/logout"
    );
  },
});
