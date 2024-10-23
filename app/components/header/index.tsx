import AppLogo from "@/app/assets/logo.png";
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
import { Avatar } from "../common/Avatar";
import { Navigation } from "./Navigation";
import { ModeToggle } from "../common/ModeToggle";

const Header = () => {
  return (
    <div className="py-6 fixed w-full z-50 bg-gradient-to-b from-emerald-600/20 dark:from-emerald-600/40 via-emerald-600/10 dark:via-emerald-600/20 to-transparent">
      <div className="container">
        <div className="flex items-center justify-between">
          <Image src={AppLogo} alt="App logo" />

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
  return (
    <Menubar className="border-0 bg-transparent dark:bg-transparent dark:border-0">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-transparent dark:bg-transparent data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent">
          <Avatar title="FS" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="gap-2">
            <UserIcon size={18} strokeWidth={1.5} /> <span>Profile</span>
          </MenubarItem>
          <MenubarItem className="gap-2">
            <SettingsIcon size={18} strokeWidth={1.5} /> <span>Settings</span>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="gap-2">
            <LogOutIcon size={18} strokeWidth={1.5} /> <span>Logout</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
