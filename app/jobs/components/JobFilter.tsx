import { Button } from "@/components/ui/button";
import { Bolt } from "lucide-react";

export function JobFilter() {
  return (
    <div className="bg-white dark:bg-slate-900 border-0 shadow rounded-md p-3 relative max-w-lg">
      <form action="#">
        <div className="text-dark text-start">
          <div className="flex items-center gap-3">
            <div className="w-full relative flex items-center px-4 py-2 bg-gray-50 h-h-full dark:bg-slate-800">
              <span className="">
                <Bolt size={18} color="#10b981" />
              </span>
              <select className="w-full text-sm bg-transparent dark:bg-transparent border-0 focus:outline-none px-4 py-1">
                <option value="filter-by">Filter by</option>
                <option value="counter-master">Counter Master</option>
                <option value="driver">Driver</option>
                <option value="foreman">Foreman</option>
                <option value="GM">GM (General Manager)</option>
                <option value="helper">Helper</option>
                <option value="manager">Manager</option>
                <option value="mechanic">Mechanic/Mistry</option>
                <option value="Supervisor">Supervison/Passenger Guide</option>
              </select>
            </div>

            <Button className="bg-[#10b981] hover:bg-[#10b981]">
              অনুসন্ধান
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
