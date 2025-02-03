"use client";

import { useEffect } from "react";
import { useUserInfo } from "../hooks/useUserInfo";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { user, isLoading } = useUserInfo();
  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      {isLoading && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center fixed inset-0 bg-white bg-opacity-90 z-50"
          >
            <Loader size={22} className="animate-spin" />
          </motion.div>
        </AnimatePresence>
      )}
      {user && user.isAdmin && children}
    </>
  );
}
