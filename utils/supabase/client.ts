"use client";

import { createBrowserClient } from "@supabase/ssr";

// supabase api 를 사용하기 위한 설정
export const createBrowserSupabaseClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
