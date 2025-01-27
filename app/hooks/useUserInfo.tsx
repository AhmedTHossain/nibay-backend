import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import storage from "@/lib/storage";
import { api_client } from "@/lib/axios";
import { TUser } from "@/utils/types/user";

export const useUserInfo = () => {
  const router = useRouter();
  const [user, setUser] = useState<TUser>();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);

  useEffect(() => {
    const token = storage.getToken();
    if (!token) {
      router.push("/auth/login");
    }
  }, [router, isLoading]);

  const fetchCurrentUser = () => {
    api_client("auth/me")
      .then((res) => {
        if (res.data.status === "success") {
          setUser(res.data.user);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchCurrentUser();
  }, [isRefetch]);

  return { user, setUser, isLoading, setIsRefetch };
};
