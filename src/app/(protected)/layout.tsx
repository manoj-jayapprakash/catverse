import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";
import { Navbar } from "./navbar";
import { Providers } from "@/components/providers";

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <div className="flex min-h-screen flex-col">
      <Providers>
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-1">{children}</main>
      </Providers>
    </div>
  );
}
