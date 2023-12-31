import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils.ts";

interface MainProps {
  className?: string;
  children: ReactNode;
}

export const Main: FC<MainProps> = ({ children, className }) => {
  return <main className={cn("main", className)}>{children}</main>;
};
