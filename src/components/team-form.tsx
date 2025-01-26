"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useState } from "react"

export function TeamForm() {
  const pathname = window.location.pathname;
    const segments = pathname.split("/");
    const id = segments[segments.length - 1];
    const [email, setEmail] = useState("");

  const addmemeber = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/project/${id}/admember`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Worker added successfully");
        window.location.reload();
        alert("Member added successfully");
      } else {
        console.error("Error adding worker:", data.message);
        alert("Error adding member");
      }
    } catch (error) {
      console.error("Error adding worker:", error);
      alert("An error occurred while adding member. Please try again.");
    } 
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit bg-[#191919]"><Plus/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-normal">Add new member</DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="">
            <Label htmlFor="email" className="text-right">
              Email Id
            </Label>
            <Input id="email" className="mt-3" onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>
        </div>
        <DialogFooter>
          <Button  onClick={addmemeber}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
