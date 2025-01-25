"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Task {
  id: string;
  status: string; // "completed" or "pending"
}

export default function MainInfo() {
  const [areaName, setAreaName] = useState("");
  const [progress, setProgress] = useState(100); // Default progress to 100%
  const [taskCount, setTaskCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAreaAndTasks = async () => {
      const pathname = window.location.pathname;
      const segments = pathname.split("/");
      const lastSegment = segments[segments.length - 1];
      const [projectId, areaId] = lastSegment.split("-");

      if (!projectId || !areaId) {
        console.error("Invalid URL: Missing projectId or areaId");
        setLoading(false);
        return;
      }

      try {
        // Fetch area name from the project API
        const projectResponse = await fetch(
          `http://localhost:5000/api/project/${projectId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (projectResponse.ok) {
          const projectData = await projectResponse.json();
          console.log("Fetched project details:", projectData);
          const area = projectData.project.area.find(
            (a: any) => a._id.toString() === areaId
          );

          if (area) {
            setAreaName(area.name);
          } else {
            console.error("Area not found in project");
          }
        } else {
          console.error("Failed to fetch project details");
        }

        // Fetch tasks for the area
        const tasksResponse = await fetch(
          `http://localhost:5000/api/task/${projectId}/areas/${areaId}/tasks`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (tasksResponse.ok) {
          const tasksData = await tasksResponse.json();
          const tasks = tasksData.tasks || [];
          setTaskCount(tasks.length);

          if (tasks.length > 0) {
            const completedTasks = tasks.filter(
              (task: Task) => task.status === "completed"
            ).length;
            setProgress(Math.round((completedTasks / tasks.length) * 100));
          }
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreaAndTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 w-[100%]">
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Area</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">{areaName}</p>
        </CardContent>
      </Card>
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">{progress}%</p>
        </CardContent>
      </Card>
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">{taskCount}</p>
        </CardContent>
      </Card>
    </div>
  );
}
