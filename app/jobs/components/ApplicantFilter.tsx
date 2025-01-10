import { Button } from "@/components/ui/button";
import { APPLICATION_STATUS } from "@/lib/constant";
import { Bolt } from "lucide-react";
import { useState } from "react";

interface ApplicantFilterProps {
  onFilterChange: (status: keyof typeof APPLICATION_STATUS) => void;
}

export function ApplicantFilter({ onFilterChange }: ApplicantFilterProps) {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-0 shadow rounded-md p-3 relative max-w-lg">
      <form action="#">
        <div className="text-dark text-start">
          <div className="flex items-center gap-3">
            <div className="w-full relative mt-2 flex items-center px-4 py-2 bg-gray-50 h-h-full dark:bg-slate-800">
              <span className="">
                <Bolt size={18} color="#10b981" />
              </span>
              <select value={selectedStatus} onChange={handleChange} className="w-full text-sm bg-transparent dark:bg-transparent border-0 focus:ring- focus:outline-none">
                {/* <option selected>Filter by</option> */}
                <option value="ALL">All</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="REJECTED">Rejected</option>
                <option value="SHORT_LISTED">Short Listed</option>
                <option value="PENDING">Pending</option>
              </select>

              {/* <Select>
                <SelectTrigger className="w-full bg-transparent dark:bg-transparent border-0 focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="professional drivers">
                      Professional drivers
                    </SelectItem>
                    <SelectItem value="Institutional Employers">
                      Institutional Employers
                    </SelectItem>
                    <SelectItem value="Individual Employers">
                      Individual Employers
                    </SelectItem>
                    <SelectItem value="Site Admin">Site Admin</SelectItem>
                    <SelectItem value="supervisors">Supervisors</SelectItem>
                    <SelectItem value="conductors">Conductors</SelectItem>
                    <SelectItem value="mechanics">Mechanics</SelectItem>
                    <SelectItem value="maintenance workers">
                      Maintenance workers
                    </SelectItem>
                    <SelectItem value="ticket counter agents">
                      Ticket counter agents
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select> */}
            </div>

            <Button className="bg-[#10b981] hover:bg-[#10b981] w-full h-full"
              onClick={(e) => { e.preventDefault(); onFilterChange(selectedStatus as keyof typeof APPLICATION_STATUS); }}>
              অনুসন্ধান
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
