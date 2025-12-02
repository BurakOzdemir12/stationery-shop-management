"use client";

import React, { ReactNode, useState } from "react";
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
import { ProductSearchFilters } from "@/lib/validations";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const customScrollbarStyle =
  "overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-500";
type ProductFilterFormProps = {
  availableBrands: string[];
  categories: string[];
};
const ProductFilterForm = ({
  availableBrands,
  categories,
}: ProductFilterFormProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const anchor = "#all-products";

  const form = useForm<z.input<typeof ProductSearchFilters>>({
    resolver: zodResolver(ProductSearchFilters),
    defaultValues: {
      query: searchParams.get("query") || "",
      inStock: searchParams.get("inStock") === "true",
      brands: searchParams.getAll("brand"),
      categories: searchParams.getAll("category"),
      price: {
        min: searchParams.get("priceMin")
          ? Number(searchParams.get("priceMin"))
          : undefined,
        max: searchParams.get("priceMax")
          ? Number(searchParams.get("priceMax"))
          : undefined,
      },
    },
  });

  function onSubmit(values: z.input<typeof ProductSearchFilters>) {
    const params = new URLSearchParams();
    if (values.query) {
      params.set("query", values.query);
    } else {
      params.delete("query");
    }
    if (values.inStock) params.set("inStock", "true");
    if (values.brands && values.brands.length > 0) {
      values.brands.forEach((b) => params.append("brand", b));
    }
    if (values.categories && values.categories.length > 0) {
      values.categories.forEach((c) => params.append("category", c));
    }
    if (values.price?.min != null)
      params.set("priceMin", String(values.price.min));
    else params.delete("priceMin");

    if (values.price?.max != null)
      params.set("priceMax", String(values.price.max));
    else params.delete("priceMax");
    params.delete("page");
    router.push(`${pathName}?${params.toString()}${anchor}`);
  }

  const brandCheckHandle = (
    current: string[] | undefined,
    brand: string,
    checked: boolean | "indeterminate",
  ) => {
    const set = new Set(current ?? []);
    if (checked === true) set.add(brand);
    else set.delete(brand);
    return Array.from(set);
  };
  const categoryCheckHandle = (
    current: string[] | undefined,
    category: string,
    checked: boolean | "indeterminate",
  ) => {
    const set = new Set(current ?? []);
    if (checked === true) set.add(category);
    else set.delete(category);
    return Array.from(set);
  };
  const [comobox, setOpen] = useState(false);
  return (
    <div
      className={`p-4 h-fit max-h-[100vh] sticky top-4 text-white 
      bg-bgDarker border-borderColor border-1 rounded-2xl self-start ${customScrollbarStyle}`}
    >
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5   "
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
              <FormItem className=" flex flex-row gap-4  ">
                <FormControl>
                  <Checkbox
                    className="filter-checkbox"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Only Shows In Stock</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className={`flex flex-col mt-5 max-h-48 ${customScrollbarStyle}`}
          >
            {" "}
            <h1 className="text-white sticky top-0 bg-bgDarker z-10 pb-2">
              Brands
            </h1>{" "}
            <hr className="opacity-35" />
            <FormField
              name="brands"
              render={({ field }) => (
                <FormItem className="mt-2   flex flex-col   ">
                  {availableBrands.map((b) => (
                    <div
                      key={b}
                      className="  flex flex-row gap-4 items-center flex-wrap"
                    >
                      <Checkbox
                        className=" filter-checkbox  "
                        checked={(field.value ?? []).includes(b)}
                        onCheckedChange={(checked) =>
                          field.onChange(
                            brandCheckHandle(field.value, b, checked),
                          )
                        }
                      />
                      <p>{b}</p>
                    </div>
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div
            className={`flex flex-col mt-5 max-h-48 ${customScrollbarStyle}`}
          >
            <h1 className="text-white sticky top-0 bg-bgDarker z-10 pb-2">
              Category
            </h1>{" "}
            <hr className="opacity-35" />
            <FormField
              name="categories"
              render={({ field }) => (
                <FormItem className="mt-2   flex flex-col">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className=" flex flex-row gap-4 items-center flex-wrap"
                    >
                      <Checkbox
                        className=" filter-checkbox  "
                        checked={(field.value ?? []).includes(category)}
                        onCheckedChange={(checked) =>
                          field.onChange(
                            categoryCheckHandle(field.value, category, checked),
                          )
                        }
                      />
                      <p>{category}</p>
                    </div>
                  ))}
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              name="price.min"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                      placeholder="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="price.max"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                      placeholder="∞"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className=" btn-gold  font-semibold mt-10" type="submit">
            Filter
          </Button>
          <Button
            className=" cursor-pointer hover:bg-neutral-600  font-semibold mt-5"
            type="reset"
            onClick={() => router.replace(pathName + "#all-products")}
          >
            Reset All Filters
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default ProductFilterForm;
