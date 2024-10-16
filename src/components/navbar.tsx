import UserButton from "@/feats/auth/components/user-button";
import React from "react";
import MobileSidebar from "./mobile-sidebar";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex ">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-muted-foreground">
          Monitor all of your projects and tasks
        </p>
      </div>

      <UserButton />
      <MobileSidebar />
    </nav>
  );
};

export default Navbar;
