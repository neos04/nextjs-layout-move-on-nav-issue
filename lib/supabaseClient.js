// import { createClient } from '@supabase/supabase-js'

import { createSupabaseBrowserClient } from "./supabase/client";



const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
const supabase = createSupabaseBrowserClient(supabaseUrl, supabaseKey)

export default supabase;