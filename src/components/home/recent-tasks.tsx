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

interface Task {
  _id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate?: string;
}

export default function RecentTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract projectId from URL
  const pathname = window.location.pathname;
  const segments = pathname.split("/");
  const projectId = segments[segments.length - 1];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        // Fetch project details to get all task IDs
        const response = await fetch(
          `http://localhost:5000/api/project/${projectId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const projectAreas = data.project.area || [];
          const allTaskIds = projectAreas.flatMap((area: any) => area.tasks);

          // Fetch details for each task using their IDs
          const taskPromises = allTaskIds.map((taskId: string) =>
            fetch(`http://localhost:5000/api/task/${taskId}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }).then((res) => (res.ok ? res.json() : null))
          );

          const taskDetails = await Promise.all(taskPromises);
          const recentTasks = taskDetails
            .filter((task): task is { task: Task } => task !== null) // Filter out null responses
            .map((taskData) => taskData.task) // Extract `task` from the response object
            .sort((a, b) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            )
            .slice(0, 5); // Get the 5 most recent tasks

          setTasks(recentTasks);
        } else {
          setError("Failed to fetch project details.");
        }
      } catch (error) {
        setError("An error occurred while fetching tasks.");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

  if (loading) {
    return <div>Loading recent tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full space-y-4 bg-background p-6 border-2 rounded-xl">
      <div className="space-y-1">
        <h1 className="text-xl font-normal tracking-tight">Recent Tasks</h1>
        <p className="text-sm text-muted-foreground">
          Manage all the tasks in this project.
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.startDate}</TableCell>
                <TableCell>
                  {task.endDate ? task.endDate : "-"}
                </TableCell>
                <TableCell>{task.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
