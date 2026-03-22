import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_API_SUPABASE, import.meta.env.VITE_PUBLISHABLE_KEY);

export default supabase;
