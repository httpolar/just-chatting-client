import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner.tsx";
import { Header } from "@/components/header.tsx";

export const RootRoute: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
};
