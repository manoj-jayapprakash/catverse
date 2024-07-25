import { type TPostWithUser } from "@/lib/types";
import React from "react";
import { UserAvatar } from "@/components/ui/user-avatar";
import Link from "next/link";
import {
  Bookmark,
  Clock,
  MessageSquare,
  MoreVertical,
  ThumbsUp,
} from "lucide-react";
import { getDurationFromCurrentDate } from "@/lib/utils";

export const Post = ({ post }: { post: TPostWithUser }) => {
  const { content, createdAt, user } = post;
  return (
    <article className="space-y-4 rounded-lg bg-card p-4 shadow-sm">
      <header className="flex items-center">
        <Link href={`/user/${user.username}`}>
          <UserAvatar avatarUrl={user.avatarUrl} />
        </Link>
        <div className="ml-2">
          <strong>{user.displayName}</strong>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="size-3" />
            {getDurationFromCurrentDate(createdAt)}
          </p>
        </div>
        <div className="ml-auto flex gap-2 text-muted-foreground">
          <Bookmark className="size-4" />
          <MoreVertical className="size-4" />
        </div>
      </header>
      <p>{content}</p>
      <hr />
      <ul className="flex items-center gap-4 text-muted-foreground">
        <li className="flex items-center gap-1">
          <ThumbsUp className="size-4" />
          Like
        </li>
        <li className="flex items-center gap-1">
          <MessageSquare className="size-4" />
          Comment
        </li>
      </ul>
    </article>
  );
};
