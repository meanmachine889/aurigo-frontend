"use client";

import { useEffect, useState } from "react";
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

interface TeamMember {
  name: string;
  email: string;
  role: string;
  mobile: string;
}

export function Members() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const pathname = window.location.pathname;
        const segments = pathname.split("/");
        const projectId = segments[segments.length - 1];

        const response = await fetch(`http://localhost:5000/api/project/${projectId}/members`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTeam([
  {
    name: data.constructor.name,
    email: data.constructor.email,
    role: data.constructor.role || "Constructor", // Default role for constructor
    mobile: data.constructor.mobile || "N/A", // Default mobile if not specified
  },
  ...data.members.map((member: any) => ({
    name: member.name,
    email: member.email,
    role: member.role || "Member", // Default role if not specified
    mobile: member.mobile || "N/A", // Default mobile if not specified
  })),
]);

        } else {
          throw new Error("Failed to fetch team members");
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
        setError("Failed to load team members. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return <div>Loading team members...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

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
                  <TableCell className="p-3">{member.email}</TableCell>
                  <TableCell className="p-3">{member.mobile}</TableCell>
                  <TableCell className="p-3">{member.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
