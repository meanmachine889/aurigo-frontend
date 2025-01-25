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

interface Payment {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate?: string;
}

const payments: Payment[] = [
  {
    id: "1",
    name: "Tiles",
    description: "Laying tiles in the living room",
    status: "Completed",
    startDate: "2023-06-01",
    endDate: "2023-06-05",
  },
  {
    id: "2",
    name: "Paint",
    description: "Painting the walls",
    status: "In Progress",
    startDate: "2023-06-02",
    endDate: "",
  },
  {
    id: "3",
    name: "Furniture",
    description: "Assembling furniture",
    status: "In Progress",
    startDate: "2023-06-03",
    endDate: "",
  },
  {
    id: "4",
    name: "Curtains",
    description: "Hanging curtains",
    status: "Completed",
    startDate: "2023-06-04",
    endDate: "2023-06-08",
  },
];

export default function RecentTasks() {
  return (
    <div className="w-full space-y-4 bg-background p-6 border-2 rounded-xl">
      <div className="space-y-1">
        <h1 className="text-xl font-normal tracking-tight">Recent Tasks</h1>
        <p className="text-sm text-muted-foreground">
          Manage all the tasks in this area.
        </p>
      </div>
      <div className="rounded-md border bg-[#1d1d1d] max-h-[200px] overflow-y-auto scrollbar-hide">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <span>{payment.name}</span>
                </TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell>{payment.startDate}</TableCell>
                <TableCell className="">
                  {payment.endDate ? payment.endDate : "-"}
                </TableCell>
                <TableCell>{payment.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
