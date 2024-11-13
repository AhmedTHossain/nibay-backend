"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputPassword = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ ...props }, ref) => {
    const [isHidden, setIsHidden] = useState(true);

    return (
      <div className="mb-4 text-left" ref={ref}>
        <label className="font-semibold" htmlFor={props.label}>
          {props.label}
        </label>
        <div className="relative">
          <Input
            id={props.label}
            type={isHidden ? "password" : "text"}
            className="mt-3"
            {...props}
          />
          <button
            type="button"
            className="absolute right-2 top-3"
            onClick={() => setIsHidden((prev) => !prev)}
          >
            {isHidden ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
      </div>
    );
  }
);

InputPassword.displayName = "Input";

export { InputPassword };
