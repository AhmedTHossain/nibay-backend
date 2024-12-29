import { Button } from "@/components/ui/button";
import { JOB_ROLES } from "@/lib/constant";
import { Bolt } from "lucide-react";

export function JobFilter() {
  return (
    <div className="bg-white dark:bg-slate-900 border-0 shadow rounded-md px-3 py-1 relative max-w-md">
      <form action="#">
        <div className="text-dark text-start">
          <div className="flex items-center gap-3">
            <div className="w-full relative flex items-center px-4 py-1 h-full">
              <span>
                <Bolt size={18} color="#10b981" />
              </span>
              <select className="w-full text-sm bg-transparent dark:bg-transparent border-0 focus:outline-none px-4 py-0">
                <option value="all">সব পেশা</option>
                {JOB_ROLES.map((item, idx) => {
                  return (
                    <option key={idx} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* <div className="w-full relative flex items-center px-4 py-1 h-full">
              <span>
                <Bolt size={18} color="#10b981" />
              </span>
              <select className="w-full text-sm bg-transparent dark:bg-transparent border-0 focus:outline-none px-4 py-0">
                <option value="all">সব</option>
                <option value="active-jobs">এক্টিভ</option>
                <option value="past-jobs">পুরাতন চাকরি</option>
              </select>
            </div> */}

            <Button className="bg-[#10b981] hover:bg-[#10b981]">
              অনুসন্ধান
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
