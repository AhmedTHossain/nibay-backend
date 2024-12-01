"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api_client } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
});

export default function ResetPasswordRoute() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    api_client
      .post("reset-password", values)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="pt-20">
      <div className="mx-auto mt-5 w-full max-w-lg rounded-2xl bg-white p-8 shadow">
        <h4 className="mb-6 text-4xl font-bold tracking-tight text-gray-900">
          Nytt passord
        </h4>

        <h2 className="text-lg font-semibold tracking-tight text-gray-900">
          Lag et nytt passord som er trygt og enkelt å huske
        </h2>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mt-12"
        >
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
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full"
            >
              {isLoading && <Loader className="animate-spin" />} সাইন ইন
            </Button>
          </div>
        </form>

        <div className="text-center mt-8">
          <Link
            to="/auth/signin"
            className="text-sky-600 text-sm font-semibold hover:bg-sky-50 inline rounded-md p-3 transition-all duration-150"
          >
            Logg inn
          </Link>
        </div>
      </div>
    </div>
  );
}
