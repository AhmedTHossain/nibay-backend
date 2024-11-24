"use client";

import { InputPassword } from "@/app/components/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { TRegisterAs } from "../page";
import { companyFormSchema, CompanyFormType, companyFormValues } from "./forms";

interface CompanyRegisterFormProps {
  setRegisterAsBtn: Dispatch<SetStateAction<TRegisterAs | null>>;
}

export function CompanyRegisterForm(props: CompanyRegisterFormProps) {
  const { setRegisterAsBtn } = props;

  const form = useForm<CompanyFormType>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: companyFormValues
  });

  function onSubmit(values: CompanyFormType) {
    console.log("------------- values", values);
  }

  return (
    <form className="text-left" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-3">
        <div className="mb-4 text-left">
          <label className="font-semibold" htmlFor="companyname">
            প্রতিষ্ঠানের নাম
          </label>
          <Input id="companyname" type="text" placeholder="প্রতিষ্ঠানের নাম" />
        </div>
        <div className="mb-4 text-left">
          <label className="font-semibold" htmlFor="companytype">
            প্রতিষ্ঠানের ধরন
          </label>
          <Input id="companytype" type="text" placeholder="প্রতিষ্ঠানের ধরন" />
        </div>

        <div className="mb-4 text-left">
          <label className="font-semibold" htmlFor="companyphone">
            ফোন নাম্বার
          </label>
          <Input id="companyphone" type="text" placeholder="ফোন নাম্বার" />
        </div>

        <div className="mb-4 text-left">
          <label className="font-semibold" htmlFor="companyaddress">
            প্রতিষ্ঠানের ঠিকানা
          </label>
          <Input
            id="companyaddress"
            type="text"
            placeholder="প্রতিষ্ঠানের ঠিকানা"
          />
        </div>

        <div className="mb-4 text-left">
          <label className="font-semibold" htmlFor="companytype">
            প্রতিষ্ঠানের ছবি
          </label>
          <Input id="companytype" type="file" placeholder="প্রতিষ্ঠানের ছবি" />
        </div>

        <div className="mb-4 text-left">
          <label className="font-semibold" htmlFor="LoginEmail">
            ইমেইল
          </label>
          <Input id="LoginEmail" type="email" placeholder="name@example.com" />
        </div>
        <InputPassword label="পাসওয়ার্ড" />
        <InputPassword label="পাসওয়ার্ড পুনরায় দিন" />

        <div className="mb-4">
          <Button className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full">
            অ্যাকাউন্ট তৈরি
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
