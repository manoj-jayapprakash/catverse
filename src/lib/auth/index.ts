import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/server/db";
import { sessions, users, type User as DbUser } from "@/server/db/schema";
import { Lucia, TimeSpan } from "lucia";
import { env } from "@/env.js";
const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  getSessionAttributes: (/* attributes */) => {
    return {};
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      username: attributes.username,
      displayName: attributes.displayName,
      // emailVerified: attributes.emailVerified,
      avatarUrl: attributes.avatarUrl,
      // createdAt: attributes.createdAt,
      // updatedAt: attributes.updatedAt,
    };
  },
  sessionExpiresIn: new TimeSpan(30, "d"),
  sessionCookie: {
    name: "session",

    expires: false, // session cookies have very long lifespan (2 years)
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
});
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

type DatabaseUserAttributes = Omit<DbUser, "hashedPassword">;
