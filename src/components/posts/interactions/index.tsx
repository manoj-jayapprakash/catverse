"use client";

import { MoreHorizontal, MoreVertical, UserPlus } from "lucide-react";
import React, { useState } from "react";
import { useSession } from "../../providers/session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { type TPostWithUser } from "@/lib/types";
import { DeletePost } from "./delete-post";

export const PostMoreInteractions = ({ post }: { post: TPostWithUser }) => {
  const { user } = useSession();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const triggrDeleteOpen = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserPlus className="mr-2 size-4" /> Follow @{post.user.username}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeletePost post={post} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
