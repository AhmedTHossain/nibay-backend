import { useEffect } from "react";
import { useRouter } from "next/navigation";
import storage from "@/lib/storage";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = storage.getToken();
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);
};
