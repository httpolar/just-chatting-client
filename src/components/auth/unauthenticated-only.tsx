import { FC, Fragment, ReactNode, useEffect } from "react";
import { useUserStore } from "@/stores/user.ts";
import { useNavigate } from "react-router-dom";

interface UnauthenticatedOnlyProps {
  children: ReactNode;
  redirect?: string;
}

export const UnauthenticatedOnly: FC<UnauthenticatedOnlyProps> = ({ children, redirect = "/" }) => {
  const userStore = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userStore.isAuthenticated === true) {
      navigate(redirect);
    }
  }, [userStore.isAuthenticated, userStore.token]);

  return <Fragment>{children}</Fragment>;
};
