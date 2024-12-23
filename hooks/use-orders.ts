"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"] & {
  items: Database["public"]["Tables"]["order_items"]["Row"][];
};

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select(`
            *,
            items:order_items(*)
          `)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders(data as Order[]);
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return { orders, isLoading, error };
}