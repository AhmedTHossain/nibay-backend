import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Bolt, MapPin } from "lucide-react";

export function JobFilter() {
  return (
    <div className="bg-white dark:bg-slate-900 border-0 shadow rounded-md p-3">
      <form action="#">
        <div className="registration-form text-dark text-start">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
            <div className="relative mt-2 flex items-center px-4 py-2 bg-gray-50 dark:bg-slate-800">
              <span className="">
                <Bolt size={18} color="#10b981" />
              </span>
              <Select>
                <SelectTrigger className="w-full bg-transparent dark:bg-transparent border-0 focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="driver">Driver</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="relative mt-2 flex items-center px-4 py-2 bg-gray-50 dark:bg-slate-800">
              <span className="">
                <MapPin size={18} color="#10b981" />
              </span>
              <Select>
                <SelectTrigger className="w-full bg-transparent dark:bg-transparent border-0 focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="dhaka">Short listed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button className="bg-[#10b981] hover:bg-[#10b981] w-full h-full">
                অনুসন্ধান
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
