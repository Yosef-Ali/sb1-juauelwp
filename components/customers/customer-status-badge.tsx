import { Badge } from "@/components/ui/badge";
import { type Database } from "@/lib/supabase/types";

type CustomerStatus = Database["public"]["Enums"]["customer_status"];

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  blocked: "bg-red-100 text-red-800",
} as const;

interface CustomerStatusBadgeProps {
  status: CustomerStatus;
}

export function CustomerStatusBadge({ status }: CustomerStatusBadgeProps) {
  return (
    <Badge variant="secondary" className={statusColors[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}