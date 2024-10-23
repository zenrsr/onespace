import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DotSeparartor } from "./dot-separator";
import Navigation from "./navigation";
import WorkspaceSwitcher from "./workspace-switcher";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href={"/"} className="flex items-center mb-2">
        <div className="flex items-center gap-2 hover:scale-105 transition-all duration-150">
          <Image src={"/logo.svg"} alt="logo" width={56} height={56} />
          <h1 className="text-3xl font-extrabold font-mono">OneSpace</h1>
        </div>
      </Link>
      <DotSeparartor className="my-4" />
      <WorkspaceSwitcher />
      <DotSeparartor className="my-4" />
      <Navigation />
    </aside>
  );
};

export default Sidebar;
