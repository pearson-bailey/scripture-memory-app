import { createClient, Session } from "@supabase/supabase-js";

const supabaseUrl: string | undefined = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey: string | undefined =
  process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
