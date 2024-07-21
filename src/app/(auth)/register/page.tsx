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
      <div className="grid max-h-[44rem] overflow-hidden bg-card md:rounded-lg md:p-4 md:shadow-2xl lg:grid-cols-2 lg:p-0">
        <div className="flex items-center justify-center bg-card py-6 lg:p-0">
          <div className="mx-auto grid w-[350px] gap-6 lg:h-fit">
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
        {/* <Image
          src="/images/auth/register.webp"
          alt="Image"
          width={520}
          height={600}
          className="hidden object-contain lg:block"
        /> */}
      </div>
    </main>
  );
}
