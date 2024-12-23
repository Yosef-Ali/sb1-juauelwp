import { Badge } from "@/components/ui/badge";
import { type Database } from "@/lib/supabase/types";

type OrderStatus = Database["public"]["Enums"]["order_status"];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
} as const;

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <Badge variant="secondary" className={statusColors[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}