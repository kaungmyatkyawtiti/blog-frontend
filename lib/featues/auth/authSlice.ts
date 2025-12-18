import { BoundStore } from "@/lib/hooks/useBoundStore";
import { AuthUserResponse, LoginUser, RegisterUser } from "@/types/auth";
import { apiUrl } from "@/utils/env";
import { StateCreator } from "zustand";

export type AuthStatus = "loading" | "guest" | "authenticated";

export interface AuthState {
  user: AuthUserResponse | null
  status: AuthStatus;
}

export interface AuthActions {
  authRegister: (user: RegisterUser) => Promise<AuthUserResponse>;
  login: (user: LoginUser) => Promise<AuthUserResponse>;
  refreshAccess: () => Promise<void>;
  logout: () => void;
  setUser: (user: AuthUserResponse) => void;
}

export type AuthSlice = AuthState & AuthActions

export const initState: AuthState = {
  user: null,
  status: "loading",
}

export const createAuthSlice: StateCreator<
  BoundStore,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  AuthSlice
> = (set) => ({
  ...initState,
  authRegister: async (user: RegisterUser) => {
    try {
      const response = await fetch(apiUrl + `/api/auth/register`, {
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
          state.user = null,
            state.status = "guest"
        },
          undefined,
          "auth/register"
        );
        throw new Error(json.error || "Invalid user");
      }

      set((state) => {
        state.user = data
        state.status = "authenticated"
      },
        undefined,
        "auth/register"
      );
      return data;

    } catch (err) {
      set((state) => {
        state.user = null,
          state.status = "guest"
      },
        undefined,
        "auth/register"
      );
      throw err;
    }
  },


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
          state.user = null,
            state.status = "guest";
        },
          undefined,
          "auth/login"
        );
        throw new Error(json.error || "Invalid user");
      }

      set((state) => {
        state.user = data,
          state.status = "authenticated"
      },
        undefined,
        "auth/login"
      );

      return data;
    } catch (err) {
      set((state) => {
        state.user = null,
          state.status = "guest";
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

      if (!response.ok) {
        set((state) => {
          state.user = null,
            state.status = "guest"
        },
          undefined,
          "auth/refresh"
        );
        throw new Error(json.error || "Invalid user");
      }
    } catch (err) {
      set((state) => {
        state.user = null,
          state.status = "guest"
      },
        undefined,
        "auth/refresh"
      );
      throw err;
    }
  },

  logout: () => {
    set((state) => {
      state.user = null,
        state.status = "guest"
    },
      undefined,
      "auth/logout"
    );
  },

  setUser: (user: AuthUserResponse) => {
    set((state) => {
      state.user = user,
        state.status = "authenticated"
    },
      undefined,
      "auth/verifyUser"
    )
  }
});
