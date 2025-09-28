import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pobkjtqbqaqgpwkjagbt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvYmtqdHFicWFxZ3B3a2phZ2J0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTgyMjExMSwiZXhwIjoyMDcxMzk4MTExfQ.DV10qwdweiQGf551aRsGUWl6J-G0c6te4Hi1jf5o5-w'
export const supabase = createClient(supabaseUrl, supabaseKey)