import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { AdminAuthTypes } from "../types/types";

const AdminAuthContext = createContext<{
  adminAuth: AdminAuthTypes | null;
  setAdminAuth: Dispatch<SetStateAction<AdminAuthTypes | null>>;
  isLoading: boolean;
}>;

export const AdminAuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [adminAuth, setAdminAuth] = useState<AdminAuthTypes>;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin");
    if (storedUser) {
      setAdminAuth(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  return (
    <AdminAuthContext.Provider value={(adminAuth, setAdminAuth, isLoading)}>
      {children}
    </AdminAuthContext.Provider>
  );
};
