"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  {
    id: 1,
    title: "আমাদের সম্পর্কে",
    link: "/about"
  },
  {
    id: 2,
    title: "যোগাযোগ",
    link: "/contact"
  },
  {
    id: 3,
    title: "প্রাইভেসি পলিসি",
    link: "/privacy-policy"
  },
  {
    id: 4,
    title: "শর্তাবলী এবং নীতিমালা",
    link: "/terms-of-services"
  }
];

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {NAV_ITEMS.map((item) => {
          return (
            <NavigationMenuItem key={item.id}>
              <Link href={item.link} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
