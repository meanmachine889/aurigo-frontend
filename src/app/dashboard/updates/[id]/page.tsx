/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UpdatesComponent from "@/components/updates/updates";

export type PageProps = {
  params: {
    id: string; // Format: projectId-areaId
  };
};

interface Task {
  _id: string;
  name: string;
}

export default function Page({ params }: PageProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [projectId, areaId] = params.id.split("-"); // Extract projectId and areaId

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/task/${projectId}/areas/${areaId}/tasks`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTasks(data.tasks || []);
        } else {
          setError("Failed to fetch tasks.");
        }
      } catch (err) {
        setError("Error fetching tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId, areaId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 w-full">
      <div className="space-y-1 p-3">
        <h1 className="text-2xl font-normal tracking-tight">Updates</h1>
      </div>
      <Tabs defaultValue={tasks[0]?._id || ""} className="p-3">
        <TabsList className="grid w-fit grid-cols-3 min-h-fit mb-9">
          {tasks.map((task) => (
            <TabsTrigger key={task._id} className="font-normal" value={task._id}>
              {task.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {tasks.map((task) => (
          <TabsContent key={task._id} value={task._id}>
            <UpdatesComponent taskId={task._id} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
