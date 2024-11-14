"use client";

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
import { z } from "zod";
import { TRegisterAs } from "../page";

const formSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(11),
  address: z.string().min(1),
  division: z.string().min(1),
  district: z.string().min(1),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
});

const DIVISIONS = [
  {
    id: 1,
    division: "ঢাকা",
    districts: [
      "ঢাকা",
      "ফরিদপুর",
      "গাজীপুর",
      "গোপালগঞ্জ",
      "কিশোরগঞ্জ",
      "মাদারীপুর"
    ]
  },
  {
    id: 2,
    division: "চট্টগ্রাম",
    districts: [
      "বান্দরবান",
      "ব্রাহ্মণবাড়িয়া",
      "চাঁদপুর",
      "চট্টগ্রাম",
      "কক্স বাজার",
      "কুমিল্লা",
      "ফেনী"
    ]
  }
];

interface IndividualFormProps {
  setRegisterAsBtn: Dispatch<SetStateAction<TRegisterAs | null>>;
}

export function IndividualRegisterForm(props: IndividualFormProps) {
  const { setRegisterAsBtn } = props;
  const [districts, setDistricts] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      division: "",
      district: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    console.log("-------------", form.formState.defaultValues);
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
