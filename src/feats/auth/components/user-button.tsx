"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Loader, LogOut } from "lucide-react";

import React from "react";
import { useCurrent } from "../api/use-current";
import { DotSeparartor } from "@/components/dot-separator";
import { useLogOut } from "../api/use-logout";
import { useRandomImage } from "../api/use-random-image";

const UserButton = () => {
  const { data: user, isLoading: isUserLoading } = useCurrent();
  const { mutate: logout } = useLogOut();
  const { isLoading: isImageLoading } = useRandomImage();

  if (isUserLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) return null;

  const { name, email } = user;
  const fallback = name.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300 cursor-pointer">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {fallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4 ">
          <Avatar className="size-[56px] border border-neutral-300 cursor-pointer">
            {isImageLoading ? (
              <AvatarFallback>
                <Loader className="size-4 animate-spin" />
              </AvatarFallback>
            ) : (
              <AvatarFallback className="bg-neutral-200 font-medium text-xl text-neutral-500 flex items-center justify-center">
                {fallback}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {name || "User"}
            </p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <DotSeparartor className="mb-1" />

        <DropdownMenuItem
          onClick={() => logout()}
          className="h-10 flex items-center justify-center text-zinc-700 font-medium cursor-pointer"
        >
          <LogOut className="size-4 mr-2" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
