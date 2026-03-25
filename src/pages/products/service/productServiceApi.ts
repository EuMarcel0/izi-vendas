import supabase from "@/supabase/supabaseClient";
import { toast } from "react-toastify";

export type TProduct = {
  id: number;
  created_at: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  image_url: string;
  active: boolean;
  category_id: number;
  user_id: string;
};

export const createProduct = async (payloadData: Partial<TProduct>) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert(payloadData)
      .select("*")
      .single();

    if (error) {
      toast.error("Erro ao criar produto: " + error.message);
      return null;
    }

    return {
      data,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro inesperado ao criar produto";

    toast.error("Erro ao criar produto: " + errorMessage);

    return null;
  }
};
