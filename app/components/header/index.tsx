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
import {
  LogOutIcon,
  MonitorCog,
  MonitorCogIcon,
  SettingsIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navigation } from "./Navigation";
import AdminPanel from "@/app/admin/page";
import { ModeToggle } from "../common/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserById from "@/app/hooks/users/useUserById";
import { userInfo } from "os";
import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "../common/LanguageSwitcher";

interface HeaderProps {
  userId?: string;
  isAdminRoute?: boolean;
}

const Header = ({ userId, isAdminRoute }: HeaderProps) => {
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
      if (current > (isAdminRoute ? 20 : 100)) setHasShadow(true);
      else setHasShadow(false);
    });
  }, [scrollY]); // eslint-disable-line

  return (
    <div
      className={cn(
        "py-5 fixed w-full z-50 bg-gradient-to-b from-emerald-600/20 dark:from-emerald-600/20 via-emerald-600/10 dark:via-emerald-600/10 to-transparent",
        hasShadow ? "shadow bg-white dark:shadow-lg dark:bg-emerald-950" : ""
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between w-full">
          <AppLogo userId={userId} />

          <div className="flex space-x-3 items-center">
            <Navigation />
            <ProfileMenu userId={userId} />
            <div className="flex gap-5">
              <ModeToggle />
              <LanguageSwitcher />
              {/* <Switch id="switch-lang" color="green" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

interface ProfileMenuProps {
  userId?: string;
  userName?: string;
}

const ProfileMenu = ({ userId, userName }: ProfileMenuProps) => {
  const t = useTranslations("Header");

  const router = useRouter();
  const userById = useUserById({ userId: userId ?? "" });
  const userInfo = useUserInfo();
  const user = userId ? userById.user : userInfo.user;

  return (
    <Menubar className="border-0 bg-transparent dark:bg-transparent dark:border-0">
      <MenubarMenu>
        <MenubarTrigger className="space-x-3 focus:bg-transparent dark:bg-transparent data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent">
          <Avatar>
            <AvatarImage
              src={user?.profilePhoto}
              alt="profile photo"
              className="object-cover"
            />
            <AvatarFallback className="text-3xl">
              {user?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span>{user?.name}</span>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            className="gap-2"
            onClick={() => {
              router.push(
                (userId ? `/admin/users/${userId}` : "") + "/settings"
              );
            }}
          >
            <SettingsIcon size={18} strokeWidth={1.5} />{" "}
            <span>{t("settings")}</span>
          </MenubarItem>
          <>
            {user?.isAdmin && (
              <>
                <MenubarSeparator />
                <MenubarItem
                  className="gap-2"
                  onClick={() => {
                    router.push("/admin/");
                  }}
                >
                  <MonitorCogIcon size={18} strokeWidth={1.5} />
                  <span>{t("admin")}</span>
                </MenubarItem>
              </>
            )}
            <MenubarSeparator />
            <MenubarItem
              className="gap-2"
              onClick={() => {
                if (userId) {
                  router.push("/admin/");
                } else {
                  localStorage.clear();
                  router.push("/auth/login");
                }
              }}
            >
              <LogOutIcon size={18} strokeWidth={1.5} />{" "}
              <span>{t("logout")}</span>
            </MenubarItem>
          </>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
