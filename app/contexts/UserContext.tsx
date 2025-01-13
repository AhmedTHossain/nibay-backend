import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode
} from "react";
import { api_client } from "@/lib/axios";
import { TUser } from "@/utils/types/user";

interface UserContextProps {
  users: TUser[];
  isLoading: boolean;
  addUser: (user: TUser) => Promise<void>;
  updateUser: (id: string, updatedUser: TUser) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await api_client.get("/api/users");
      setUsers(res.data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addUser = async (user: TUser) => {
    try {
      const res = await api_client.post("/api/users", user);
      setUsers([...users, res.data.data]);
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const updateUser = async (id: string, updatedUser: TUser) => {
    try {
      const res = await api_client.put(`/api/users/${id}`, updatedUser);
      setUsers(users.map((user) => (user.id === id ? res.data.data : user)));
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await api_client.delete(`/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        isLoading,
        addUser,
        updateUser,
        deleteUser,
        refetch: fetchUsers
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
