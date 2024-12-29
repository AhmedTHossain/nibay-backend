"use client";

import { AppLogo } from "@/app/assets/AppLogo";
import { useUserInfo } from "@/app/hooks/useUserInfo";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from "@/components/ui/menubar";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useMotionValue, useScroll } from "framer-motion";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar } from "../common/Avatar";
import { Navigation } from "./Navigation";

const Header = () => {
  const { scrollY } = useScroll();
  const height = useMotionValue(80);
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (current) => {
      const diff = (current - Number(scrollY.getPrevious())) * 0.1;
      if (diff > 0) {
        height.set(Math.max(height.get() - diff, 72));
      } else {
        height.set(Math.min(height.get() - diff, 80));
      }
      if (current > 100) setHasShadow(true);
      else setHasShadow(false);
    });
  }, [scrollY]); // eslint-disable-line

  return (
    <div
      className={cn(
        "py-5 fixed w-full z-50 bg-gradient-to-b from-emerald-600/20 dark:from-emerald-600/40 via-emerald-600/10 dark:via-emerald-600/20 to-transparent",
        hasShadow ? "shadow bg-white dark:bg-emerald-700" : ""
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between w-full">
          <AppLogo />

          <div className="flex space-x-3 items-center">
            <Navigation />
            <ProfileMenu />
            {/* <ModeToggle /> */}
            <div>
              <Switch id="switch-lang" color="green" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

function ProfileMenu() {
  const router = useRouter();
  const { user, isLoading } = useUserInfo();

  return (
    <Menubar className="border-0 bg-transparent dark:bg-transparent dark:border-0">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-transparent dark:bg-transparent data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent">
          <Avatar title="FS" image={`/uploads/${user?.profilePhoto}`} />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            className="gap-2"
            onClick={() => {
              router.push("/settings");
            }}
          >
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
