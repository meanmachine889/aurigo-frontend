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
import { TeamForm } from "../team-form";

const team = [
  {
    name: "Sofia Davis",
    email: "m@example.com",
    role: "Manager",
    mobile: "1234567890",
  },
  {
    name: "Jackson Lee",
    email: "p@example.com",
    role: "Customer",
    mobile: "1234567890",
  },
  {
    name: "Isabella Nguyen",
    email: "n@example.com",
    role: "Customer",
    mobile: "1234567890",
  },
  {
    name: "Isabella Nguyen",
    email: "n@example.com",
    role: "Customer",
    mobile: "1234567890",
  },
];

export function Members() {
  return (
    <Card className="min-w-[500px] w-[100%] col-span-2">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex flex-col gap-3">
            <CardTitle className="font-normal text-lg">Team Members</CardTitle>
            <CardDescription>Team members in your project.</CardDescription>
          </div>
          <TeamForm />
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="rounded-xl border max-h-[210px] overflow-scroll scrollbar-hide bg-[#1d1d1d]">
          <Table className="border-none">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((member) => (
                <TableRow key={member.email} className="">
                  <TableCell className="p-3 flex gap-3 items-center">
                    <Avatar name={member.email} variant="marble" size={30} />
                    {member.name}
                  </TableCell>
                  <TableCell className="p-3 ">{member.email}</TableCell>
                  <TableCell className="p-3 ">{member.mobile}</TableCell>
                  <TableCell className="p-3 ">{member.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
