import { createClient } from "@supabase/auth-helpers-sveltekit";
const PUBLIC_SUPABASE_URL = "https://nqfwdsjogwqhkblczmkb.supabase.co";
const PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xZndkc2pvZ3dxaGtibGN6bWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4NzUyNzcsImV4cCI6MTk5MDQ1MTI3N30.YuDAlr53--uwQI_X2Y0nSR_VqK1GGyJDJHsSNQMSrR0";
createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);
