import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils.ts";

interface ContainerProps {
  className?: string;
  children?: ReactNode;
}

export const Container: FC<ContainerProps> = ({className,children}) => {
  const classes = cn("max-w-screen-xl mx-auto", className)

  return <div className={classes}>{children}</div>
}