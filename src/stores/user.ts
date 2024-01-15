import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "@/types/api/entities/user.ts";
import { TokenResponse } from "@/types/api/token.ts";
import { UsersResponse } from "@/types/api/users.ts";
import axios, { AxiosResponse } from "axios";

interface UserStore {
  /** when null means it's in initial state */
  isAuthenticated: boolean | null;
  user: User | null;
  token: string | null;
  login: (formData: FormData) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<User | null>;
}

const API_URL = `${import.meta.env.VITE_HTTP_PROTO}://${import.meta.env.VITE_API_URL}`;

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: null,
      user: null,
      token: null,
      login: async (formData: FormData) => {
        const res = await fetch(`${API_URL}/token`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw Error(res.statusText);
        }

        const data = (await res.json()) as TokenResponse["POST"] | null | undefined;
        if (typeof data === "undefined" || data == null) {
          throw Error("API responded with an empty body!");
        }

        set(() => ({
          isAuthenticated: true,
          user: data.user,
          token: data.token,
        }));
      },
      logout: async () => {
        const token = get().token;

        const headers = new Headers();
        headers.set("Authorization", `Bearer ${token}`);

        const res = await fetch(`${API_URL}/token`, {
          method: "DELETE",
          headers,
        });

        if (!res.ok) {
          throw Error("Failed to logout");
        }

        set(() => ({
          token: null,
          user: null,
          isAuthenticated: null,
        }));
      },
      getUser: async () => {
        const token = get().token;
        if (token == null) {
          set(() => ({ isAuthenticated: false }));
          return null;
        }

        let res: AxiosResponse<UsersResponse["GET"], unknown>;
        try {
          res = await axios.get<UsersResponse["GET"]>(`${API_URL}/users/@me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (e) {
          set(() => ({ isAuthenticated: false }));
          throw e;
        }

        if (res.status < 200 || res.status > 299) {
          set(() => ({ isAuthenticated: false }));
          throw Error(res.statusText);
        }

        const user = res.data;
        if (typeof user === "undefined" || user == null) {
          throw Error("API responded with an empty body");
        }

        set(() => ({ user, isAuthenticated: true }));

        return user;
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
    },
  ),
);
