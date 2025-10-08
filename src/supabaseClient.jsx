import { createClient } from '@supabase/supabase-js'

const API_KEY = import.meta.env.VITE_APP_SUPABASE_KEY;

const supabaseUrl = 'https://pobkjtqbqaqgpwkjagbt.supabase.co'
const supabaseKey = API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey)