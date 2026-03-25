import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

import supabase from "@/supabase/supabaseClient";
import {
  handleSignIn,
  handleSignOut,
  handleSignUp,
  type TSignUpData,
} from "@/pages/login/service/loginServiceApi";
import { useAuthStore } from "@/stores/authStore";

type TAuthProviderProps = {
  children: ReactNode;
};

function useProvideAuth() {
  const session = useAuthStore((state) => state.session);
  const loggedUser = useAuthStore((state) => state.loggedUser);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const clearAuthData = useAuthStore((state) => state.clearAuthData);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const setIsInitializing = useAuthStore((state) => state.setIsInitializing);

  const refreshSession = useCallback(async () => {
    setIsInitializing(true);

    const { data, error } = await supabase.auth.getSession();

    if (error) {
      clearAuthData();
      setIsInitializing(false);
      return;
    }

    setAuthData(data.session, data.session?.user ?? null);
    setIsInitializing(false);
  }, [clearAuthData, setAuthData, setIsInitializing]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);

    const authData = await handleSignIn(email, password);

    if (!authData) {
      setIsLoading(false);
      return false;
    }

    setAuthData(authData.session, authData.user);
    setIsLoading(false);
    return true;
  };

  const handleRegister = async (payloadData: TSignUpData) => {
    setIsLoading(true);

    const authData = await handleSignUp(payloadData);

    if (!authData) {
      setIsLoading(false);
      return false;
    }

    setAuthData(authData.session, authData.user);
    setIsLoading(false);
    return true;
  };

  const handleLogout = async () => {
    setIsLoading(true);

    const didLogout = await handleSignOut();

    if (didLogout) {
      clearAuthData();
    }

    setIsLoading(false);
    return didLogout;
  };

  useEffect(() => {
    const syncSession = async () => {
      await refreshSession();
    };

    void syncSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setAuthData(nextSession, nextSession?.user ?? null);
      setIsInitializing(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshSession, setAuthData, setIsInitializing]);

  return {
    session,
    loggedUser,
    isAuthenticated: !!session,
    isLoading,
    isInitializing,
    handleLogin,
    handleRegister,
    handleLogout,
    refreshSession,
  };
}

type TAuthContextData = ReturnType<typeof useProvideAuth>;

const AuthContext = createContext<TAuthContextData | null>(null);

export function AuthProvider({ children }: TAuthProviderProps) {
  const value = useProvideAuth();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de AuthProvider");
  }

  return context;
}
