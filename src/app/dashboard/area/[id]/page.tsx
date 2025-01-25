/* eslint-disable @typescript-eslint/no-unused-vars */
import MainInfo from "@/components/area/main-info";
import PaymentsTable from "@/components/area/paymets-table";
import TaskPayments from "@/components/area/task-payment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <div className="p-6 w-full">
      <MainInfo />
      <PaymentsTable />
      <div className="">
        <div className="space-y-1 p-3">
          <h1 className="text-2xl font-normal tracking-tight">
            Transaction Requests
          </h1>
        </div>
        <Tabs defaultValue="1" className="p-3">
          <TabsList className="grid w-fit grid-cols-3 min-h-fit mb-9">
            <TabsTrigger className="font-normal" value="1">
              Tiling
            </TabsTrigger>
            <TabsTrigger className="font-normal" value="2">
              Plumbing
            </TabsTrigger>
            <TabsTrigger className="font-normal" value="3">
              Furnituring
            </TabsTrigger>
          </TabsList>
          <TabsContent className="p-0" value="1">
            <TaskPayments id="1" />
          </TabsContent>
          <TabsContent value="2">
            <TaskPayments id="2" />
          </TabsContent>
          <TabsContent value="3">
            <TaskPayments id="3" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
