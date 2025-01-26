import MainInfo from "@/components/home/main-info";
import { Members } from "@/components/home/members";
import RecentTasks from "@/components/home/recent-tasks";
import Spaces from "@/components/home/spaces";
import { Workers } from "@/components/home/workers";
export type pageprops = {
    params: {
        id: string;
    };
};

export default function Page({ params }: pageprops) {
  return (
    <div className="p-6 w-full py-0">
      <div className="w-full rounded-lg h-[100%] flex flex-col gap-3 py-6">
        <MainInfo />
        <div className="w-[100%] grid grid-cols-3 gap-3">
          <Spaces />
          <Members />
        </div>
        <RecentTasks />
        <Workers projectId={params.id} />
      </div>
    </div>
  );
}
