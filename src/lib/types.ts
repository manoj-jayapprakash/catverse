import { posts, users } from "@/server/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const selectPostSchema = createSelectSchema(posts);
const selectUserSchema = createSelectSchema(users);

export const postWithUserSchema = selectPostSchema.extend({
  user: selectUserSchema.pick({
    displayName: true,
    username: true,
    avatarUrl: true,
  }),
});

export const postsWithUserSchema = z.array(postWithUserSchema);

export type TPostWithUser = z.infer<typeof postWithUserSchema>;
