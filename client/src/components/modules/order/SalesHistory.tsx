"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { Heading } from "@/components/ui/heading";
import { NMTable } from "@/components/ui/core/NMTable";
import { ColumnDef } from "@tanstack/react-table";
import { IOrder } from "@/type/order";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";
import { IMeta } from "@/type/meta";
import { getMySellOrders } from "@/service/order"; // ✅ Import করা হয়েছে

const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "_id",
    header: "Order ID",
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const products = row.getValue("products") as Array<{ product: { name: string }, quantity: number }>;
      return (
        <div className="space-y-1">
          {products.map((item, index) => (
            <div key={index} className="text-sm">
              {item.product.name} x {item.quantity}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = row.getValue("totalAmount") as number;
      return `$${amount.toFixed(2)}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
  },
  {
    accessorKey: "createdAt",
    header: "Order Date",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
];

const SalesHistory = () => {
  const [orders, setOrders] = useState<{ data: IOrder[]; meta: IMeta } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await getMySellOrders(); // ✅ Query Params বাদ দেওয়া হয়েছে
        if (response instanceof Error) {
          throw response;
        }
        setOrders(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Sales History" description="View your sales history and track orders" />
        </div>
        <Separator />
        <Card className="p-4">
          {isLoading ? (
            <p className="text-center">Loading...</p> // ✅ Loading state ব্যবহৃত হয়েছে
          ) : (
            <>
              <NMTable columns={columns} data={orders?.data || []} />
              <TablePagination totalPage={orders?.meta?.totalPage || 1} />
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SalesHistory;
