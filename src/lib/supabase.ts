import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Photo = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  show_on_home: boolean;
  show_in_recent: boolean;
  created_at: string;
};
