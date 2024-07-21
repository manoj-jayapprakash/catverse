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
import { type TRegisterForm, RegisterFormSchema } from "@/schema/auth";
import { PasswordInput } from "@/components/ui/password-input";
import { useState, useTransition } from "react";
import { register } from "../actions";

export const RegsiterForm = () => {
  const [serverError, setServerError] = useState<string>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<TRegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: TRegisterForm) {
    setServerError(undefined);
    startTransition(async () => {
      const { error } = await register(data);
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
              <FormDescription>
                This is your public display name. You can change it after
                registeration.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
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
          Create an account
        </Button>
        <Button variant="outline" type="button" className="w-full">
          Sign up using Google
        </Button>
      </form>
    </Form>
  );
};
