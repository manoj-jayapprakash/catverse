import { PostEditor } from "@/components/posts/editor";
import { ForYouFeed } from "./for-you-feed";

export default function HomePage() {
  return (
    <main className="w-full">
      <PostEditor />
      <ForYouFeed />
    </main>
  );
}
