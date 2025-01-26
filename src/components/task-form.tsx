"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export function TaskForm() {
  const [taskDetails, setTaskDetails] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const [projectId, areaId] = pathname.split("/").pop()?.split("-") || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDetails({ ...taskDetails, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!taskDetails.name.trim() || !taskDetails.description.trim()) {
      setError("Both name and description are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          name: taskDetails.name,
          description: taskDetails.description,
          projectId,
          areaId,
        }),
      });

      if (response.ok) {
        setTaskDetails({ name: "", description: "" });
        setError(null);
        window.location.reload();
        console.log("Task added successfully");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add task.");
      }
    } catch (err) {
      setError("An error occurred while adding the task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit bg-[#191919]">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="font-normal text-lg">Add New Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-1">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <Input
              id="name"
              value={taskDetails.name}
              onChange={handleChange}
              placeholder="Enter task name"
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Input
              id="description"
              value={taskDetails.description}
              onChange={handleChange}
              placeholder="Enter task description"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
