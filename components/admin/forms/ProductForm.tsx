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
import { productSchema } from "@/lib/validations";

interface Props extends Partial<Product> {
  type?: "create" | "edit";
}

const ProductForm = ({ type, ...product }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      brand: "",
      price: 1,
      stock: 1,
      barcode: "",
      code: "",
      image: "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof productSchema>> = async (
    values,
  ) => {
    // Handle form submission
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name={"name"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
              </FormLabel>
              {/*<FormControl>*/}
              {/*  {field.name === "profileImage" ? (*/}
              {/*    <ImageUpload onFileChange={field.onChange} />*/}
              {/*  ) : (*/}
              {/*    <Input*/}
              {/*      required*/}
              {/*      type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}*/}
              {/*      className="text-white  border-borderColor border-3 h-12 bg-bgDark"*/}
              {/*      placeholder=" "*/}
              {/*      {...field}*/}
              {/*    />*/}
              {/*  )}*/}
              {/*</FormControl>*/}

              <FormDescription className="text-white"></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="max-sm:w-full btn-gold" type="submit">
          submit
        </Button>
      </form>
    </Form>
  );
};
export default ProductForm;
