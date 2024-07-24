import { validateRequest } from "@/lib/auth/validate-request";
import React from "react";
import { SessionProvider } from "./session";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const Providers = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider value={session}>{children}</SessionProvider>
    </ThemeProvider>
  );
};
