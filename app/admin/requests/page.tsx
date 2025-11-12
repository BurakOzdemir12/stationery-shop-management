import React from "react";
import { getAllRequests } from "@/lib/queries/stockRequests";
import RequestDataTable from "@/components/admin/request/RequestDataTable";
import TypographyH2 from "@/components/ui/TypographyH2";

const Page = async () => {
  const pendingRequests = await getAllRequests();
  return (
    <div className="bg-white p-5 max-sm:p-1 rounded-2xl w-full">
      <TypographyH2 title="Requests" />
      <RequestDataTable requests={pendingRequests} />
    </div>
  );
};
export default Page;
