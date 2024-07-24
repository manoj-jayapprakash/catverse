import type { Session, User } from "lucia";
import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const RegisterFormSchema = z.object({
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, number, - and _ are allowed",
  ),
  email: requiredString.email("Please provide a valid email address"),
  password: requiredString.min(8, "Minimum 8 characters required"),
});

export type TRegisterForm = z.infer<typeof RegisterFormSchema>;

export const LoginFormSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type TLoginForm = z.infer<typeof LoginFormSchema>;

export type TSession = {
  user: User;
  session: Session;
};

export const CreatPostSchema = requiredString;
export type TCreatePost = z.infer<typeof CreatPostSchema>;
