import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://xyzcompany.supabase.co'
const supabaseKey = 'your-supabase-anon-key'

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
