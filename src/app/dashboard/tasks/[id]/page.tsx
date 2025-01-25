/* eslint-disable @typescript-eslint/no-unused-vars */
import MainInfo from "@/components/tasks/main-info";
import PaymentsTable from "@/components/area/paymets-table";
import TaskPayments from "@/components/area/task-payment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TasksTable from "@/components/tasks/task-table";

export type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <div className="p-6 w-full">
      <MainInfo />
      <TasksTable />
    </div>
  );
}
