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

export function TranForm({ taskId }: { taskId: string }) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    quantity: "",
    upiid: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form behavior

    try {
      const response = await fetch(`http://localhost:5000/api/transaction/${taskId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Request submitted successfully!");
        setFormData({
          description: "",
          amount: "",
          quantity: "",
          upiid: "",
        }); // Reset form after successful submission
        window.location.reload(); // Optional: Reload to reflect updates
        console.log(result);
      } else {
        alert("Failed to submit the request.");
      }
    } catch (error) {
      console.error("Error submitting the request:", error);
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
          <DialogTitle className="font-normal text-lg">Add New Request</DialogTitle>
        </DialogHeader>
        {/* Added `onSubmit` here */}
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>
          {/* Quantity */}
          <div className="grid gap-1">
            <Label htmlFor="quantity" className="text-sm font-medium">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter quantity"
              className="col-span-3"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>
          {/* UPI ID */}
          <div className="grid gap-1">
            <Label htmlFor="upiid" className="text-sm font-medium">
              UPI ID
            </Label>
            <Input
              id="upiid"
              placeholder="Enter UPI ID"
              className="col-span-3"
              value={formData.upiid}
              onChange={handleInputChange}
            />
          </div>
          <DialogFooter className="pt-4">
            {/* Submit button inside the form */}
            <Button type="submit" className="w-full">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
