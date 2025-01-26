import { useState } from "react";
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

export function ProjForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken"); // Replace with your token retrieval logic

    try {
      const response = await fetch("http://localhost:5000/api/project/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Project added successfully!");
        setFormData({
          name: "",
          description: "",
          startDate: "",
          endDate: "",
          budget: "",
        }); // Clear form
        console.log("Task created:", result);
      } else {
        const errorData = await response.json();
        alert(`Failed to add task: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("An error occurred. Please try again.");
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
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid gap-1">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter task name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          {/* Description */}
          <div className="grid gap-1">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Input
              id="description"
              placeholder="Enter task description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          {/* Start Date */}
          <div className="grid gap-1">
            <Label htmlFor="startDate" className="text-sm font-medium">
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              placeholder="Select start date"
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </div>
          {/* End Date */}
          <div className="grid gap-1">
            <Label htmlFor="endDate" className="text-sm font-medium">
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              placeholder="Select end date"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </div>
          {/* Budget */}
          <div className="grid gap-1">
            <Label htmlFor="budget" className="text-sm font-medium">
              Budget
            </Label>
            <Input
              id="budget"
              type="number"
              placeholder="Enter budget amount"
              value={formData.budget}
              onChange={handleInputChange}
            />
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full">
              Add Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
