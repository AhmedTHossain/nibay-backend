"use client";

import { DIVISIONS } from "@/app/assets/resources";
import { InputPassword } from "@/app/components/forms";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TRegisterAs } from "../page";
import {
  individualFormSchema,
  individualFormValues,
  InvidualFormType
} from "./forms";

interface IndividualFormProps {
  setRegisterAsBtn: Dispatch<SetStateAction<TRegisterAs | null>>;
}

export function IndividualRegisterForm(props: IndividualFormProps) {
  const { setRegisterAsBtn } = props;
  const [districts, setDistricts] = useState([]);

  const form = useForm<InvidualFormType>({
    resolver: zodResolver(individualFormSchema),
    defaultValues: individualFormValues
  });

  function onSubmit(values: InvidualFormType) {
    const { confirmPassword, ...rest } = values;
    if (rest.password !== confirmPassword) {
      return toast.error("Password doesn't matched!");
    }

    // api_client.post("/signup", rest).then((res) => {
    //   console.log("------------- response", res);
    // });

    console.log("------------- values", values);
  }

  return (
    <form className="text-left" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1">
        <div className="mb-4 text-left">
          <label className="font-semibold" htmlFor="username">
            আপনার নাম
          </label>
          <Input
            id="username"
            type="text"
            placeholder="নাম"
            {...form.register("name")}
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
        </div>

        <div className="mb-4 text-left">
          <label className="font-semibold" htmlFor="division">
            বিভাগ
          </label>
          <Select
            onValueChange={(value) => {
              form.setValue("division", value);
              form.setValue("district", "");

              setDistricts(
                DIVISIONS.find((item) => item.division === value)
                  ?.districts as []
              );
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="বিভাগ" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {DIVISIONS.map((item) => {
                  return (
                    <SelectItem key={item.id} value={item.division}>
                      {item.division}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {districts.length > 0 && (
          <div className="mb-4 text-left">
            <label className="font-semibold" htmlFor="division">
              জেলা
            </label>
            <Select onValueChange={(value) => form.setValue("district", value)}>
              <SelectTrigger className="">
                <SelectValue placeholder="জেলা" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {districts.map((item, idx) => {
                    return (
                      <SelectItem key={idx} value={item}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="mb-4 text-left">
          <label className="font-semibold" htmlFor="email">
            ইমেইল
          </label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...form.register("email")}
          />
        </div>
        <InputPassword label="পাসওয়ার্ড" {...form.register("password")} />
        <InputPassword
          label="পাসওয়ার্ড পুনরায় দিন"
          {...form.register("confirmPassword")}
        />

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
            onClick={() => setRegisterAsBtn("company")}
          >
            প্রতিষ্ঠান হিসাবে যোগদান করুন
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
