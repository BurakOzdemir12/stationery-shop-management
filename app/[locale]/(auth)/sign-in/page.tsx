"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/actions/auth";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("AuthValidations");
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema(t)}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signInWithCredentials}
    />
  );
};
export default Page;
