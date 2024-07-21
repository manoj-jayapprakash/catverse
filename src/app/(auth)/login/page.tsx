import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "./login-form";
import { type Metadata } from "next";

export const metadata:Metadata = {
  title: 'Login'
}

export default function Login() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="grid max-h-[44rem] bg-card overflow-hidden md:rounded-lg md:p-4 md:shadow-md lg:grid-cols-2 lg:p-0">
        {/* <Image
          src="/images/auth/register.webp"
          alt="Image"
          width={520}
          height={600}
          className="hidden lg:block"
        /> */}
        <div className="flex items-center justify-center py-6">
          <div className="mx-auto grid w-[350px] gap-6">
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
