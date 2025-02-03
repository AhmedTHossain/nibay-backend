"use client";

import { Suspense, use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Phone,
  Mail,
  Briefcase,
  User,
  Loader,
  PenIcon,
  Edit,
  Trash
} from "lucide-react";
import { api_client } from "@/lib/axios";
import { TUser } from "@/utils/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { USER_ROLE } from "@/lib/constant";
import { formatEnglishToBangalNum } from "@/utils/formatEtoBLang";
import { set } from "mongoose";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { SidebarNav } from "../components/sidebar-nav";
import Header from "@/app/components/header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserDeleteModal } from "@/app/admin/components/UserDeleteModal";
import UserCard from "./UserCard";
import { toast } from "sonner";

function UserList() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typeName, setTypeName] = useState<string>("সকল");
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const params = useSearchParams();

  useEffect(() => {
    const type = params.get("type");
    if (type == "individual") {
      setTypeName("ব্যক্তি");
    } else if (type == "institution") {
      setTypeName("প্রতিষ্ঠান");
    } else {
      setTypeName("সকল");
    }
  }, [params]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      setUsers([]);
      const query = params.get("type")
        ? `user?searchByPhone=${searchTerm}&type=${params.get("type")}`
        : `user?searchByPhone=${searchTerm}`;
      try {
        const resp = await api_client.get(query);
        setUsers(resp.data.data.users);
      } catch (e) {
        toast.error("দুঃখিত! ইউজার লিস্ট লোড করা যায়নি");
      }
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, params]);

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto grid flex-1 gap-12 pt-[100px] md:grid-cols-[150px_1fr] ">
        <aside className="hidden flex-col md:flex">
          <SidebarNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8 text-green-800 flex items-center">
              <User className="mr-2" size={32} />
              ইউজার লিস্ট ({typeName})
            </h1>
            <div className="mb-8 relative">
              <Input
                type="text"
                placeholder="ফোন নম্বর দিয়ে সার্চ করুন"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-green-200 focus:border-green-500 focus:ring-green-500"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <UserCard user={user} setUsers={setUsers} key={user._id} />
              ))}
            </div>
            {users.length === 0 && isLoading == false && (
              <p className="text-center mt-8 text-gray-600">
                No users found matching your search.
              </p>
            )}
            {isLoading && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Loader size={22} className="animate-spin" />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default function Users() {
  return (
    <Suspense>
      <UserList />
    </Suspense>
  );
}
