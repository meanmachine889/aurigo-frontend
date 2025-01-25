"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DialogForm } from "../dialog-form";

interface Space {
  name: string;
  _id: string;
}

export default function Spaces() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaces = async () => {
      // Extract projectId from the URL
      const pathname = window.location.pathname;
      const segments = pathname.split("/");
      const projectId = segments[segments.length - 1]; // Assumes projectId is the last segment of the URL

      console.log("Project ID:", projectId);

      if (!projectId) {
        console.error("Invalid URL: Missing projectId");
        setLoading(false);
        return;
      }

      try {
        // Fetch project details from the backend
        const response = await fetch(`https://v0ck2c87-5000.inc1.devtunnels.ms/api/project/${projectId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSpaces(data.project.area || []);
        } else {
          console.error("Failed to fetch spaces");
        }
      } catch (error) {
        console.error("Error fetching spaces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  if (loading) {
    return <div>Loading spaces...</div>;
  }

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
              <TableRow key={space._id}>
                <TableCell>{space.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
