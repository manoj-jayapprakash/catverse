import Image from "next/image";
import Link from "next/link";
import { RegsiterForm } from "./register-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function Register() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="m-4 flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="flex flex-grow items-center justify-center bg-card p-6 lg:p-0">
          <div className="mx-auto grid gap-6 lg:h-fit">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-balance text-muted-foreground">
                Enter your information to create an account
              </p>
            </div>
            <RegsiterForm />
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </div>
        </div>
        <Image
          src="/images/auth/register.webp"
          alt="Image"
          width={520}
          height={600}
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
