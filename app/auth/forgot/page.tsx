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
import VerifyOTPForm from "./components/OTPVerficationForm";
import OTPVerificationForm from "./components/OTPVerficationForm";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" })
});

export default function ForgotPasswordRoute() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [email, setEmail] = useState("");
  const [deviceID, setDeviceID] = useState("testid"); // Replace with actual device ID logic
  const t = useTranslations("forgotPassword");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setEmail(values.email);

    const requestBody = {
      email: values.email,
      deviceID: deviceID
    };

    api_client
      .post("auth/otp", requestBody)
      .then((res) => {
        toast.success(res.data.message);
        setIsOTPSent(true); // Show the OTP verification form
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="relative overflow-hidden max-w-lg mx-auto mt-20 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
      {isOTPSent ? (
        <OTPVerificationForm email={email} deviceId={deviceID} />
      ) : (
        <div className="mx-auto mt-5 w-full max-w-lg rounded-2xl bg-white p-8 shadow">
          <h4 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
            {t("title")}
          </h4>
          <h2 className="text-md mt-4 font-medium tracking-tight text-gray-900">
            {t("subtitle")}
          </h2>
          <form
            className="mt-6 text-left"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1">
              <div className="mb-4 text-left">
                <label className="font-semibold" htmlFor="email">
                  {t("emailLabel")}
                </label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1"
                  placeholder={t("emailPlaceholder")}
                  {...form.register("email")}
                />
              </div>
              <div className="mb-4">
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full"
                  name="intent"
                  value="forgot-pass"
                  disabled={isLoading}
                >
                  {isLoading && <Loader className="animate-spin" />}{" "}
                  {t("resetLinkButton")}
                </Button>
              </div>
            </div>
          </form>
          <div className="text-center">
            <a
              href="/auth/login"
              className="text-sky-700 text-sm font-semibold hover:bg-sky-50 inline rounded-md p-3 transition-all duration-150"
            >
              {t("loginLink")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
