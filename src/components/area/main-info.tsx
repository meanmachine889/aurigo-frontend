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
    // Extract projectId and areaId from the URL path
    const pathname = window.location.pathname; // Use `window.location` to access the full path
    const segments = pathname.split("/"); // Split the path into segments
    const lastSegment = segments[segments.length - 1]; // Get the last part of the path
    const [projectId, areaId] = lastSegment.split("-"); // Extract projectId and areaId

    console.log("Project ID:", projectId, "Area ID:", areaId);

    if (!projectId || !areaId) {
      console.error("Invalid URL: Missing projectId or areaId");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/project/${projectId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.ok) {
          const project = await response.json();
          console.log("Fetched project details:", project.project);

          const area = project.project.area.find((a: any) => a._id == areaId);

          if (area) {
            setAreaDetails({
              name: area.name,
              expenditure: area.expenditure || 0,
              tasksCount: area.tasks.length || 0,
            });
          } else {
            console.error("Area not found in the project");
          }
        } else {
          console.error("Failed to fetch project details");
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []); // Empty dependency array ensures this runs only once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!areaDetails) {
    return <div>Area details not found</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-3 p-3 w-[100%]">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Area</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">{areaDetails.name}</p>
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Expenditure</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">₹ {areaDetails.expenditure.toLocaleString()}</p>
        </CardContent>
      </Card>
      <Card className="">
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
