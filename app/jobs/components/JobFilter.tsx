import { Button } from "@/components/ui/button";
import { JOB_ROLES } from "@/lib/constant";
import { Bolt } from "lucide-react";
import { useState } from "react";

interface JobFilterProps {
  onFilterChange: (role: string) => void;
}

export function JobFilter({ onFilterChange }: JobFilterProps) {
  const [selectedRole, setSelectedRole] = useState("all");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };
  return (
    <div className="bg-white dark:bg-gray-900 border-0 shadow rounded-md px-3 py-1 relative max-w-md">
      <form action="#">
        <div className="text-dark text-start">
          <div className="flex items-center">
            <div className="w-full relative gap-3 flex items-center px-4 py-1 h-full">
              <span>
                <Bolt size={18} color="#10b981" />
              </span>
              <select
                value={selectedRole}
                onChange={handleChange}
                className="w-full text-sm bg-white text-gray-700 
                          dark:bg-gray-900 dark:text-gray-200  
                          focus:outline-none focus:ring-2 focus:ring-[#10b981] 
                          dark:focus:ring-[#065f46] border-0 rounded-lg px-4 py-2"
              >
                <option value="all">সব পেশা</option>
                {JOB_ROLES.map((item, idx) => (
                  <option key={idx} value={item.value}>
                    {item.label}
                  </option>
                ))}
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

            <Button className="bg-[#10b981] text-white hover:bg-[#0e9c6e] 
             dark:bg-[#065f46] dark:text-gray-200 dark:hover:bg-[#046c47] px-4 py-2 rounded-lg"
              onClick={(e) => { e.preventDefault(); onFilterChange(selectedRole); }}>
              অনুসন্ধান
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
