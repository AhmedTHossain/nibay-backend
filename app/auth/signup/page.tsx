"use client";

import { InputPassword } from "@/app/components/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function SignupRoute() {
  return (
    <div className="mt-24">
      <h2 className="text-center text-3xl font-medium">
        Join as a Individual or Company
      </h2>

      <div className="mt-10 relative overflow-hidden max-w-lg mx-auto bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
        <div className="p-6">
          <Tabs defaultValue="individual" className="max-w-lg mx-auto">
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="individual" className="font-semibold w-full">
                Individual
              </TabsTrigger>
              <TabsTrigger value="company" className="font-semibold w-full">
                Company
              </TabsTrigger>
            </TabsList>
            <TabsContent value="individual">
              <form className="text-left">
                <div className="grid grid-cols-1">
                  <div className="mb-4 text-left">
                    <label className="font-semibold" htmlFor="RegisterName">
                      আপনার নাম
                    </label>
                    <Input id="RegisterName" type="text" placeholder="Harry" />
                  </div>
                  <div className="mb-4 text-left">
                    <label className="font-semibold" htmlFor="LoginEmail">
                      ইমেইল
                    </label>
                    <Input
                      id="LoginEmail"
                      type="email"
                      placeholder="name@example.com"
                    />
                  </div>
                  <InputPassword label="পাসওয়ার্ড" />

                  <div className="mb-4">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full">
                      অ্যাকাউন্ট তৈরি
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

              <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 text-center">
                <p className="mb-0 text-gray-400 font-medium">
                  ©{new Date().getFullYear()} Jobstack
                </p>
              </div>
            </TabsContent>
            <TabsContent value="company">
              <form className="text-left">
                <div className="grid grid-cols-1">
                  <div className="mb-4 text-left">
                    <label className="font-semibold" htmlFor="RegisterName">
                      আপনার নাম
                    </label>
                    <Input id="RegisterName" type="text" placeholder="Harry" />
                  </div>
                  <div className="mb-4 text-left">
                    <label className="font-semibold" htmlFor="LoginEmail">
                      ইমেইল
                    </label>
                    <Input
                      id="LoginEmail"
                      type="email"
                      placeholder="name@example.com"
                    />
                  </div>
                  <InputPassword label="পাসওয়ার্ড" />

                  <div className="mb-4">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full">
                      অ্যাকাউন্ট তৈরি
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

              <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 text-center">
                <p className="mb-0 text-gray-400 font-medium">
                  ©{new Date().getFullYear()} Jobstack
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
