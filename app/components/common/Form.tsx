import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { InputHTMLAttributes, ReactNode } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  label: string;
}

export function FormInput({
  label,
  leftIcon,
  rightIcon,
  ...props
}: FormInputProps) {
  return (
    <div>
      <label className="form-label font-medium block">{label}</label>
      <div className="relative mt-2 flex items-center px-4 py-2 bg-gray-50 dark:bg-slate-800">
        {leftIcon && <span className="">{leftIcon}</span>}
        <Input className="border-0 bg-transparent" {...props} />
        {rightIcon && <span className="">{leftIcon}</span>}
      </div>
    </div>
  );
}

export function FormSelectInput({
  label,
  leftIcon,
  rightIcon,
  // ...props
}: FormInputProps) {
  return (
    <div>
      <label className="form-label font-medium block">{label}</label>
      <div className="relative mt-2 flex items-center px-4 py-2 bg-gray-50 dark:bg-slate-800">
        {leftIcon && <span className="">{leftIcon}</span>}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {rightIcon && <span className="">{leftIcon}</span>}
      </div>
    </div>
  );
}
