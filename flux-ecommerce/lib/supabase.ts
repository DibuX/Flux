import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create a singleton for client-side usage
let clientSingleton: ReturnType<typeof createClient>

export function getClientSupabase() {
  if (clientSingleton) return clientSingleton

  clientSingleton = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  )

  return clientSingleton
}

// Create a singleton for server-side usage
let serverSingleton: ReturnType<typeof createClient>

export function getServerSupabase() {
  if (serverSingleton) return serverSingleton

  serverSingleton = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_ANON_KEY as string, {
    auth: {
      persistSession: false,
    },
  })

  return serverSingleton
}

