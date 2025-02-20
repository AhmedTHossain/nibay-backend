"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, LayoutDashboard, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function SidebarNav() {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();

  const links = [
    {
      title: t("dashboard"),
      href: "/admin",
      icon: LayoutDashboard
    },
    // {
    //   title: t("job_management"),
    //   href: "/admin/jobs",
    //   icon: Briefcase
    // },
    {
      title: t("user_management"),
      href: "/admin/user-management",
      icon: Users
    }
  ];

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
