"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface AreaDetails {
  name: string;
  expenditure: number;
  tasksCount: number;
}

export default function MainInfo() {
  const [areaDetails, setAreaDetails] = useState<AreaDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      // Extract projectId and areaId from the URL path
      const pathname = window.location.pathname;
      const segments = pathname.split("/");
      const lastSegment = segments[segments.length - 1];
      const [projectId, areaId] = lastSegment.split("-");

      console.log("Project ID:", projectId, "Area ID:", areaId);

      if (!projectId || !areaId) {
        console.error("Invalid URL: Missing projectId or areaId");
        setLoading(false);
        return;
      }

      try {
        // Step 1: Fetch the project details
        const projectResponse = await fetch(`https://v0ck2c87-5000.inc1.devtunnels.ms/api/project/${projectId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!projectResponse.ok) {
          console.error("Failed to fetch project details");
          setLoading(false);
          return;
        }

        const project = await projectResponse.json();
        const area = project.project.area.find((a: any) => a._id === areaId);

        if (!area) {
          console.error("Area not found in the project");
          setLoading(false);
          return;
        }

        // Step 2: Fetch completed transactions for all tasks in the area
        const completedTransactions = await Promise.all(
          area.tasks.map(async (taskId: string) => {
            const taskResponse = await fetch(
              `https://v0ck2c87-5000.inc1.devtunnels.ms/api/transaction/${projectId}/${areaId}/completed-transactions`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              }
            );

            if (taskResponse.ok) {
              const taskData = await taskResponse.json();
              return taskData.transactions || [];
            } else {
              console.error(`Failed to fetch transactions for task ${taskId}`);
              return [];
            }
          })
        );

        // Flatten the transactions and calculate total expenditure
        const flattenedTransactions = completedTransactions.flat();
        const totalExpenditure = flattenedTransactions.reduce((sum, transaction) => {
          return sum + (transaction.total || 0);
        }, 0);

        // Step 3: Set the area details with expenditure and tasks count
        setAreaDetails({
          name: area.name,
          expenditure: totalExpenditure,
          tasksCount: area.tasks.length,
        });
      } catch (error) {
        console.error("Error fetching area details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!areaDetails) {
    return <div>Area details not found</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 w-[100%]">
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Area</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">{areaDetails.name}</p>
        </CardContent>
      </Card>
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Expenditure</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">₹ {areaDetails.expenditure.toLocaleString()}</p>
        </CardContent>
      </Card>
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">{areaDetails.tasksCount}</p>
        </CardContent>
      </Card>
    </div>
  );
}
