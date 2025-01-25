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
        <form className="space-y-4">
          {/* Name */}
          <div className="grid gap-1">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <Input id="name" placeholder="Enter task name" />
          </div>
          {/* Description */}
          <div className="grid gap-1">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Input
              id="description"
              placeholder="Enter task description"
              className="col-span-3"
            />
          </div>
          {/* Start Date */}
          <div className="grid gap-1">
            <Label htmlFor="start-date" className="text-sm font-medium">
              Start Date
            </Label>
            <Input
              id="start-date"
              type="date"
              placeholder="Select start date"
              className="col-span-3"
            />
          </div>
          {/* End Date */}
          <div className="grid gap-1">
            <Label htmlFor="end-date" className="text-sm font-medium">
              End Date
            </Label>
            <Input
              id="end-date"
              type="date"
              placeholder="Select end date"
              className="col-span-3"
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
              className="col-span-3"
            />
          </div>
        </form>
        <DialogFooter className="pt-4">
          <Button type="submit" className="w-full">
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
