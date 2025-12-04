import React from "react";
import { getAllRequestsWithProductsAndUsers } from "@/lib/queries/stockRequests";
import RequestDataTable from "@/components/admin/request/RequestDataTable";
import TypographyH2 from "@/components/ui/TypographyH2";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const pendingRequests = await getAllRequestsWithProductsAndUsers();
  const t = await getTranslations("RequestPage");
  return (
    <div className="bg-white p-5 max-sm:p-1 rounded-2xl w-full">
      <TypographyH2 title={t("reqH1")} />
      <RequestDataTable requests={pendingRequests} />
    </div>
  );
};
export default Page;
