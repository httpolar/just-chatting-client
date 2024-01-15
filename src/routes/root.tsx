import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner.tsx";
import { Header } from "@/components/header.tsx";
import { useUserStore } from "@/stores/user.ts";

export const RootRoute: FC = () => {
  const userStore = useUserStore();

  useEffect(() => {
    void userStore.getUser();
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
};
