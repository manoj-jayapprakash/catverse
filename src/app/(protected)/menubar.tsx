import { Button } from "@/components/ui/button";
import { Bell, Bookmark, Home, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
const menus = [
  {
    id: "menu-1",
    label: "Feed",
    icon: <Home className="size-4" />,
    url: "/",
  },
  {
    id: "menu-2",
    label: "Notifications",
    icon: <Bell className="size-4" />,
    url: "/notifications",
  },
  {
    id: "menu-3",
    label: "Bookmarks",
    icon: <Bookmark className="size-4" />,
    url: "/bookmarks",
  },
  {
    id: "menu-4",
    label: "Messages",
    icon: <Mail className="size-4" />,
    url: "/messages",
  },
];
export const Menubar = ({ className }: { className?: string }) => {
  return (
    <aside className={className}>
      {menus.map((menu) => (
        <Link
          key={menu.id}
          href={menu.url}
          className="flex items-center justify-start gap-3 xl:text-lg"
          title={menu.label}
        >
          {menu.icon}
          <span className="hidden lg:inline">{menu.label}</span>
        </Link>
      ))}
    </aside>
  );
};
