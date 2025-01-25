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

export function UpdateForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit bg-[#191919]">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="font-normal text-lg">Add New Update</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          {/* Date */}
          <div className="grid gap-1">
            <Label htmlFor="date" className="text-sm font-medium">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              placeholder="Select a date"
              className="col-span-3"
            />
          </div>
          {/*Notes */}
            <div className="grid gap-1">
                <Label htmlFor="notes" className="text-sm font-medium">
                Notes
                </Label>
                <Input
                id="notes"
                placeholder="Enter task notes"
                className="col-span-3"
                />
            </div>
          {/* Photos */}
          <div className="grid gap-1">
            <Label htmlFor="photos" className="text-sm font-medium">
              Upload Photos
            </Label>
            <Input
              id="photos"
              type="file"
              multiple
              accept="image/*"
              className="col-span-3"
            />
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
