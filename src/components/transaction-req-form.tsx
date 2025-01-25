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

export function TranForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit bg-[#191919]">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="font-normal text-lg">Add New Request</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          {/* Description */}
          <div className="grid gap-1">
            <Label htmlFor="desc" className="text-sm font-medium">
              Description
            </Label>
            <Input id="desc" placeholder="Enter task description" />
          </div>
          {/* Amount */}
          <div className="grid gap-1">
            <Label htmlFor="amount" className="text-sm font-medium">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              className="col-span-3"
            />
          </div>
          {/* Quantity */}
          <div className="grid gap-1">
            <Label htmlFor="quan" className="text-sm font-medium">
              Quantity
            </Label>
            <Input
              id="quan"
              type="number"
              placeholder="Enter quantity"
              className="col-span-3"
            />
          </div>
          {/* UPI ID */}
          <div className="grid gap-1">
            <Label htmlFor="upi" className="text-sm font-medium">
              UPI ID
            </Label>
            <Input id="upi" placeholder="Enter UPI ID" className="col-span-3" />
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
