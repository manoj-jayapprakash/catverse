"use client";

import {
  type InfiniteData,
  type QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { createPost, deletePost } from "@/actions/posts";
import { type TInfinitePostWithCursor } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";

const FOR_YOU_FEED_QUERY_KEY = ["post-feed", "for-you"];

export const useSubmitPostMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters = { queryKey: FOR_YOU_FEED_QUERY_KEY };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<
        InfiniteData<TInfinitePostWithCursor, number | null>
      >(queryFilter, (oldData) => {
        const firstPage = oldData?.pages[0];

        if (firstPage) {
          return {
            pageParams: oldData.pageParams,
            pages: [
              {
                posts: [newPost, ...firstPage.posts],
                nextCursor: firstPage.nextCursor,
              },
            ],
          };
        }
      });
      await queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      toast({
        description: "Post created",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to post. Please try again.",
      });
    },
  });
  return mutation;
};

export const useDeletePostMutation = () => {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      const queryFilter: QueryFilters = { queryKey: ["post-feed"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<
        InfiniteData<TInfinitePostWithCursor, number | null>
      >(queryFilter, (oldData) => {
        if (!oldData) return;

        return {
          pageParams: oldData.pageParams,
          pages: oldData.pages.map((page) => ({
            nextCursor: page.nextCursor,
            posts: page.posts.filter((post) => post.id !== deletedPost.id),
          })),
        };
      });
      toast({
        description: "Post deleted",
      });

      if (pathname === `/posts/${deletedPost.id}`) {
        router.push(`/users/${deletedPost.user.username}`);
      }
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to delete post. Please try again.",
      });
    },
  });

  return mutation;
};
