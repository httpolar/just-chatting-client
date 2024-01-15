import { FC, Fragment, ReactNode, useEffect } from "react";
import { useUserStore } from "@/stores/user.ts";
import { useNavigate } from "react-router-dom";

interface AuthenticatedOnlyProps {
  children: ReactNode;
  redirect?: string;
}

export const AuthenticatedOnly: FC<AuthenticatedOnlyProps> = ({
  children,
  redirect = "/login",
}) => {
  const userStore = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userStore.isAuthenticated === false || typeof userStore.user !== "object") {
      navigate(redirect);
    }
  }, [userStore.isAuthenticated, userStore.user]);

  return <Fragment>{children}</Fragment>;
};
