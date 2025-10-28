import React from "react";
import ProductOverview from "@/components/ProductOverview";
import LatestProductList from "@/components/LatestProductList";
import { db } from "@/database/drizzle";
import { products, users } from "@/database/schema";
import { count, desc } from "drizzle-orm";
import ServicesCard from "@/components/ServicesCard";
import { ProductCard } from "@/components/ProductCard";
import ProductFilterForm from "@/components/ProductFilterForm";
import PaginationView from "@/components/PaginationView";
import { getBrands, getPaginatedProducts } from "@/lib/queries/products";
import { parseProductSearchParams } from "@/lib/search/parseProductParams";
const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const resolvedSearchParams = await searchParams;

  const parsed = parseProductSearchParams(searchParams);
  const [latestProducts, { pagedProducts, totalPages }, availableBrands] =
    await Promise.all([
      db.select().from(products).limit(8).orderBy(desc(products.createdAt)),
      getPaginatedProducts(parsed),
      getBrands(),
    ]);
  return (
    <div className="">
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-3 lg:col-span-2">
          {latestProducts[0] && <ProductOverview {...latestProducts[0]} />}

          {/*<ProductOverview {...latestProducts[0]} />*/}
        </div>
        <div className="col-span-3 lg:col-span-1">
          <h1 className="text-3xl font-bebas text-white ">Services</h1>

          <ServicesCard />
        </div>
      </div>
      <LatestProductList
        title="Latest Products"
        products={latestProducts.slice(1)}
        // products={latestProducts.slice(1)}
        containerClassName="product-list bg-bgDarker "
      />
      <section
        id="all-products"
        className="p-1 products-area mt-5 grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3  gap-5"
      >
        <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 col-span-2 ">
          <ProductFilterForm availableBrands={availableBrands} />
        </div>
        <div className="xl:col-span-4 lg:col-span-3 md:col-span-2 col-span-2    ">
          <ProductCard products={pagedProducts} />
        </div>
      </section>
      <div className="mt-15 items-center justify-items-center ">
        <PaginationView
          currentPage={parsed.currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};
export default Home;
