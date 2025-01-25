"use client";

import { useEffect, useState } from "react";
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
import { TaskForm } from "../task-form";

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate?: string;
}

export default function TasksTable() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const [filterValue, setFilterValue] = useState("");

  const fetchTasks = async (page: number) => {
    const pathname = window.location.pathname;
    const segments = pathname.split("/");
    const lastSegment = segments[segments.length - 1];
    const [projectId, areaId] = lastSegment.split("-");

    if (!projectId || !areaId) {
      console.error("Invalid URL: Missing projectId or areaId");
      return;
    }

    try {
      const response = await fetch(
        `https://v0ck2c87-5000.inc1.devtunnels.ms/api/task/${projectId}/areas/${areaId}/tasks?page=${page}&limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
        setTotalTasks(data.pagination.totalTasks);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full space-y-4 bg-background p-3 border-2 rounded-xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-normal tracking-tight">Tasks</h1>
        <p className="text-sm text-muted-foreground">
          Manage all the tasks in this area.
        </p>
      </div>
      <div className="flex items-center justify-start gap-5">
        <Input
          placeholder="Filter tasks by name..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <TaskForm />
      </div>
      {filteredTasks.length ? <><div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.startDate}</TableCell>
                <TableCell>{task.endDate || "-"}</TableCell>
                <TableCell>{task.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) =>
                prev * 5 < totalTasks ? prev + 1 : prev
              )
            }
            disabled={currentPage * 5 >= totalTasks}
          >
            Next
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Showing {tasks.length} of {totalTasks} tasks.
        </p>
      </div></> : <div className="text-center text-muted-foreground">No tasks found.</div>}
    </div>
  );
}
