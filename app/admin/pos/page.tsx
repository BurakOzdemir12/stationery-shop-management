import React from "react";
import TypographyH2 from "@/components/ui/TypographyH2";
import { getProductsForPos } from "@/lib/queries/products";
import PosCardList from "@/components/admin/pos/PosCardList";
import PosCartList from "@/components/admin/pos/PosCartList";
import { parseProductSearchParams } from "@/lib/search/parseProductParams";
import PaginationView from "@/components/client/PaginationView";
import PosFilterForm from "@/components/admin/forms/PosFilterForm";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const parsed = parseProductSearchParams(await searchParams);

  const [{ res, totalPages }] = await Promise.all([getProductsForPos(parsed)]);

  return (
    <div className="bg-white p-5 rounded-2xl w-full ">
      <TypographyH2 title="Retail Pos " />

      <div id="main-field" className="grid grid-cols-3 w-full gap-5  ">
        <div
          id="products-section"
          className="col-span-2 border-border border rounded-md p-3 bg-card"
        >
          <PosFilterForm />

          <PosCardList products={res} />
          <div className="p-5 mt-15">
            <PaginationView
              type="pos"
              currentPage={parsed.currentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
        <div
          id="cart-section"
          className="col-span-1 border-border border rounded-md p-3 bg-card"
        >
          <PosCartList />
        </div>
      </div>
    </div>
  );
};
export default Page;
