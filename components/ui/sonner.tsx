"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          error:
            "group toast group-[.toaster]:bg-red-300 group-[.toaster]:text-red-800 dark:group-[.toaster]:bg-red-800 dark:group-[.toaster]:text-red-300",
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-neutral-950 group-[.toaster]:border-neutral-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-neutral-900 dark:group-[.toaster]:text-neutral-200 dark:group-[.toaster]:border-neutral-700 dark:group-[.toaster]:shadow-neutral-800",
          description:
            "group-[.toast]:text-neutral-500 dark:group-[.toast]:text-neutral-400",
          actionButton:
            "group-[.toast]:bg-neutral-900 group-[.toast]:text-neutral-50 dark:group-[.toast]:bg-neutral-50 dark:group-[.toast]:text-neutral-900 dark:group-[.toast]:hover:bg-neutral-700",
          cancelButton:
            "group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-500 dark:group-[.toast]:bg-neutral-800 dark:group-[.toast]:text-neutral-400 dark:group-[.toast]:hover:bg-neutral-600"
        }
      }}
      {...props}
    />
  );
};

export { Toaster };
