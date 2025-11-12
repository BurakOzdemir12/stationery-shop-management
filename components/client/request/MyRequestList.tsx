import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import DateCell from "@/components/admin/product/cells/DateCell";
import { getProductById } from "@/lib/queries/products";
import MyRequestCard from "@/components/client/request/MyRequestCard";

type RequestType = {
  id: string;
  userId: string;
  status: string;
  productId: string;
  createdAt: Date | null;
};
const MyRequestList = async ({ request }: { request: RequestType }) => {
  const product = await getProductById(request.productId);
  return <MyRequestCard request={request} product={product ?? null} />;
};
export default MyRequestList;
