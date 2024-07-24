"use client";
import { type TSession } from "@/lib/validations";
import React, { createContext, useContext } from "react";

const SessionContext = createContext<TSession | null>(null);

export const SessionProvider = ({
  children,
  value,
}: React.PropsWithChildren<{ value: TSession }>) => {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(SessionContext);

  if (!session)
    throw new Error("Session context cannot be used outside session provider");

  return session;
};
