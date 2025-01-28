import { api_client } from "@/lib/axios";
import { TUser } from "@/utils/types/user";
import { useEffect, useState } from "react";

const useUserById = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<TUser>();
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUser() {
    setIsLoading(true);
    api_client
      .get(`user/${userId}`)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return { user, isLoading, refetch: fetchUser };
};

export default useUserById;
