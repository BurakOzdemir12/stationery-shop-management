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

type ProductFilterFormProps = {
  availableBrands: string[];
};
const ProductFilterForm = ({ availableBrands }: ProductFilterFormProps) => {
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
  const [comobox, setOpen] = useState(false);
  return (
    <section className="side-filter p-4  text-white   sticky h-full  bg-bgDarker  border-borderColor border-1 rounded-2xl ">
      <div className="filter-form  ">
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
            <FormField
              name="brands"
              render={({ field }) => (
                <FormItem className=" flex flex-col  ">
                  <FormLabel>Brands</FormLabel>
                  <hr className="opacity-35" />
                  {availableBrands.map((b) => (
                    <div
                      key={b}
                      className="flex flex-row gap-4 items-center flex-wrap"
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
          </form>
        </Form>
      </div>
    </section>
  );
};
export default ProductFilterForm;
