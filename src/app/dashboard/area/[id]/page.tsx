/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MainInfo from "@/components/area/main-info";
import PaymentsTable from "@/components/area/paymets-table";
import TaskPayments from "@/components/area/task-payment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  const pathname = usePathname(); // Access the current URL path
  const [tasks, setTasks] = useState<{ _id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Extract projectId and areaId from the dynamic route
  const [projectId, areaId] = pathname
    ?.split("/")
    ?.pop()
    ?.split("-") || [];

  useEffect(() => {
    if (!projectId || !areaId) {
      console.error("Invalid URL: Missing projectId or areaId");
      setLoading(false);
      return;
    }

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
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId, areaId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 w-full flex flex-col gap-2">
      <MainInfo />
      <PaymentsTable />
      <div className="space-y-1 p-3">
        <h1 className="text-2xl font-normal tracking-tight">
          Transaction Requests
        </h1>
      </div>
      <Tabs defaultValue={tasks[0]?._id || ""} className="p-3">
        <TabsList className="grid w-fit grid-cols-3 min-h-fit mb-9">
          {tasks.map((task) => (
            <TabsTrigger key={task._id} value={task._id} className="font-normal">
              {task.name}
            </TabsTrigger>
            <TabsTrigger className="font-normal" value="2">
              Plumbing
            </TabsTrigger>
            <TabsTrigger className="font-normal" value="3">
              Furnituring
            </TabsTrigger>
          </TabsList>
          <TabsContent className="p-0" value="1">
            <TaskPayments id="1" />
          </TabsContent>
          <TabsContent value="2">
            <TaskPayments id="2" />
          </TabsContent>
          <TabsContent value="3">
            <TaskPayments id="3" />
          </TabsContent>
        </Tabs>
=======
      <div className="space-y-1 p-3">
        <h1 className="text-2xl font-normal tracking-tight">
          Transaction Requests
        </h1>
>>>>>>> 7763c64457d31a92995111ff9ec28d182e6196f3
      </div>
      <Tabs defaultValue={tasks[0]?._id || ""} className="p-3">
        <TabsList className="grid w-fit grid-cols-3 min-h-fit mb-9">
          {tasks.map((task) => (
            <TabsTrigger key={task._id} value={task._id} className="font-normal">
              {task.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {tasks.map((task) => (
          <TabsContent key={task._id} value={task._id}>
            <TaskPayments id={task._id} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
