import Image from "next/image";
import { db } from "@/server/db";
import { useSession } from "@/components/providers/session";

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Image
        src="https://utfs.io/f/ffe98042-9198-4fab-ba71-2ac45360e98e-1puyqz.png"
        alt="Minun"
        width={400}
        height={400}
      />
    </div>
  );
}
