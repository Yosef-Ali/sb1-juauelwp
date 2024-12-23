"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/lib/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];

interface OrderActionsProps {
  order: Order;
}

export function OrderActions({ order }: OrderActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function updateStatus(status: Database["public"]["Enums"]["order_status"]) {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", order.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
      
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => updateStatus("processing")}
          disabled={isLoading}
        >
          Mark as Processing
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateStatus("shipped")}
          disabled={isLoading}
        >
          Mark as Shipped
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateStatus("delivered")}
          disabled={isLoading}
        >
          Mark as Delivered
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateStatus("cancelled")}
          disabled={isLoading}
          className="text-red-600"
        >
          Cancel Order
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}