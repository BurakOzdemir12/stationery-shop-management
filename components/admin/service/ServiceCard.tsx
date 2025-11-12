"use client";
import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteService, updateService } from "@/lib/admin/actions/service";
import { toast } from "react-hot-toast";
import { textUpperCase } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { serviceSchema } from "@/lib/validations";
import MoneyCell from "@/components/admin/product/cells/MoneyCell";
import { Spinner } from "@/components/ui/spinner";

const handleDelete = async (id: string) => {
  const ok = confirm("Are you sure you want to delete this service?");
  if (!ok) return;
  try {
    const res = await deleteService(id);
    if (!res?.success) {
      toast.error("Failed to delete service");
      throw new Error("Failed to delete service");
    }
    toast.success("Service deleted successfully");
  } catch (e) {
    console.log(e);
    toast.error("Failed to delete service");
  }
};
type ServiceFormValues = z.infer<typeof serviceSchema>;
const ServiceCard = ({ id, name, price, createdAt }: Service) => {
  const [onEdit, setOnEdit] = useState(false);
  const [draftPrice, setDraftPrice] = useState<number | "">(price);
  const [draftName, setDraftName] = useState(name);
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit: SubmitHandler<ServiceFormValues> = async () => {
    try {
      setIsLoading(true);
      const res = await updateService(id, {
        price: Number(draftPrice),
        name: String(draftName),
      });

      if (!res?.success) {
        toast.error("Failed to update service");

        throw new Error("Failed to update service");
      }
      setIsLoading(false);
      toast.success("Service updated successfully");
      setOnEdit(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      toast.error("Failed to update service");
    }
  };
  return (
    <div className=" 2xl:col-span-1 lg:col-span-2 sm:grid-cols-2 p-5 max-md:p-1 rounded-2xl gap-5 justify-items-center ">
      <Card
        key={id}
        className={`w-full h-full ${onEdit ? "bg-amber-50" : "  bg-text-sun"} min-h-48 max-w-64 max-h-96 border-0 shadow-xl shadow-neutral-400`}
      >
        <CardHeader className=" max-h-88 h-full">
          {onEdit ? (
            <Input
              className="border-borderColor"
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Set your new Service Name"
            />
          ) : (
            <h1 className="font-semibold text-wrap    ">
              {" "}
              {textUpperCase(name)}
            </h1>
          )}
        </CardHeader>
        <CardContent className="w-full flex gap-1 ">
          {!onEdit ? (
            <p className="flex items-center gap-1 font-semibold">
              <span> Price:</span>
              <MoneyCell value={price} tone="muted" />
              {/*<FaTurkishLiraSign />*/}
            </p>
          ) : (
            <Input
              className="border-borderColor"
              type="number"
              value={draftPrice}
              onChange={(e) => setDraftPrice(Number(e.target.value))}
              placeholder="Set your new Price"
            />
          )}
        </CardContent>
        <CardFooter className="items-center w-full p-0 flex flex-row gap-5 justify-center">
          {!onEdit && (
            <div className="gap-5 flex">
              <Button className="btn-edit" onClick={() => setOnEdit(true)}>
                Edit
              </Button>

              <Button onClick={() => handleDelete(id)} className="btn-del">
                Delete
              </Button>
            </div>
          )}
          {onEdit && (
            <div className="gap-5 flex ">
              <Button
                className="btn-pri"
                onClick={() => onSubmit()}
                disabled={isLoading}
              >
                {isLoading ? <Spinner className="size-3" /> : "Save"}
              </Button>
              <Button
                className="btn-del"
                onClick={() => {
                  setDraftPrice(price);
                  setDraftName(name);
                  setOnEdit(false);
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
export default ServiceCard;
