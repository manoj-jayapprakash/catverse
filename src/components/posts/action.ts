"use server";

import { validateRequest } from "@/lib/auth/validate-request";
import { CreatPostSchema, type TCreatePost } from "@/lib/validations";
import { db } from "@/server/db";
import { posts } from "@/server/db/schema";

export const createPost = async (input: TCreatePost) => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const parsedInput = CreatPostSchema.parse(input);

  await db.insert(posts).values({ content: parsedInput, userId: user.id });
  //
};
