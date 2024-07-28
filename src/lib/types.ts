import { posts, users } from "@/server/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const dateSchema = z
  .string()
  .or(z.date())
  .transform((val) => new Date(val));

const basePostSchema = createSelectSchema(posts);
const baseUserSchema = createSelectSchema(users);

const postSchema = basePostSchema.extend({
  createdAt: dateSchema,
  updatedAt: dateSchema,
});

const userSchema = baseUserSchema.extend({
  createdAt: dateSchema,
  updatedAt: dateSchema,
  lastLogin: dateSchema.nullable(),
});

export const postWithUserSchema = postSchema.extend({
  user: userSchema.pick({
    displayName: true,
    username: true,
    avatarUrl: true,
  }),
});

export const postsWithUserSchema = z.array(postWithUserSchema);

export type TPostWithUser = z.infer<typeof postWithUserSchema>;

export type TInfinitePostWithCursor = {
  posts: TPostWithUser[];
  nextCursor: number | null;
};
