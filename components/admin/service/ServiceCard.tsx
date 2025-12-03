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
import { useTranslations } from "next-intl";
import { useConfirmAlertContext } from "@/app/[locale]/context/ConfirmAlertContext";

type ServiceFormValues = z.infer<typeof serviceSchema>;
const ServiceCard = ({ id, name, price, createdAt }: Service) => {
  const tActions = useTranslations("ServiceActions");
  const [onEdit, setOnEdit] = useState(false);
  const [draftPrice, setDraftPrice] = useState<number | "">(price);
  const [draftName, setDraftName] = useState(name);
  const [isLoading, setIsLoading] = useState(false);
  const { confirm } = useConfirmAlertContext();
  const onSubmit: SubmitHandler<ServiceFormValues> = async () => {
    try {
      setIsLoading(true);
      const res = await updateService(id, {
        price: Number(draftPrice),
        name: String(draftName),
      });

      if (!res?.success) {
        toast.error(tActions("serviceUpdateFail"));

        throw new Error(tActions("serviceUpdateFail"));
      }
      setIsLoading(false);
      toast.success(tActions("serviceUpdated"));
      setOnEdit(false);
    } catch (e) {
      setIsLoading(false);
      toast.error(tActions("serviceUpdateFail"));
    }
  };
  const handleDelete = async (id: string) => {
    const ok = await confirm(tActions("confirmDelete"));
    if (!ok) return;
    try {
      const res = await deleteService(id);
      if (!res?.success) {
        toast.error(tActions("serviceDeleteFail"));
        throw new Error(tActions("serviceDeleteFail"));
      }
      toast.success(tActions("serviceDeleted"));
    } catch (e) {
      console.log(e);
      toast.error(tActions("serviceDeleteFail"));
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
              placeholder={tActions("onEditPlaceHolder")}
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
              <span> {tActions("price")}</span>
              <MoneyCell value={price} tone="muted" />
              {/*<FaTurkishLiraSign />*/}
            </p>
          ) : (
            <Input
              className="border-borderColor"
              type="number"
              value={draftPrice}
              onChange={(e) => setDraftPrice(Number(e.target.value))}
              placeholder={tActions("onEditPricePlaceHolder")}
            />
          )}
        </CardContent>
        <CardFooter className="items-center w-full p-0 flex flex-row gap-5 justify-center">
          {!onEdit && (
            <div className="gap-5 flex">
              <Button className="btn-edit" onClick={() => setOnEdit(true)}>
                {tActions("edit")}
              </Button>

              <Button onClick={() => handleDelete(id)} className="btn-del">
                {tActions("delete")}
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
                {isLoading ? <Spinner className="size-3" /> : tActions("save")}
              </Button>
              <Button
                className="btn-del"
                onClick={() => {
                  setDraftPrice(price);
                  setDraftName(name);
                  setOnEdit(false);
                }}
              >
                {tActions("cancel")}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
export default ServiceCard;
