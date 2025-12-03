"use client";

import React, { createContext, useContext, useRef, useState } from "react";
type ConfirmFn = (title?: string, description?: string) => Promise<boolean>;

type ConfirmContextValue = {
  open: boolean;
  title?: string;
  description?: string;
  confirm: ConfirmFn;
  close: (result: boolean) => void;
};
const Ctx = createContext<ConfirmContextValue | null>(null);

export function ConfirmAlertContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<(v: boolean) => void>();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();

  const confirm: ConfirmFn = (t, d) => {
    setTitle(t);
    setDescription(d);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      ref.current = resolve;
    });
  };
  const close = (result: boolean) => {
    setOpen(false);
    ref.current?.(result);
  };

  return (
    <Ctx.Provider value={{ open, title, description, confirm, close }}>
      {children}
    </Ctx.Provider>
  );
}
export function useConfirmAlertContext() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error(
      "useConfirmAlertContext must be used within a ConfirmAlertContext",
    );
  }
  return ctx;
}
