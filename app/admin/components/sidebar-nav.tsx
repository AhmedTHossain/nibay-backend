"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, LayoutDashboard, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard
  },
  {
    title: "Jobs",
    href: "/admin/jobs",
    icon: Briefcase
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users
  }
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link key={link.href} href={link.href}>
            <Button
              variant={pathname === link.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                pathname === link.href && "bg-emerald-100 hover:bg-emerald-200"
              )}
            >
              <LinkIcon className="h-4 w-4" />
              {link.title}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
