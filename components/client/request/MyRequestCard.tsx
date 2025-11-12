"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import DateCell from "@/components/admin/product/cells/DateCell";
import { IKImage } from "imagekitio-react";
import config from "@/lib/config";

type RequestProps = {
  request: RequestType;
  product: ProductClient;
};
const MyRequestCard = ({ request, product }: RequestProps) => {
  return (
    <Card className="w-fit bg-bgDarker overflow-hidden border-0 col-span-1 lg:col-span-2 max-sm:col-span-2">
      <CardContent className="w-75 h-75">
        <IKImage
          path={product.image}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt="Product Image"
          className="object-fill h-full w-full rounded-md "
          loading="lazy"
          lqip={{ active: true }}
        />
      </CardContent>
      <CardContent className="text-text-sun gap-2 flex-col flex">
        <CardTitle className="text-xl">
          {request.status === "PENDING"
            ? "Waiting For Manager"
            : request.status === "ANSWERED"
              ? "Your request has seen"
              : "Stock Renewed"}
        </CardTitle>
        <CardDescription className="text-xl flex flex-row items-center gap-1">
          Requested on:
          <DateCell value={request.createdAt} />
        </CardDescription>
      </CardContent>
    </Card>
  );
};
export default MyRequestCard;
