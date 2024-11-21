"use client";

import { InputPassword } from "@/app/components/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
});

export default function LoginRoute() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const { email, password } = values;

    if (email === "test@kormi.com" && password === "kormi1234") {
      localStorage.setItem("isLoggedIn", "1");
      toast.success("Successfully logged in");
      router.push("/");

      return;
    }

    toast.error("Invalid credentials");
  }

  return (
    <div className="relative overflow-hidden max-w-lg mx-auto mt-20 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
      <div className="p-6">
        <h5 className="my-6 text-xl font-semibold">সাইন ইন</h5>
        <form className="text-left" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1">
            <div className="mb-4 text-left">
              <label className="font-semibold" htmlFor="email">
                ইমেইল
              </label>
              <Input
                id="email"
                type="email"
                className="mt-3"
                placeholder="name@example.com"
                {...form.register("email")}
              />
            </div>
            <InputPassword label="পাসওয়ার্ড" {...form.register("password")} />

            <div className="flex justify-between mb-4">
              <p className="text-slate-400 mb-0">
                <a className="text-slate-400" href="/reset-password">
                  পাসওয়ার্ড ভুলে গেছেন ?
                </a>
              </p>
            </div>
            <div className="mb-4">
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full"
              >
                সাইন ইন
              </Button>
            </div>
            <div className="text-center">
              <span className="text-slate-400 me-2">অ্যাকাউন্ট নেই ?</span>{" "}
              <Link
                className="text-black dark:text-white font-bold"
                href="/auth/signup"
              >
                সাইন আপ
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 text-center">
        <p className="mb-0 text-gray-400 font-medium">
          ©{new Date().getFullYear()} NIBAY
        </p>
      </div>
    </div>
  );
}
