"use client";

import { getForYouPosts } from "@/actions/posts";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { Post } from "@/components/posts/post";
import { postsWithUserSchema } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

export const ForYouFeed = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "for-you"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getForYouPosts(pageParam);

      return res;
    },
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts =
    data?.pages.flatMap((page) => {
      return page.posts;
    }) ?? [];

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error")
    return <p>Unable to load posts at this moment. Please try later</p>;

  if (status === "success" && !posts.length && !hasNextPage)
    return <p>There is no content to see</p>;

  const parsedPosts = postsWithUserSchema.parse(posts);

  return (
    <InfiniteScroll
      className="my-8 space-y-4"
      onLoadMore={async () => {
        hasNextPage && !isFetching && (await fetchNextPage());
      }}
    >
      {parsedPosts.map((postdb) => (
        <Post key={postdb.id} post={postdb} />
      ))}
      {isFetchingNextPage && <p>Loading....</p>}
    </InfiniteScroll>
  );
};
