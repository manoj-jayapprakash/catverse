import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AvatarButton } from "@/components/ui/avatar-button";
import { Search } from "@/components/search";

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
        <AvatarButton className="ml-auto" />
      </div>
    </header>
  );
};
