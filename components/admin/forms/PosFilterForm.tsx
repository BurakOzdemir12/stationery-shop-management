"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { ProductSearchFilters } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

const PosFilterForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const anchor = "#all-products";

  const form = useForm<z.input<typeof ProductSearchFilters>>({
    defaultValues: {
      query: searchParams.get("query") || "",
    },
  });
  function onSubmit(values: z.input<typeof ProductSearchFilters>) {
    const params = new URLSearchParams();
    if (values.query) {
      params.set("query", values.query);
    } else {
      params.delete("query");
    }
    router.push(`${pathName}?${params.toString()}${anchor}`);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="query"
            control={form.control}
            render={({ field }) => (
              <FormItem className="   ">
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input
                    className="  w-md bg-input-field text-xl "
                    placeholder="Search Product"
                    onFocus={(e) => e.target.select()}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
export default PosFilterForm;
