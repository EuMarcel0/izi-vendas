import type { Session, User } from "@supabase/supabase-js";

import supabase from "@/supabase/supabaseClient";
import { toast } from "react-toastify";

export type TSignUpData = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  dateOfBirth: string;
};

export type TAuthResult = {
  session: Session | null;
  user: User | null;
};

export const handleSignUp = async (payloadData: TSignUpData) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: payloadData.email,
      password: payloadData.password,
      phone: payloadData.phone,
      options: {
        data: {
          full_name: payloadData.fullName,
          date_birth: payloadData.dateOfBirth
            ? new Date(payloadData.dateOfBirth)
            : null,
        },
      },
    });

    if (error) {
      toast.error("Erro ao criar conta: " + error.message);
      return null;
    }

    const { error: insertError } = await supabase.from("users").insert({
      user_id: data.user?.id,
      full_name: payloadData.fullName,
      phone: payloadData.phone,
      email: payloadData.email,
      date_birth: payloadData.dateOfBirth
        ? new Date(payloadData.dateOfBirth)
        : null,
    });

    if (insertError) {
      toast.error("Erro ao salvar dados do usuário: " + insertError.message);
      return null;
    }

    return {
      session: data.session,
      user: data.user,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro inesperado ao criar conta";

    toast.error("Erro ao criar conta: " + errorMessage);

    return null;
  }
};

export const handleSignIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Erro ao fazer login: " + error.message);
      return null;
    }

    return {
      session: data.session,
      user: data.user,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro inesperado ao fazer login";

    toast.error("Erro ao fazer login: " + errorMessage);

    return null;
  }
};

export const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Erro ao sair: " + error.message);
      return false;
    }

    return true;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro inesperado ao sair";

    toast.error("Erro ao sair: " + errorMessage);

    return false;
  }
};

export const handleForgotPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      toast.error("Erro ao enviar recuperação de senha: " + error.message);
      return false;
    }

    toast.success("Enviamos as instruções de recuperação para o seu email");
    return true;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro inesperado ao recuperar senha";

    toast.error("Erro ao enviar recuperação de senha: " + errorMessage);

    return false;
  }
};
