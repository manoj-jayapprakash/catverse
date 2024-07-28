"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "@/components/providers/session";
import "./styles.css";
import { useSubmitPostMutation } from "../queries";

export const PostEditor = () => {
  const { user } = useSession();
  const mutation = useSubmitPostMutation();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's your purrfect doing?",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) ?? "";

  async function onSubmit() {
    mutation.mutate(input, {
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto p-1"
        />
      </div>
      <Button
        onClick={onSubmit}
        disabled={!input.trim() || mutation.isPending}
        className="ml-auto w-20"
      >
        Post
      </Button>
    </div>
  );
};
