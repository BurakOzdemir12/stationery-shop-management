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
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const handleSubmit: SubmitHandler<T> = async (data: T) => {
    const result = await onSubmit(data);
    if (result.success) {
      toast.success(
        isSignIn ? "Signed in successfully!" : "Account created successfully!",
        {},
      );
      router.push("/");
    } else {
      toast.error(
        `Error ${isSignIn ? "signing in" : "signing up"}:  ${result.error}`,
        { description: "An error occurred. Please try again." },
      );
    }
  };
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back" : "Create an account"}
      </h1>
      <p className="font-light text-amber-50">
        {isSignIn
          ? "Sign in to continue browsing and request products."
          : "Join us today and start exploring our products!"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "profileImage" ? (
                      <ImageUpload onFileChange={field.onChange} />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        className="text-white  border-borderColor border-3 h-12 bg-bgDark"
                        placeholder=" "
                        {...field}
                      />
                    )}
                  </FormControl>

                  <FormDescription className="text-white"></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button className="max-sm:w-full btn-gold" type="submit">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>
      <p className="text-sm max-sm:text-center flex-1 flex flex-row justify-center text-white  font-light ">
        {isSignIn ? "New to our platform?" : "Already have an account?"}
        <span className="mx-1  text-text-gold font-semibold hover:text-neutral-400 ">
          <Link href={isSignIn ? `/sign-up` : `/sign-in`}>
            {isSignIn ? "Create an account." : "Sign in"}
          </Link>
        </span>
      </p>
      <p className="text-sm max-sm:text-center flex-1 flex flex-row justify-center text-white  font-light ">
        <span className="mx-1  text-text-gold font-semibold hover:text-neutral-400 ">
          <Link href="/">Continue as a Visitor</Link>
        </span>
      </p>
    </div>
  );
};
export default AuthForm;
