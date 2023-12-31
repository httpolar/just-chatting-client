import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner.tsx";

export const RootRoute: FC = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};
