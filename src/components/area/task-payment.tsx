/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Payment {
  id: string;
  upi: string;
  amount: number;
  description: string;
  quantity: number;
}

const payments: Payment[] = [
  {
    id: "1",
    upi: "ken99@yahoo.com",
    amount: 316.0,
    description: "Light Bulps",
    quantity: 2,
  },
  {
    id: "2",
    upi: "abe45@gmail.com",
    amount: 242.0,
    description: "Taps",
    quantity: 2,
  },
  {
    id: "3",
    upi: "monserrat44@gmail.com",
    amount: 837.0,
    description: "Shower heads",
    quantity: 1,
  },
  {
    id: "4",
    upi: "carmella@hotmail.com",
    amount: 721.0,
    description: "bricks",
    quantity: 100,
  },
];

export type TaskPaymentsProps = {
  id: string;
};

export default function TaskPayments({ id }: TaskPaymentsProps) {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [filterValue, setFilterValue] = React.useState("");

  const filteredPayments = payments.filter((payment) =>
    payment.upi.toLowerCase().includes(filterValue.toLowerCase())
  );

  const isAllSelected = selectedRows.length === filteredPayments.length;

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredPayments.map((payment) => payment.id));
    }
  };

  const toggleRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <div className="w-full space-y-4 bg-background">
      <div className="flex items-center justify-start gap-5">
        <Input
          placeholder="Filter upi id"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Receiver&apos;s UPI Id</TableHead>
              <TableHead className="">Amount</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.description}</TableCell>
                <TableCell>{payment.quantity}</TableCell>
                <TableCell>{payment.upi}</TableCell>
                <TableCell className="">
                  ${(payment.amount * payment.quantity).toFixed(2)}
                </TableCell>    
                <TableCell>
                  <Button className="bg-zinc-800 text-green-500">Approve</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
