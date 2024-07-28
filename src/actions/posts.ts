"use server";

import { validateRequest } from "@/lib/auth/validate-request";
import { db } from "@/server/db";
import { CreatPostSchema, type TCreatePost } from "@/lib/validations";
import { posts } from "@/server/db/schema";
import { type TPostWithUser } from "@/lib/types";
import { eq } from "drizzle-orm";

export const getForYouPosts = async (cursor: number | null) => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const postCount = 2;

  const result = await db.query.posts.findMany({
    with: {
      user: {
        columns: {
          avatarUrl: true,
          username: true,
          displayName: true,
        },
      },
    },
    orderBy: (postsTable, { desc }) => desc(postsTable.createdAt),
    where: (postsTable, { lte }) =>
      cursor ? lte(postsTable.id, cursor) : undefined,
    limit: postCount + 1,
  });

  const nextCursor =
    result.length > postCount ? (result[postCount]?.id ?? null) : null;

  return {
    posts: result.slice(0, postCount),
    nextCursor,
  };
};

export const getPostById = async (postId: number) => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const result = await db.query.posts.findFirst({
    where: (postsTable, { eq }) => eq(posts.id, postId),
    with: {
      user: {
        columns: {
          displayName: true,
          username: true,
          avatarUrl: true,
        },
      },
    },
  });

  if (!result) throw new Error("Post not found");

  return result;
};

export const createPost = async (input: TCreatePost) => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const parsedInput = CreatPostSchema.parse(input);

  const [insertedPost] = await db
    .insert(posts)
    .values({ content: parsedInput, userId: user.id })
    .returning();

  if (!insertedPost)
    throw new Error("Unable to create Post now. Please try again later");

  const newPostWithUserDetails = await db.query.posts.findFirst({
    where: (postsTable, { eq }) => eq(postsTable.id, insertedPost.id),
    with: {
      user: {
        columns: {
          avatarUrl: true,
          username: true,
          displayName: true,
        },
      },
    },
  });

  return newPostWithUserDetails as TPostWithUser;
};

export const deletePost = async (postId: number) => {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const post = await getPostById(postId);

  if (post.userId !== user.id) throw new Error("Unauthorized");

  const [deletedPost] = await db
    .delete(posts)
    .where(eq(posts.id, postId))
    .returning();

  if (!deletedPost) throw new Error("Unable to delete post");

  return post;
};
