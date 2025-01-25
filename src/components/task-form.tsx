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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit bg-[#191919]">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="font-normal text-lg">Add New Tasks</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
        <div className="grid gap-1">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <Input id="name" placeholder="Enter task description" />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="desc" className="text-sm font-medium">
              Description
            </Label>
            <Input id="desc" placeholder="Enter task description" />
          </div>
        </form>
        <DialogFooter className="pt-4">
          <Button type="submit" className="w-full">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
