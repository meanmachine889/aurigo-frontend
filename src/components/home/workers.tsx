"use client";

import Avatar from "boring-avatars";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { WorkerForm } from "../worker-form";

const team = [
  {
    name: "Sofia Davis",
    role: "Plumber",
    mobile: "1234567890",
    upi: "sofia@upi",
  },
  {
    name: "Jackson Lee",
    email: "p@example.com",
    role: "Carpenter",
    mobile: "1234567890",
    upi: "sofia@upi",
  },
  {
    name: "Isabella Nguyen",
    email: "n@example.com",
    role: "Electrician",
    mobile: "1234567890",
    upi: "sofia@upi",
  },
];

export function Workers() {
  return (
    <Card className="min-w-[500px] w-[100%] border-2">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-3">
            <CardTitle className="font-normal text-lg">Workers</CardTitle>
            <CardDescription>Workers in your project.</CardDescription>
          </div>
          <WorkerForm />
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="rounded-xl border bg-[#1d1d1d] max-h-[200px] overflow-y-auto scrollbar-hide">
          <Table className="border-none">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Work</TableHead>
                <TableHead className="">UPI Id</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((member, index) => (
                <TableRow key={index} className="">
                  <TableCell className="p-3 flex gap-3 items-center">
                    <Avatar name={member.name} variant="marble" size={30} />
                    {member.name}
                  </TableCell>
                  <TableCell className="p-3 ">{member.mobile}</TableCell>
                  <TableCell className="p-3 ">{member.role}</TableCell>
                  <TableCell className="p-3 ">{member.upi}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
