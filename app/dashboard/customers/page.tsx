import { Suspense } from "react";
import { CustomerList } from "@/components/customers/customer-list";
import { CustomerStats } from "@/components/customers/customer-stats";

export default function CustomersPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Customers</h1>
      
      <Suspense fallback={<div>Loading stats...</div>}>
        <CustomerStats />
      </Suspense>
      
      <Suspense fallback={<div>Loading customers...</div>}>
        <CustomerList />
      </Suspense>
    </div>
  );
}