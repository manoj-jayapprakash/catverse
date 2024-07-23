import { validateRequest } from "@/lib/auth/validate-request";
import React from "react";
import { SessionProvider } from "./session";
import { redirect } from "next/navigation";

export const Providers = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return <SessionProvider value={session}>{children}</SessionProvider>;
};
