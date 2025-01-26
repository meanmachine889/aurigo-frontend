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
import { WorkerForm } from "../worker-form";

interface Worker {
  _id: string;
  name: string;
  role: string;
  mobile: string;
  upiid: string;
}

export function Workers({ projectId }: { projectId?: string }) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [workers1, setWorkers1] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      const endpoint =`http://localhost:5000/api/workers/${projectId}`
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setWorkers(data.workers.map((worker: any) => ({ ...worker, mobile: worker.phone })));
      } else {
        setError("Failed to fetch workers");
      }
    } catch (error) {
      setError("Error fetching workers");
    } finally {
      setLoading(false);
    }
  };
  const fetchWorkers1 = async () => {
    try {
      setLoading(true);
      const endpoint ="http://localhost:5000/api/workers";
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setWorkers1(data.workers.map((worker: any) => ({ ...worker, mobile: worker.phone })));
      } else {
        setError("Failed to fetch workers");
      }
    } catch (error) {
      setError("Error fetching workers");
    } finally {
      setLoading(false);
    }
  };

  const addWorker = async (newWorker: Worker) => {
    try {
      const response = await fetch("http://localhost:5000/api/workers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ ...newWorker, projectId }),
      });

      if (response.ok) {
        const data = await response.json();
        setWorkers((prevWorkers) => [...prevWorkers, data.worker]);
      } else {
        setError("Failed to add worker");
      }
    } catch (error) {
      setError("Error adding worker");
    }
  };

  useEffect(() => {
    fetchWorkers();
    fetchWorkers1();
  }, [projectId]);

  if (loading) {
    return <div>Loading workers...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="min-w-[500px] w-[100%] border-2">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-3">
            <CardTitle className="font-normal text-lg">Workers</CardTitle>
            <CardDescription>Workers in your project.</CardDescription>
          </div>
          <WorkerForm onAddWorker={addWorker} existingWorkers={workers1} />
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
              {workers.map((worker, index) => (
                <TableRow key={index} className="p-3">
                  <TableCell className="p-3 flex gap-3 items-center">
                    <Avatar name={worker.name} variant="marble" size={30} />
                    {worker.name}
                  </TableCell>
                  <TableCell className="p-3">{worker.mobile}</TableCell>
                  <TableCell className="p-3">{worker.role}</TableCell>
                  <TableCell className="p-3">{worker.upiid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
