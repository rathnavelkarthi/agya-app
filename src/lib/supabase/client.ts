import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gzplctrvztabkfkcicnp.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6cGxjdHJ2enRhYmtma2NpY25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3OTExNjYsImV4cCI6MjA4NzM2NzE2Nn0.hZt8eRvsR7UfE6-l_hFDTc7kaHd2BpeYXfed3FHlB2Y";

  return createBrowserClient(url, key);
}
