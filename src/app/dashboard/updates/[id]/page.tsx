/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UpdatesComponent from "@/components/updates/updates";

export type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <div className="p-6 w-full">
      <div className="space-y-1 p-3">
        <h1 className="text-2xl font-normal tracking-tight">
          Updates
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
          <UpdatesComponent />
        </TabsContent>
        <TabsContent value="2">
          <UpdatesComponent />
        </TabsContent>
        <TabsContent value="3">
          <UpdatesComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
