import { Suspense } from "react";
import { OrderList } from "@/components/orders/order-list";
import { OrderStats } from "@/components/orders/order-stats";

export default function OrdersPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Orders</h1>
      
      <Suspense fallback={<div>Loading stats...</div>}>
        <OrderStats />
      </Suspense>
      
      <Suspense fallback={<div>Loading orders...</div>}>
        <OrderList />
      </Suspense>
    </div>
  );
}