"use client";

import { use, useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserInfo } from "@/app/hooks/useUserInfo";
import { api_client } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import storage from "@/lib/storage";
import { useTranslations } from "next-intl";

export default function SetNewPasswordForm() {
  const router = useRouter();
  const t = useTranslations("setNewPassword");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  const [errors, setErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    const token = storage.getToken();
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  const validateForm = () => {
    const newErrors: { newPassword?: string; confirmPassword?: string } = {};

    if (newPassword.length < 8) {
      newErrors.newPassword = t("passwordLengthError");
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = t("passwordMismatchError");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      api_client
        .post("auth/reset-password", {
          password: newPassword
        })
        .then((res) => {
          if (res.data.status === "success") {
            toast.success(res.data.message);
            storage.clearToken();
            router.push("/auth/login"); // Redirect to home page
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      setSubmitMessage({
        type: "error",
        message: t("unexpectedError")
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center relative overflow-hidden max-w-lg mx-auto mt-20 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
      <div className="w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center">{t("title")}</h2>
        <p className="text-center text-gray-600">{t("subtitle")}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">{t("newPasswordLabel")}</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border-2"
            />
            {errors.newPassword && (
              <p id="new-password-error" className="text-red-500 text-sm">
                {errors.newPassword}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">
              {t("confirmPasswordLabel")}
            </Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-2"
            />
            {errors.confirmPassword && (
              <p id="confirm-password-error" className="text-red-500 text-sm">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("updating") : t("updateButton")}
          </Button>
        </form>
        {submitMessage && (
          <div
            className={`text-center ${submitMessage.type === "error" ? "text-red-600" : "text-green-600"}`}
            role="alert"
          >
            {submitMessage.message}
          </div>
        )}
      </div>
    </div>
  );
}
