import { PostEditor } from "@/components/posts/editor";
import { Post } from "@/components/posts/Post";
import { postsWithUserSchema } from "@/lib/types";
import { db } from "@/server/db";

export default async function HomePage() {
  const posts = await db.query.posts.findMany({
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
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

  const parsedPosts = postsWithUserSchema.parse(posts);

  return (
    <main className="w-full">
      <PostEditor />
      <ul className="my-8 space-y-4">
        {parsedPosts.map((post) => (
          <li key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </main>
  );
}
