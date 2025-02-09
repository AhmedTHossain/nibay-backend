"use client";

import { DIVISIONS } from "@/app/assets/resources";
import { useUserInfo } from "@/app/hooks/useUserInfo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { api_client } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  accountSettingsFormSchema,
  AccountSettingsFormType,
  accountSettingsFormValues
} from "./form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUserById from "@/app/hooks/users/useUserById";
import { TUser } from "@/utils/types/user";

export function MobileUserAccountSettings({ currentUser, refetch }: { currentUser: TUser, refetch: () => void }) {
  const router = useRouter();

  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<AccountSettingsFormType>({
    resolver: zodResolver(accountSettingsFormSchema),
    defaultValues: {
      ...accountSettingsFormValues,
      key: "account"
    }
  });

  function onSubmit(values: AccountSettingsFormType) {
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        formData.append(key, value || null);
      } else {
        formData.append(key, value || null);
      }
    });

    api_client
      .patch(`/user/${currentUser._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        refetch();

        if (res.data.status === "success") {
          toast.success(res.data.message);
        }
        window.location.reload();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const error = (field: keyof AccountSettingsFormType): string | undefined => {
    return form.formState.errors[field]?.message as string | undefined;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (currentUser) {
      const {
        name,
        address,
        district,
        division,
        email,
        profilePhoto,
        organizationContactPerson,
        organizationType,
        phone
      } = currentUser;
      const body = {
        name,
        address,
        district,
        division,
        email,
        profilePhoto,
        organizationContactPerson,
        organizationType,
        phone
      };

      Object.keys(body).forEach((key) => {
        // eslint-disable-next-line
        // @ts-ignore
        form.setValue(`${key as keyof TUser}`, body[key as keyof TUser]);
      });
    }
    // eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      setDistricts(
        (DIVISIONS.find((item) => item.division === currentUser.division)
          ?.districts as []) || []
      );
    }
  }, [currentUser]);

  return (
    <div className="grid grid-cols-1">
      {currentUser && (
        <div className="mt-4 p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
          <h5 className="text-lg font-semibold mb-6">Personal Details</h5>
          <form className="text-left" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <label className="font-semibold" htmlFor="name">
                  নাম
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="নাম"
                  {...form.register("name")}
                />
                {error("name") ? (
                  <p className="text-red-500 font-semibold text-sm">
                    {error("name")}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="font-semibold" htmlFor="email">
                  ইমেইল
                </label>
                <Input
                  id="email"
                  type="email"
                  disabled
                  placeholder="name@example.com"
                  {...form.register("email")}
                />
              </div>

              <div className="mb-4 text-left">
                <label className="font-semibold" htmlFor="userphone">
                  ফোন নাম্বার
                </label>
                <Input
                  id="userphone"
                  type="text"
                  placeholder="ফোন নাম্বার"
                  {...form.register("phone")}
                />
                {error("phone") ? (
                  <p className="text-red-500 font-semibold text-sm">
                    {error("phone")}
                  </p>
                ) : null}
              </div>

              <div className="mb-4 text-left">
                <label className="font-semibold" htmlFor="useraddress">
                  ঠিকানা
                </label>
                <Input
                  id="useraddress"
                  type="text"
                  placeholder="ঠিকানা"
                  {...form.register("address")}
                />
                {error("address") ? (
                  <p className="text-red-500 font-semibold text-sm">
                    {error("address")}
                  </p>
                ) : null}
              </div>
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
