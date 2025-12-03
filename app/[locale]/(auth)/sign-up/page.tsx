"use client";

import React from "react";
import { signUpSchema } from "@/lib/validations";
import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("AuthValidations");
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema(t)}
      defaultValues={{
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        profileImage: "",
      }}
      onSubmit={signUp}
    />
  );
};
export default Page;
