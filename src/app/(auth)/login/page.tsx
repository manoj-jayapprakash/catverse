import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "./login-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="m-4 flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <Image
          src="/images/auth/signin.webp"
          alt="Image"
          width={520}
          height={600}
          className="hidden w-1/2 md:block"
        />
        <div className="flex flex-grow items-center justify-center p-6">
          <div className="mx-auto grid gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your information to login to your account
              </p>
            </div>
            <LoginForm />
            <div className="mt-4 text-center text-sm">
              Dont&apos; have an account?{" "}
              <Link href="/register" className="underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
