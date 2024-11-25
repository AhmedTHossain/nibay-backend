"use client";

import { InputPassword } from "@/app/components/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { TRegisterAs } from "../page";
import { companyFormSchema, CompanyFormType, companyFormValues } from "./forms";
import { api_client } from "@/lib/axios";
import { AxiosResponse } from "axios";
import storage from "@/lib/storage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";

interface CompanyRegisterFormProps {
  setRegisterAsBtn: Dispatch<SetStateAction<TRegisterAs | null>>;
}

export function CompanyRegisterForm(props: CompanyRegisterFormProps) {
  const { setRegisterAsBtn } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<CompanyFormType>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: companyFormValues
  });

  function onSubmit(values: CompanyFormType) {
    console.log("------------- values", values);

    setIsLoading(true);

    api_client
      .post("auth/register", values)
      .then((res: AxiosResponse<{ token: string }>) => {
        storage.setToken({ token: res.data.token });
        router.push("/");
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি করা হয়েছে");
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  const error = (field: keyof CompanyFormType): string | undefined => {
    return form.formState.errors[field]?.message as string | undefined;
  };

  return (
    <form className="text-left" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-3">
        <div className="mb-4 text-left">
          <label className="font-semibold" htmlFor="companyname">
            প্রতিষ্ঠানের নাম
          </label>
          <Input
            id="companyname"
            type="text"
            placeholder="প্রতিষ্ঠানের নাম"
            {...form.register("name")}
          />
          {error("name") ? (
            <p className="text-red-500 font-semibold text-sm">
              {error("name")}
            </p>
          ) : null}
        </div>
        <div className="mb-4 text-left">
          <label className="font-semibold" htmlFor="companytype">
            প্রতিষ্ঠানের ধরন
          </label>
          <Input
            id="companytype"
            type="text"
            placeholder="প্রতিষ্ঠানের ধরন"
            {...form.register("organizationType")}
          />
          {error("organizationType") ? (
            <p className="text-red-500 font-semibold text-sm">
              {error("organizationType")}
            </p>
          ) : null}
        </div>

        <div className="mb-4 text-left">
          <label className="font-semibold" htmlFor="companyphone">
            ফোন নাম্বার
          </label>
          <Input
            id="companyphone"
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
          <label className="font-semibold" htmlFor="organizationContactPerson">
            প্রতিষ্ঠানের যোগাযোগকারীর নাম
          </label>
          <Input
            id="organizationContactPerson"
            type="text"
            placeholder="প্রতিষ্ঠানের নাম"
            {...form.register("organizationContactPerson")}
          />
          {error("organizationContactPerson") ? (
            <p className="text-red-500 font-semibold text-sm">
              {error("organizationContactPerson")}
            </p>
          ) : null}
        </div>

        <div className="mb-4 text-left">
          <label className="font-semibold" htmlFor="address">
            ঠিকানা
          </label>
          <Input
            id="address"
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

        <div className="mb-4 text-left">
          <label className="font-semibold" htmlFor="companyImage">
            প্রতিষ্ঠানের ছবি
          </label>
          <Input
            id="companyImage"
            type="file"
            placeholder="প্রতিষ্ঠানের ছবি"
            {...form.register("image")}
          />
          {error("image") ? (
            <p className="text-red-500 font-semibold text-sm">
              {error("image")}
            </p>
          ) : null}
        </div>

        <div className="mb-4 text-left">
          <label className="font-semibold" htmlFor="LoginEmail">
            ইমেইল
          </label>
          <Input
            id="LoginEmail"
            type="email"
            placeholder="name@example.com"
            {...form.register("email")}
          />
          {error("email") ? (
            <p className="text-red-500 font-semibold text-sm">
              {error("email")}
            </p>
          ) : null}
        </div>
        <InputPassword
          label="পাসওয়ার্ড"
          {...form.register("password")}
          errorMessage={error("password")}
        />
        <InputPassword
          label="পাসওয়ার্ড পুনরায় দিন"
          {...form.register("confirmPassword")}
          errorMessage={error("confirmPassword")}
        />

        <div className="mb-4">
          <Button className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full">
            {isLoading && <Loader className="animate-spin" />} অ্যাকাউন্ট তৈরি
          </Button>
        </div>
        <div className="mb-4 text-center">
          <p className="text-sm">অথবা</p>
          <Button
            type="button"
            variant="link"
            className="text-emerald-800 underline"
            onClick={() => setRegisterAsBtn("individual")}
          >
            ব্যক্তি হিসাবে যোগদান করুন
          </Button>
        </div>

        <div className="text-center">
          <span className="text-slate-400 me-2">
            ইতিমধ্যেই রেজিস্ট্রেশন করা আছে ?{" "}
          </span>{" "}
          <Link
            className="text-black dark:text-white font-bold"
            href="/auth/login"
          >
            সাইন ইন
          </Link>
        </div>
      </div>
    </form>
  );
}
