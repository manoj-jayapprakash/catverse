import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserAvatarProps = {
  avatarUrl: string | null;
  className?: string;
};

export const UserAvatar = ({ avatarUrl, className }: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={avatarUrl ?? undefined} />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
};
