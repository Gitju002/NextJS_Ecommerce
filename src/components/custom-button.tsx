import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const CustomButton = ({
  children,
  onClick,
  className,
  type,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}) => {
  return (
    <Button
      variant={"secondary"}
      type={type || "button"}
      className={cn(
        "text-xl h-auto font-medium bg-white/5 border-2 border-violet-500 text-violet-400 hover:text-white hover:bg-violet-500 rounded-xl",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
