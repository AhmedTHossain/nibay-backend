"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserPen, Users } from "lucide-react";
import { useState } from "react";
import { CompanyRegisterForm } from "./components/company-form";
import { IndividualRegisterForm } from "./components/individual-form";

export type TRegisterAs = "individual" | "company";

export default function SignupRoute() {
  const [registerAs, setRegisterAs] = useState<TRegisterAs | null>(null);
  const [registerAsBtn, setRegisterAsBtn] = useState<TRegisterAs | null>(null);

  return (
    <div className="mt-24">
      <h2 className="text-center text-3xl font-medium">
        {registerAsBtn === "individual"
          ? "ব্যক্তি হিসাবে যোগদান করুন"
          : registerAsBtn === "company"
            ? "প্রতিষ্ঠান হিসাবে যোগদান করুন"
            : "একজন ব্যক্তি বা প্রতিষ্ঠান হিসাবে যোগদান করুন"}
      </h2>

      <div className="p-6 mt-10 max-w-xl mx-auto">
        {!registerAsBtn && (
          <>
            <RadioGroup
              className="grid grid-cols-2 gap-4"
              onValueChange={(value) => setRegisterAs(value as TRegisterAs)}
            >
              <label className="border rounded-md p-4" htmlFor="r1">
                <div className="flex items-center justify-between">
                  <p className="mt-4">
                    <UserPen />
                  </p>
                  <RadioGroupItem value="individual" id="r1" />
                </div>
                <p className="mt-6 text-xl font-semibold">
                  ব্যক্তিগতভাবে সাইন আপ করুন
                </p>
              </label>

              <label className="border rounded-md p-4" htmlFor="r2">
                <div className="flex items-center justify-between">
                  <p className="mt-4">
                    <Users />
                  </p>
                  <RadioGroupItem value="company" id="r2" />
                </div>
                <p className="mt-6 text-xl font-semibold">
                  প্রতিষ্ঠান হিসেবে সাইন আপ করুন
                </p>
              </label>
            </RadioGroup>

            <div className="mt-6 text-center">
              {registerAs === "individual" ? (
                <Button
                  type="button"
                  className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700"
                  onClick={() => setRegisterAsBtn("individual")}
                >
                  ব্যক্তি হিসাবে
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700"
                  onClick={() => setRegisterAsBtn("company")}
                >
                  প্রতিষ্ঠান হিসাবে
                </Button>
              )}
            </div>
          </>
        )}

        <div>
          {registerAsBtn === "individual" && (
            <IndividualRegisterForm setRegisterAsBtn={setRegisterAsBtn} />
          )}

          {registerAsBtn === "company" && (
            <CompanyRegisterForm setRegisterAsBtn={setRegisterAsBtn} />
          )}
        </div>
      </div>
    </div>
  );
}
