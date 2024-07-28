import { validateRequest } from "@/lib/auth/validate-request";
import { db } from "@/server/db";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const cursor = req.nextUrl.searchParams.get("cursor");
    const pageSize = 10;

    const posts = await db.query.posts.findMany({
      with: {
        user: {
          columns: {
            displayName: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      where: (posts, { gt }) => (cursor ? gt(posts.id, +cursor) : undefined),
      limit: pageSize,
    });

    return Response.json(posts);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
