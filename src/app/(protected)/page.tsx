import Image from "next/image";
import { db } from "@/server/db";
import { useSession } from "@/components/providers/session";

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <Image
      src="https://utfs.io/f/ffe98042-9198-4fab-ba71-2ac45360e98e-1puyqz.png"
      alt="Minun"
      width={400}
      height={400}
    />
  );
}
