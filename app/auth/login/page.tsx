"use client";

import { InputPassword } from "@/app/components/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api_client } from "@/lib/axios";
import storage from "@/lib/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse } from "axios";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useTranslations } from 'next-intl';

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
});

export default function LoginRoute() {
  const t = useTranslations('Login');

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    setIsLoading(true);

    api_client
      .post("auth/login", values)
      .then((res: AxiosResponse<{ token: string }>) => {
        storage.setToken({ token: res.data.token });
        router.push("/");
        toast.success(t('success'));
      })
      .catch(() => { })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="relative overflow-hidden max-w-lg mx-auto mt-20 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
      <div className="p-6">
        <h5 className="my-6 text-xl font-semibold">{t('title')}</h5>
        <form className="text-left" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1">
            <div className="mb-4 text-left">
              <label className="font-semibold" htmlFor="email">
                {t('email')}
              </label>
              <Input
                id="email"
                type="email"
                className="mt-3"
                placeholder="name@example.com"
                {...form.register("email")}
              />
            </div>
            <InputPassword label={t('password')} {...form.register("password")} />

            <div className="flex justify-between mb-4">
              <p className="text-slate-800 mb-0">
                <a className="text-slate-800" href="/auth/forgot">
                  {t('forgot-password')}
                </a>
              </p>
            </div>
            <div className="mb-4">
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full"
                disabled={isLoading}
              >
                {isLoading && <Loader className="animate-spin" />} {t('sign-in')}
              </Button>
            </div>
            <div className="text-center">
              <span className="text-slate-800 me-2">{t('no-account')}</span>{" "}
              <Link
                className="text-black dark:text-white font-bold"
                href="/auth/signup"
              >
                {t('sign-up')}
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
