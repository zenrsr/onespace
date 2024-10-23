"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
  image?: string;
  name: string;
  className?: string;
}

const WorkspaceAvatar = ({ image, name, className }: Props) => {
  if (image) {
    return (
      <div
        className={cn("size-10 relative rounded-md overflow-hidden", className)}
      >
        <Image
          src={image}
          alt="workspace avatar"
          fill
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <Avatar className={cn()}>
      <AvatarFallback className="text-white bg-black font-semibold text-lg uppercase rounded-md">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default WorkspaceAvatar;
