import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";
import { Navbar } from "./navbar";
import { Menubar } from "./menubar";
import { SessionProvider } from "@/components/providers/session";
import { ReactQueryProvider } from "@/components/providers/react-query";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
      <ReactQueryProvider>
    <SessionProvider value={session}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
            <Menubar className="sticky top-16 hidden h-fit flex-none space-y-3 rounded-lg bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-60" />
            {children}
          </div>
          <Menubar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden" />
        </div>
    </SessionProvider>
      </ReactQueryProvider>
  );
}
