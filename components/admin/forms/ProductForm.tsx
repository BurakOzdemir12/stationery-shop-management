"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { number, z } from "zod";
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
import { useRouter } from "next/navigation";
import { productSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { FaImages, FaBarcode, FaCheck } from "react-icons/fa";
import FileUpload from "@/components/FileUpload";
import { createProduct } from "@/lib/admin/actions/product";
import { toast } from "react-hot-toast";

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
      purchase_price: 1,
      sale_price: 1,
      stock: 1,
      barcode: "",
      code: "",
      image: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    const result = await createProduct(values);
    if (result.success) {
      toast.success("Product created successfully");
      router.push(`/admin/products/${result.data.id}`);
    } else {
      toast.error(`An  ${result.success} `);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mt-5 lg:p-5 "
      >
        <div className="form-fields flex w-full flex-col">
          <div className="basic-details  ">
            <h2 className="text-xl xl:col-span-6 col-span-4  font-medium">
              {" "}
              Basic Details
            </h2>
            <div className="form-field xl:col-span-2   ">
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <FormItem className="product-form-item   ">
                    <FormLabel>Product name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Pencil"
                        onFocus={(e) => e.target.select()}
                        {...field}
                        className="prod-input "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="form-field ">
              <FormField
                control={form.control}
                name={"category"}
                render={({ field }) => (
                  <FormItem className="product-form-item ">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Books"
                        {...field}
                        className="prod-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>{" "}
            <div className="form-field">
              <FormField
                control={form.control}
                name={"brand"}
                render={({ field }) => (
                  <FormItem className="product-form-item ">
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Faber Castell"
                        {...field}
                        className="prod-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>{" "}
            <div className="form-field">
              <FormField
                control={form.control}
                name={"purchase_price"}
                render={({ field }) => (
                  <FormItem className="product-form-item">
                    <FormLabel>Purchase Price</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="25.90"
                        {...field}
                        className="prod-input"
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="form-field">
              <FormField
                control={form.control}
                name={"sale_price"}
                render={({ field }) => (
                  <FormItem className="product-form-item">
                    <FormLabel>Sale Price</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="25.90"
                        {...field}
                        className="prod-input"
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="form-field  ">
              <FormField
                control={form.control}
                name={"stock"}
                render={({ field }) => (
                  <FormItem className="product-form-item">
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="15"
                        {...field}
                        className="prod-input rounded-full"
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" lg:col-span-4 max-lg:col-span-4 ">
              <FormField
                control={form.control}
                name={"description"}
                render={({ field }) => (
                  <FormItem className="product-form-item ">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Description"
                        className="prod-input w-full min-h-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="form-field ">
              <FormField
                control={form.control}
                name={"image"}
                render={({ field }) => (
                  <FormItem className="product-form-item ">
                    <FormLabel>
                      <FaImages className=" size-5 " /> Media
                    </FormLabel>
                    <FormControl
                      className={`    
                      ${field.value ? "flex flex-col text-sm  overflow-scroll w-full h-auto max-h-96 " : "bg-input-field  flex flex-col text-sm items-center justify-center min-h-48"} `}
                    >
                      <div className="  ">
                        <FileUpload
                          onFileChange={field.onChange}
                          type="image"
                          accept="image/*"
                          placeholder="Upload Product Image"
                          folder="/products/images"
                          value={field.value}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="barcode-details">
            <h2 className="flex col-span-4 gap-2 text-xl font-medium">
              <FaBarcode className="size-8" />
              Barcode
            </h2>
            <div className="form-field ">
              <FormField
                control={form.control}
                name={"barcode"}
                render={({ field }) => (
                  <FormItem className="product-form-item max-w-md">
                    <FormLabel>Barcode</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="545SDF413"
                        {...field}
                        className="prod-input"
                        min={0}
                      />
                    </FormControl>
                    <Button className="cursor-pointer text-lg h-max shadow-md shadow-primary ">
                      <FaBarcode /> Barcode Scan
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>{" "}
            <div className="form-field ">
              <FormField
                control={form.control}
                name={"code"}
                render={({ field }) => (
                  <FormItem className="product-form-item max-w-md">
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="A45155ss"
                        {...field}
                        className="prod-input"
                        min={0}
                      />
                    </FormControl>
                    <Button className="cursor-pointer text-lg h-max shadow-md  shadow-primary  ">
                      <FaBarcode /> Code Scan
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button className="max-sm:w-full text-xl h-max  btn-pri " type="submit">
          Create Product <FaCheck />
        </Button>
      </form>
    </Form>
  );
};
export default ProductForm;
