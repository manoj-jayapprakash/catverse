import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "@/components/search";
import { Profile } from "@/components/ui/avatar-button";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link href={"/"}>
          <Image
            src="/images/logo.png"
            alt="Catverse Logo"
            width={100}
            height={100}
          />
        </Link>
        <Search />
        <Profile />
      </div>
    </header>
  );
};
