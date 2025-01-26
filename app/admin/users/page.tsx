"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Phone, Mail, Briefcase, User, Loader } from "lucide-react";
import { api_client } from "@/lib/axios";
import { TUser } from "@/utils/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { USER_ROLE } from "@/lib/constant";
import { formatEnglishToBangalNum } from "@/utils/formatEtoBLang";
import { set } from "mongoose";
import { AnimatePresence, motion } from "framer-motion";

export default function UserList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      setUsers([]);
      const res = await api_client.get(`user?searchByPhone=${searchTerm}`);
      setUsers(res.data.data.users);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-green-800 flex items-center">
        <User className="mr-2" size={32} />
        ইউজার লিস্ট
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
          <Link
            href={`/admin/users/${user._id}`}
            key={user._id}
            className="no-underline"
          >
            <Card className="hover:shadow-lg transition-shadow duration-200 border-green-100 h-full flex flex-col">
              <CardHeader className="bg-green-50 border-b border-green-100 flex flex-row items-center gap-3 space-y-0 p-3">
                <Avatar>
                  <AvatarImage
                    src={user.profilePhoto}
                    alt="Applicant"
                    className="object-cover"
                  />
                  <AvatarFallback className="text-3xl object-cover">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-green-800 flex items-center text-md">
                  {user.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                <p className="text-sm text-gray-600 flex items-center mb-1">
                  <Phone className="mr-2 text-green-600" size={12} />
                  {formatEnglishToBangalNum(user.phone)}
                </p>
                {user.email && (
                  <p className="text-sm text-gray-600 flex items-center mb-1">
                    <Mail
                      className="mr-2 text-green-600 flex-shrink-0"
                      size={12}
                    />
                    <span className="truncate">{user.email}</span>
                  </p>
                )}
                {user.role && (
                  <p className="text-sm text-gray-600 flex items-center">
                    <Briefcase className="mr-2 text-green-600" size={12} />
                    {
                      // @ts-expect-error: enum type issue
                      USER_ROLE[Number(user.role)]?.label
                    }
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
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
  );
}
