import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/* eslint-disable no-unused-vars */
type TAuthStore = {
  session: Session | null;
  loggedUser: User | null;
  isLoading: boolean;
  setAuthData: (session: Session | null, loggedUser: User | null) => void;
  clearAuthData: () => void;
  setIsLoading: (isLoading: boolean) => void;
};
/* eslint-enable no-unused-vars */

export const useAuthStore = create<TAuthStore>()(
  persist(
    (set) => ({
      session: null,
      loggedUser: null,
      isLoading: true,
      setAuthData: (session, loggedUser) => set({ session, loggedUser }),
      clearAuthData: () => set({ session: null, loggedUser: null }),
      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "izi-vendas-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        session: state.session,
        loggedUser: state.loggedUser,
      }),
    },
  ),
);
