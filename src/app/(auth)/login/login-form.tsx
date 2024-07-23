"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type TLoginForm, LoginFormSchema } from "@/schema/auth";
import { PasswordInput } from "@/components/ui/password-input";
import { useState, useTransition } from "react";
import { login } from "../actions";

export const LoginForm = () => {
  const [serverError, setServerError] = useState<string>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<TLoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: TLoginForm) {
    setServerError(undefined);
    startTransition(async () => {
      const { error } = await login(data);
      if (error) setServerError(error);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {serverError ? (
          <p className="text-center text-destructive">{serverError}</p>
        ) : null}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" isLoading={isPending}>
          Login
        </Button>
        <Button variant="outline" type="button" className="w-full">
          Login using Google
        </Button>
      </form>
    </Form>
  );
};
