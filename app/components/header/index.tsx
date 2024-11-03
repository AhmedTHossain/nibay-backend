"use client";

import app_logo_black from "@/app/assets/logo-black.png";
import app_logo_white from "@/app/assets/logo-white.png";
import { Input } from "@/components/ui/input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from "@/components/ui/menubar";
import { LogOutIcon, SearchIcon, SettingsIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "../common/Avatar";
import { ModeToggle } from "../common/ModeToggle";
import { Navigation } from "./Navigation";
import { useRouter } from "next/navigation";

const Header = () => {
  return (
    <div className="py-6 fixed w-full z-50 bg-gradient-to-b from-emerald-600/20 dark:from-emerald-600/40 via-emerald-600/10 dark:via-emerald-600/20 to-transparent">
      <div className="container">
        <div className="flex items-center justify-between">
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

          <Navigation />

          <div className="flex items-center">
            <div className="relative flex items-center">
              <Input
                type="text"
                placeholder="Search..."
                className="rounded-3xl"
              />
              <SearchIcon size={18} className="absolute right-2 top-2" />
            </div>

            <ProfileMenu />
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

function ProfileMenu() {
  const router = useRouter();

  return (
    <Menubar className="border-0 bg-transparent dark:bg-transparent dark:border-0">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-transparent dark:bg-transparent data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent">
          <Avatar title="FS" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="gap-2">
            <UserIcon size={18} strokeWidth={1.5} /> <span>আপনার প্রোফাইল</span>
          </MenubarItem>
          <MenubarItem className="gap-2">
            <SettingsIcon size={18} strokeWidth={1.5} /> <span>সেটিংস</span>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            className="gap-2"
            onClick={() => {
              localStorage.clear();
              router.push("/auth/login");
            }}
          >
            <LogOutIcon size={18} strokeWidth={1.5} /> <span>লগ আউট</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
