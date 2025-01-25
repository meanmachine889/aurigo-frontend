"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ProjectDetails {
  name: string;
  budget: number;
  completionPercentage: number;
  spaces: number;
}

export default function MainInfo() {
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      // Extract projectId from the URL
      const pathname = window.location.pathname;
      const segments = pathname.split("/");
      const projectId = segments[segments.length - 1]; // Assumes the projectId is the last segment of the URL

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
          const project = data.project;

          // Populate project details
          setProjectDetails({
            name: project.name || "Unknown",
            budget: project.budget || 0,
            completionPercentage: project.completionPercentage || 0,
            spaces: project.area?.length || 0,
          });
        } else {
          console.error("Failed to fetch project details");
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!projectDetails) {
    return <div>Project details not found</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-3 w-[100%]">
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Name</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">{projectDetails.name}</p>
        </CardContent>
      </Card>
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">
            ₹ {projectDetails.budget.toLocaleString()}
          </p>
        </CardContent>
      </Card>
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">
            {projectDetails.completionPercentage}%
          </p>
        </CardContent>
      </Card>
      <Card className="bg-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-md font-normal text-gray-300">Spaces</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">{projectDetails.spaces}</p>
        </CardContent>
      </Card>
    </div>
  );
}
