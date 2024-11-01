"use client";

import Image from "next/image";
import app_logo_black from "@/app/assets/logo-black.png";
import app_logo_white from "@/app/assets/logo-white.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function LoginRoute() {
  return (
    <div className="container">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
          <div className="p-6">
            <Link href="/">
              <Image
                src={app_logo_black}
                alt="App logo"
                className="h-[24px] inline-block dark:hidden"
              />
              <Image
                src={app_logo_white}
                alt="App logo"
                className="h-[24px] hidden dark:inline-block"
              />
            </Link>
            <h5 className="my-6 text-xl font-semibold">Login</h5>
            <form className="text-left">
              <div className="grid grid-cols-1">
                <div className="mb-4 ltr:text-left rtl:text-right">
                  <label className="font-semibold" htmlFor="LoginEmail">
                    Email Address:
                  </label>
                  <Input
                    id="LoginEmail"
                    type="email"
                    className="mt-3"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="mb-4 ltr:text-left rtl:text-right">
                  <label className="font-semibold" htmlFor="LoginPassword">
                    Password:
                  </label>
                  <Input
                    id="LoginPassword"
                    type="password"
                    className="mt-3"
                    placeholder="Password:"
                  />
                </div>
                <div className="flex justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <p className="text-slate-400 mb-0">
                    <a className="text-slate-400" href="/reset-password">
                      Forgot password ?
                    </a>
                  </p>
                </div>
                <div className="mb-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full">
                    Login / Sign in
                  </Button>
                </div>
                <div className="text-center">
                  <span className="text-slate-400 me-2">
                    Don&apos;t have an account ?
                  </span>{" "}
                  <Link
                    className="text-black dark:text-white font-bold"
                    href="/auth/signup"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 text-center">
            <p className="mb-0 text-gray-400 font-medium">
              ©{new Date().getFullYear()} Jobstack
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
