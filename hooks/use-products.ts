"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"] & {
  images: Database["public"]["Tables"]["product_images"]["Row"][];
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select(`
            *,
            images:product_images(*)
          `)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProducts(data as Product[]);
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, isLoading, error };
}