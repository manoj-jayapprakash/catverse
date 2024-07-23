"use server";

import { db } from "@/server/db";
import {
  type TLoginForm,
  LoginFormSchema,
  type TRegisterForm,
  RegisterFormSchema,
} from "@/schema/auth";
import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { users } from "@/server/db/schema";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect";
import { validateRequest } from "@/lib/auth/validate-request";

export const register = async (
  registerFormData: TRegisterForm,
): Promise<{ error: string }> => {
  try {
    const { username, password, email } =
      RegisterFormSchema.parse(registerFormData);

    const isUsernameExists = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, username),
    });

    if (isUsernameExists) return { error: "Username already taken" };

    const isEmailExists = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (isEmailExists)
      return { error: "An user with this email id already exists" };

    const passwordHash = await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    await db.insert(users).values({
      id: userId,
      username,
      displayName: username,
      email,
      passwordHash,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return { error: "Something went wrong. Please try again later." };
  }
};

export const login = async (
  loginFormFields: TLoginForm,
): Promise<{ error: string }> => {
  try {
    const { username, password } = LoginFormSchema.parse(loginFormFields);

    const isUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, username.toLowerCase()),
    });

    if (!isUser) return { error: "Incorrect username or password" };

    const validPassword = await verify(isUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    if (!validPassword) {
      return {
        error: "Incorrect username or password",
      };
    }
    const session = await lucia.createSession(isUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/");
  } catch (err) {
    if (isRedirectError(err)) throw err;

    return { error: "Something went wrong. Please try again later." };
  }
};

export const logout = async () => {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/login");
};
