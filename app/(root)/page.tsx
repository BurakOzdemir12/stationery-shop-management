import React from "react";
import ProductOverview from "@/components/ProductOverview";
import LatestProductList from "@/components/LatestProductList";
import { db } from "@/database/drizzle";
import { products, users } from "@/database/schema";
import { count, desc } from "drizzle-orm";
import ServicesCard from "@/components/ServicesCard";
import { ProductCard } from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import PaginationView from "@/components/PaginationView";
import { getPaginatedProducts } from "@/lib/queries/products";
const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const latestProducts = (await db
    .select()
    .from(products)
    .limit(8)
    .orderBy(desc(products.createdAt))) as Product[];
  const resolvedSearchParams = await searchParams;

  const currentPage = Number(resolvedSearchParams.page) || 1;
  const searchQuery = resolvedSearchParams.query as string | undefined;
  const inStock = resolvedSearchParams.inStock === "true";
  const { pagedProducts, totalPages } = await getPaginatedProducts({
    currentPage,
    searchQuery,
    inStock,
  });

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-3 lg:col-span-2">
          <ProductOverview {...latestProducts[0]} />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <h1 className="text-3xl font-bebas text-white ">Services</h1>

          <ServicesCard />
        </div>
      </div>
      <LatestProductList
        title="Latest Products"
        products={latestProducts.slice(1)}
        containerClassName="product-list bg-bgDarker "
      />
      <section
        id="all-products"
        className="p-1 products-area mt-5 grid grid-cols-1 lg:grid-cols-5 md:grid-cols-4 gap-5"
      >
        <div className="lg:col-span-1 md:col-span-1">
          <ProductFilter />
        </div>
        <div className="lg:col-span-4 md:col-span-3   ">
          <ProductCard products={pagedProducts} />
        </div>
      </section>
      <div className="mt-15 items-center justify-items-center">
        <PaginationView
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/"
          searchParams={searchParams}
        />
      </div>
    </div>
  );
};
export default Home;
