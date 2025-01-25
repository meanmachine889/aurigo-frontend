import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Avatar from "boring-avatars";
const team = [
  {
    name: "Sofia Davis",
    role: "Plumber",
    mobile: "1234567890",
    upi: "sofia@upi",
  },
  {
    name: "Jackson Lee",
    role: "Carpenter",
    mobile: "1234567890",
    upi: "jackson@upi",
  },
  {
    name: "Isabella Nguyen",
    role: "Electrician",
    mobile: "1234567890",
    upi: "isabella@upi",
  },
];
export function WorkerForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit bg-[#191919]">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Workers</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="view">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="view">Existing Workers</TabsTrigger>
            <TabsTrigger value="add">Add New Worker</TabsTrigger>
          </TabsList>

          {/* Tab for Existing Workers */}
          <TabsContent value="view">
            <div className="space-y-4 mt-4">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center justify-between p-3 rounded-lg border bg-[#1d1d1d]"
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={member.name} variant="marble" size={30} />
                    <p className="text-sm font-medium">{member.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Tab for Adding New Worker */}
          <TabsContent value="add">
            <form className="space-y-4 mt-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter worker's name" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" placeholder="Enter worker's role" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input id="mobile" placeholder="Enter worker's mobile" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="upi">UPI ID</Label>
                <Input id="upi" placeholder="Enter worker's UPI ID" />
              </div>
              <Button type="submit" className="w-full">
                Save Worker
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
