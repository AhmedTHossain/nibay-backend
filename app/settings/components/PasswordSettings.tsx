"use client";

import { InputPassword } from "@/app/components/forms";
import { useUserInfo } from "@/app/hooks/useUserInfo";
import { Button } from "@/components/ui/button";
import { api_client } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  passwordSettingsFormSchema,
  PasswordSettingsFormType,
  passwordSettingsFormValues
} from "./form";

export function PasswordSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const { user: currentUser, isLoading: userLoading } = useUserInfo();

  const form = useForm<PasswordSettingsFormType>({
    resolver: zodResolver(passwordSettingsFormSchema),
    defaultValues: {
      ...passwordSettingsFormValues,
      key: "password"
    }
  });

  function onSubmit(values: PasswordSettingsFormType) {
    setIsLoading(true);

    const { newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      setIsLoading(false)
      return toast.error("Password doesn't matched!");
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    api_client
      .patch(`/user/${currentUser?._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const error = (field: keyof PasswordSettingsFormType): string | undefined => {
    return form.formState.errors[field]?.message as string | undefined;
  };

  return (
    <div className="grid grid-cols-1">
      {userLoading && (
        <div className="flex items-center justify-center h-full">
          <Loader size={20} />
        </div>
      )}
      {!userLoading && currentUser && (
        <div className="mt-4 p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
          <h5 className="text-lg font-semibold mb-6">
            Change your password here
          </h5>
          <form className="text-left" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6">
              <InputPassword
                label="পাসওয়ার্ড"
                {...form.register("oldPassword")}
                errorMessage={error("oldPassword")}
              />
              <InputPassword
                label="নতুন পাসওয়ার্ড"
                {...form.register("newPassword")}
                errorMessage={error("newPassword")}
              />

              <InputPassword
                label="পাসওয়ার্ড নতুন পুনরায় দিন"
                {...form.register("confirmPassword")}
                errorMessage={error("confirmPassword")}
              />
            </div>

            <div className="mt-3">
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md"
                disabled={isLoading}
              >
                {isLoading && <Loader className="animate-spin" />} Save Changes
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
