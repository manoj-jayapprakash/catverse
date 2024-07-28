"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeletePostMutation } from "../queries";
import { Trash2 } from "lucide-react";
import { type TPostWithUser } from "@/lib/types";

export const DeletePost = ({ post }: { post: TPostWithUser }) => {
  const mutation = useDeletePostMutation();

  const onDelete = () => {
    mutation.mutate(post.id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <p className="flex items-center">
          <Trash2 className="mr-2 size-4" /> Delete Post
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90"
            onClick={onDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
