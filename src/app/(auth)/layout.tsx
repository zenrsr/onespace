"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src={"/logo.svg"} alt="logo" width={62} height={56} />
            <h1 className="text-4xl font-extrabold font-mono">OneSpace</h1>
          </div>
          <Button asChild className="" variant={"primary"}>
            <Link href={pathname === "/sign-up" ? "/sign-in" : "/sign-up"}>
              {pathname === "/sign-up" ? "Login" : "Register"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
