"use client";

import { useCustomers } from "@/hooks/use-customers";
import { CustomerStatusBadge } from "./customer-status-badge";
import { CustomerActions } from "./customer-actions";
import { formatPrice } from "@/lib/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CustomerList() {
  const { customers, isLoading } = useCustomers();

  if (isLoading) {
    return <div>Loading customers...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Last Order</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{customer.full_name}</div>
                  <div className="text-sm text-muted-foreground">
                    {customer.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <CustomerStatusBadge status={customer.status} />
              </TableCell>
              <TableCell>{customer.total_orders}</TableCell>
              <TableCell>{formatPrice(customer.total_spent)}</TableCell>
              <TableCell>
                {customer.last_order_date
                  ? new Date(customer.last_order_date).toLocaleDateString()
                  : "Never"}
              </TableCell>
              <TableCell>
                <CustomerActions customer={customer} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}