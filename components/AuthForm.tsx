"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";
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
import Link from "next/link";
import { AUTH_FIELDS } from "@/constants";
import FileUpload from "@/components/client/FileUpload";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const t = useTranslations("AuthForm");
  const router = useRouter();

  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const handleSubmit: SubmitHandler<T> = async (data: T) => {
    const result = await onSubmit(data);
    if (result.success) {
      toast.success(isSignIn ? t("signInSuccess") : t("signUpSuccess"));
      router.push("/");
    } else {
      toast.error(isSignIn ? t("failedSignIn") : t("failedSignUp"), {
        style: {
          fontSize: "18px",
        },
      });
    }
  };
  return (
    <div className="flex flex-col  gap-4 ">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? t("welcomeBack") : t("createAccount")}
      </h1>
      <p className="font-light text-amber-50">
        {isSignIn ? t("subSignInText") : t("subSignUpText")}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 w-full"
        >
          {Object.keys(defaultValues).map((field) => {
            const key = field as keyof typeof AUTH_FIELDS;
            const config = AUTH_FIELDS[key];
            return (
              <FormField
                key={field}
                control={form.control}
                name={field as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t(config.labelKey)}
                      {/*{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}*/}
                    </FormLabel>
                    <FormControl>
                      {field.name === "profileImage" ? (
                        <div className=" w-min object-contain">
                          <FileUpload
                            type="image"
                            accept="image/*"
                            placeholder={t("uploadPicture")}
                            folder="ids"
                            onFileChange={field.onChange}
                            variant="dark"
                          />
                        </div>
                      ) : (
                        <Input
                          required
                          type={
                            config.type
                            // FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                          }
                          className="text-white  border-borderColor border-3 h-12 bg-bgDark"
                          placeholder=" "
                          {...field}
                        />
                      )}
                    </FormControl>

                    <FormDescription className="text-white"></FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            );
          })}

          <Button className="max-sm:w-full btn-gold" type="submit">
            {isSignIn ? t("signInBtn") : t("signUpBtn")}
          </Button>
        </form>
      </Form>
      <p className="text-sm max-sm:text-center flex-1 flex flex-row justify-center text-white  font-light ">
        {isSignIn ? t("noAccount") : t("haveAccount")}
        <span className="mx-1  text-text-gold font-semibold hover:text-neutral-400 ">
          <Link href={isSignIn ? `/sign-up` : `/sign-in`}>
            {isSignIn ? t("createAccount") : t("signInBtn")}
          </Link>
        </span>
      </p>
      <p className="text-sm max-sm:text-center flex-1 flex flex-row justify-center text-white  font-light ">
        <span className="mx-1  text-text-gold font-semibold hover:text-neutral-400 ">
          <Link href="/">{t("continue")}</Link>
        </span>
      </p>
    </div>
  );
};
export default AuthForm;
