import { useState } from "react";
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

interface Worker {
  _id: string;
  name: string;
  role: string;
  mobile: string;
  upiid: string;
}

interface WorkerFormProps {
  onAddWorker: (worker: Worker) => void;
  existingWorkers: Worker[];
}

export function WorkerForm({ onAddWorker, existingWorkers }: WorkerFormProps) {
  const [formValues, setFormValues] = useState({
    name: "",
    role: "",
    phone: "",
    upiid: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const addWorker1 = async (worker: Worker) => {
    const pathname = window.location.pathname;
    const segments = pathname.split("/");
    const id = segments[segments.length - 1];

    try {
      const response = await fetch(`http://localhost:5000/api/workers/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(worker),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Worker added:", data);
        window.location.reload();
      } else {
        console.error("Failed to add worker");
      }
    } catch (error) {
      console.error("Error adding worker:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formValues.name && formValues.role && formValues.phone && formValues.upiid) {
      setLoading(true);
      setError(null); // Reset any previous errors

      try {
        const response = await fetch("http://localhost:5000/api/workers/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          const data = await response.json();
        window.location.reload();

          // Reset the form values
          setFormValues({
            name: "",
            role: "",
            phone: "",
            upiid: "",
          });
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to add worker.");
        }
      } catch (err) {
        setError("An error occurred while adding the worker.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("All fields are required.");
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
              {existingWorkers.length > 0 ? (
                existingWorkers.map((worker, index) => (
                  <Button
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border bg-[#1d1d1d]"
                    onClick={()=>addWorker1(worker)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={worker.name} variant="marble" size={30} />
                      <p className="text-sm font-medium">{worker.name}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{worker.role}</p>
                  </Button>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No workers found</p>
              )}
            </div>
          </TabsContent>

          {/* Tab for Adding New Worker */}
          <TabsContent value="add">
            <form className="space-y-4 mt-4" >
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter worker's name"
                  value={formValues.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  placeholder="Enter worker's role"
                  value={formValues.role}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="phone"
                  placeholder="Enter worker's mobile"
                  value={formValues.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="upiid">UPI ID</Label>
                <Input
                  id="upiid"
                  placeholder="Enter worker's UPI ID"
                  value={formValues.upiid}
                  onChange={handleChange}
                />
              </div>
              <Button type="button" onClick={handleSubmit} className="w-full" disabled={loading}>
                {loading ? "Saving..." : "Save Worker"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
