"use client";

import React, { ReactNode } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  ProductSearchFilters,
  ProductSearchFiltersType,
} from "@/lib/validations";
import { z } from "zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const ProductFilter = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof ProductSearchFiltersType>>({
    resolver: zodResolver(ProductSearchFilters),
    defaultValues: {
      query: searchParams.get("query") || "",
      inStock: searchParams.get("inStock") === "true",
    },
  });
  function onSubmit(values: ProductSearchFiltersType) {
    const params = new URLSearchParams();
    if (values.query) {
      params.set("query", values.query);
    } else {
      params.delete("query");
    }
    if (values.inStock) params.set("inStock", "true");

    params.delete("page");
    router.push(`${pathName}?${params.toString()}`);
  }
  return (
    <section className="text-white side-filter  sticky h-full  bg-bgDarker  border-borderColor border-1 rounded-2xl ">
      <div className="filter-form p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5  "
          >
            <FormField
              name="query"
              control={form.control}
              render={({ field }) => (
                <FormItem className="   ">
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Search by product name"
                      onFocus={(e) => e.target.select()}
                      {...field}
                      className=" "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="inStock"
              render={({ field }) => (
                <FormItem className="   ">
                  <FormLabel>Only Shows In Stock</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-text-sun text-black font-semibold mt-10"
              type="submit"
            >
              Filter
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};
export default ProductFilter;
