"use client";

import { useState, useEffect, type KeyboardEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api_client } from "@/lib/axios";
import { formatEnglishToBangalNum } from "@/utils/formatEtoBLang";
import { toast } from "sonner";
import axios, { AxiosResponse } from "axios";
import storage from "@/lib/storage";
import { useRouter } from "next/navigation";

interface OTPVerificationFormProps {
  email: string;
  deviceId: string;
}

export default function OTPVerificationForm({
  email,
  deviceId
}: OTPVerificationFormProps) {
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setIsResendDisabled(false);
            if (interval) clearInterval(interval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isResendDisabled]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        const prevInput = e.currentTarget.previousSibling as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const handleResend = () => {
    try {
      setTimer(30);
      setIsResendDisabled(true);
      setOtp(["", "", "", "", "", ""]);
      api_client.post("auth/otp", { email, deviceId }).then((res) => {
        toast.success(res.data.message);
      });
    } catch (error) {
      toast.error("ওটিপি পুনরায় পাঠানো সফল হয়নি। দয়া করে আবার চেষ্টা করুন।");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setSubmitMessage({
        type: "error",
        message: "দয়া করে একটি বৈধ ৬-সংখ্যার ওটিপি প্রবেশ করুন"
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const requestBody = {
        email: email,
        deviceID: deviceId,
        otpCode: otpValue
      };
      api_client.post("auth/verify-otp", requestBody).then((res) => {
        if (res.data.status) {
          storage.setToken({ token: res.data.data.token });
          toast.success(res.data.message);
          router.push("/auth/reset-password");
        } else {
          toast.error(res.data.message);
        }
      });
    } catch (error) {
      setSubmitMessage({
        type: "error",
        message: "একটি অপ্রত্যাশিত সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl">
        <h2 className="text-3xl font-bold text-center">ওটিপি যাচাই</h2>
        <p className="text-center text-gray-600">
          আমরা {email} এ ৬-সংখ্যার কোড পাঠিয়েছি। আপনার অ্যাকাউন্ট যাচাই করতে
          এটি নিচে প্রবেশ করুন।
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between space-x-2">
            {otp.map((data, index) => (
              <Input
                key={index}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="\d{1}"
                maxLength={1}
                className="w-12 h-12 text-center text-2xl font-bold border-2"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
            disabled={isSubmitting || otp.some((digit) => digit === "")}
          >
            {isSubmitting ? "যাচাই হচ্ছে..." : "যাচাই করুন"}
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
        <div className="text-center">
          <p className="text-sm text-gray-600">
            কোডটি পাননি?{" "}
            {isResendDisabled ? (
              <span className="text-emerald-600 font-medium">
                {formatEnglishToBangalNum(String(timer))} সেকেন্ডে পুনরায় পাঠান
              </span>
            ) : (
              <button
                onClick={handleResend}
                className="text-emerald-600 font-medium hover:underline focus:outline-none"
                type="button"
              >
                পুনরায় ওটিপি পাঠান
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
