"use client";

import { Button } from "@/components/ui/button";
import Avatar from "boring-avatars";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const team = [
  {
    name: "Sofia Davis",
    email: "m@example.com",
    role: "Manager",
  },
  {
    name: "Jackson Lee",
    email: "p@example.com",
    role: "Customer",
  },
  {
    name: "Isabella Nguyen",
    email: "n@example.com",
    role: "Customer",
  },
];

export function Members() {
  return (
    <Card className="min-w-[500px]">
      <CardHeader>
        <CardTitle className="font-normal text-lg">Team Members</CardTitle>
        <CardDescription>
          Team members in your project.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {team.map((member) => (
          <div
            key={member.name}
            className="flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-4">
                <Avatar
                  name={member.email}
                  colors={[
                    "#fb6900",
                    "#f63700",
                    "#004853",
                    "#007e80",
                    "#00b9bd",
                  ]}
                />
              <div>
                <p className="text-sm font-medium leading-none">
                  {member.name}
                </p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              {member.role}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
