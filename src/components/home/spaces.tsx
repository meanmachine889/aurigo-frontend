"use client";

import * as React from "react";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DialogForm } from "../dialog-form";

interface Spaces {
  name: string;
}

const spaces: Spaces[] = [
  { name: "Kitchen" },
  { name: "Bathroom" },
  { name: "Bedroom" },
  { name: "Living Room" },
  { name: "Office" },
  { name: "Garage" },
];

export default function Spaces() {
  return (
    <div className="w-full space-y-4 bg-background p-6 border-2 rounded-xl col-span-1">
      <div className="space-y-1 flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-normal tracking-tight">Spaces</h1>
          <p className="text-sm text-muted-foreground">
            Manage all the spaces where the work is being done.
          </p>
        </div>
        <DialogForm />
      </div>
      <div className="rounded-md border bg-[#1d1d1d] max-h-[200px] overflow-y-auto scrollbar-hide">
        <Table className="h-[100%] w-full">
          <TableBody>
            {spaces.map((space) => (
              <TableRow key={space.name}>
                <TableCell>{space.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
