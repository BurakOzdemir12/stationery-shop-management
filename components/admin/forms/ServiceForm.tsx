"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { serviceSchema } from "@/lib/validations";
import { createService } from "@/lib/admin/actions/service";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

type ServiceFormValues = z.infer<typeof serviceSchema>;
const ServiceForm = () => {
  const form = useForm<ServiceFormValues>({
    defaultValues: {
      name: "",
      price: 0,
    },
  });
  const onSubmit: SubmitHandler<ServiceFormValues> = async (
    values: z.infer<typeof serviceSchema>,
  ) => {
    try {
      const res = await createService(values);
      if (!res?.success) {
        throw new Error("Failed to create service");
      }
      form.reset();
      setOpen(false);
      toast.success("Service created successfully");
    } catch (e) {
      console.log(e);
      toast.error("Failed to create service");
    }
  };
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-[19px] text-white cursor-pointer">
          + New Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Your Service</DialogTitle>
          <DialogDescription>
            Please provide the service details below. Name and Price
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel htmlFor="name-1">Service Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Renkli Fotokobi" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormMessage />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="username-1">Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="25,6" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button className="btn-del" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="btn-pri" type="submit">
                Create Service
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default ServiceForm;
