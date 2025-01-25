import { DateRange } from "@/components/home/date-range";
import MainInfo from "@/components/home/main-info";
import {Members} from "@/components/home/members";

export default function Page() {
  return (
    <div className="p-6 w-full h-[90vh]">
      <h1 className="text-2xl font-medium mb-4">Home</h1>
      <div className="w-full rounded-lg h-[100%] ">
        <MainInfo />
        <div className="w-[100%] flex  gap-3 p-3">
            <DateRange />
            <Members />
        </div>
      </div>
    </div>
  );
}
