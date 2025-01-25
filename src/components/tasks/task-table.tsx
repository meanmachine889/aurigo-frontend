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
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

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

export default function TasksTable() {
  return (
    <div className="w-full space-y-4 bg-background p-3">
      <div className="space-y-1">
        <h1 className="text-2xl font-normal tracking-tight">Tasks</h1>
        <p className="text-sm text-muted-foreground">
          Manage all the tasks in this area.
        </p>
      </div>
      <div className="rounded-md border">
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
