import React from "react";
import StatBox from "@/components/admin/dashboard/StatBox";
import TypographyH2 from "@/components/ui/TypographyH2";
import StatBoxList from "@/components/admin/dashboard/StatBoxList";

const Page = async ({
  searchParams,
}: {
  searchParams: { year?: string; month?: string; period?: string };
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl w-full">
      <TypographyH2 title="Dashboard" />
      <div className="w-full grid grid-cols-4 max-lg:grid-cols-2 gap-6   ">
        <StatBoxList searchParams={searchParams} />
      </div>
    </div>
  );
};
export default Page;
