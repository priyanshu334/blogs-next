// utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Use the new NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY if your project 
  // has migrated, otherwise NEXT_PUBLIC_SUPABASE_ANON_KEY works too.
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}