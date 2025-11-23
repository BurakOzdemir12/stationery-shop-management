import React from "react";
import StatBox from "@/components/admin/dashboard/StatBox";
import TypographyH2 from "@/components/ui/TypographyH2";

const Page = () => {
  return (
    <div className="bg-white p-5 rounded-2xl w-full">
      <TypographyH2 title="Dashboard" />
      <div className="w-full grid grid-cols-4 max-lg:grid-cols-2 gap-6   ">
        <StatBox
          type="revenue"
          value={55}
          percentageValue={12}
          title="Total Revenue"
          higherThan={false}
        />
        <StatBox
          type="sales"
          value={55}
          percentageValue={-12}
          title="Total Sales"
          higherThan={false}
        />
        <StatBox
          type="users"
          value={55}
          percentageValue={12}
          title="Active Users"
          higherThan={true}
        />
        <StatBox
          type="requests"
          value={55}
          percentageValue={12}
          title="Product Requests"
          higherThan={true}
        />
      </div>
    </div>
  );
};
export default Page;
