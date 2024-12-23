"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { DashboardNav } from "@/components/dashboard/nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session && event === "SIGNED_OUT") {
          router.push("/auth/signin");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}