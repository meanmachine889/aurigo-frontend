"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
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

export function DialogForm() {
  const [areaName, setAreaName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname(); // Get the current pathname
  const projectId = pathname.split("/").pop(); // Extract the projectId from the URL

  const handleSubmit = async () => {
    if (!areaName.trim()) {
      setError("Area name is required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/project/${projectId}/add-area`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ name: areaName }),
      });

      if (response.ok) {
        setAreaName("");
        setError(null);
        window.location.reload();
        console.log("Area added successfully");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add area.");
      }
    } catch (err) {
      setError("An error occurred while adding the area.");
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-normal">Add New Area</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Area Name
            </Label>
            <Input
              id="name"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              className="col-span-3"
              placeholder="Enter area name"
            />
          </div>
          {error && <p className="text-red-500 col-span-4">{error}</p>}
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
