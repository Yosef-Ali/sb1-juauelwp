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
import { MoreHorizontal, Mail, Ban, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/lib/supabase/types";

type Customer = Database["public"]["Tables"]["profiles"]["Row"];

interface CustomerActionsProps {
  customer: Customer;
}

export function CustomerActions({ customer }: CustomerActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function updateStatus(status: Database["public"]["Enums"]["customer_status"]) {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({ status })
        .eq("id", customer.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Customer status updated successfully",
      });
      
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update customer status",
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
          onClick={() => updateStatus("active")}
          disabled={isLoading}
          className="text-green-600"
        >
          <UserCheck className="h-4 w-4 mr-2" />
          Mark as Active
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateStatus("blocked")}
          disabled={isLoading}
          className="text-red-600"
        >
          <Ban className="h-4 w-4 mr-2" />
          Block Customer
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => window.location.href = `mailto:${customer.email}`}
        >
          <Mail className="h-4 w-4 mr-2" />
          Send Email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}