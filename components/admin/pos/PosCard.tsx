import React from "react";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { IKImage } from "imagekitio-react";
import config from "@/lib/config";
import { textUpperCase } from "@/lib/utils";
import MoneyCell from "@/components/admin/product/cells/MoneyCell";
import StockCell from "@/components/admin/product/cells/StockCell";
import { Button } from "@/components/ui/button";

const PosCard = ({ id, name, image, sale_price, stock, brand }: Product) => {
  return (
    <Card className=" m-0 p-0 border-1 border-border rounded-xl col-span-1 shadow-md bg-sidebar ">
      <IKImage
        path={image}
        urlEndpoint={config.env.imagekit.urlEndpoint}
        alt="Product Image"
        className="object-fill p-3   w-full  max-md:h-50 h-65  "
        loading="lazy"
        lqip={{ active: true }}
        style={{ borderRadius: "26px" }}
      />
      <CardContent className="p-2 pb-0 m-0 pt-0  flex flex-row mx-2 justify-between">
        <p className="font-semibold text-lg">{textUpperCase(name)}</p>
        <MoneyCell value={Number(sale_price)} tone="muted" />
      </CardContent>
      <CardContent className="p-2 pt-0 mx-2 mt-0  flex flex-row gap-5 font-semibold  text-neutral-500">
        <p className=" ">
          Stock: <StockCell value={stock} />
        </p>
        <p className="">{textUpperCase(brand || " ")}</p>
      </CardContent>
      <CardAction className="w-full p-3">
        <Button className="btn-pri w-full text-xl">+ Add</Button>
      </CardAction>
    </Card>
  );
};
export default PosCard;
