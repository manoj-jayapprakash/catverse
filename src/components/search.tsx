"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const Search = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const query = (formElement.search as HTMLInputElement).value.trim();

    if (!query) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      method="GET"
      action="/search"
      className="ml-auto"
    >
      <div className="relative">
        <Input name="search" placeholder="Search" className="w-72 pe-10" />
        <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </form>
  );
};
