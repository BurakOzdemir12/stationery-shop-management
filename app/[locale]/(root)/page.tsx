import React, { Suspense } from "react";
import ProductOverview from "@/components/client/product/ProductOverview";
import LatestProductList from "@/components/client/product/latest/LatestProductList";
import { db } from "@/database/drizzle";
import { products, services, users } from "@/database/schema";
import { count, desc } from "drizzle-orm";
import ServicesCarousel from "@/components/client/service/ServicesCarousel";
import { ProductCard } from "@/components/client/product/ProductCard";
import ProductFilterForm from "@/components/client/product/ProductFilterForm";
import PaginationView from "@/components/client/PaginationView";
import {
  getBrands,
  getCategories,
  getPaginatedProducts,
} from "@/lib/queries/products";
import { parseProductSearchParams } from "@/lib/search/parseProductParams";
import { getServices } from "@/lib/queries/service";
import RootSkeleton from "@/components/skeletons/RootSkeleton";
import { getTranslations } from "next-intl/server";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const t = await getTranslations("HomaPage");
  const parsed = parseProductSearchParams(await searchParams);
  const [
    latestProducts,
    { pagedProducts, totalPages },
    availableBrands,
    services,
    categories,
  ] = await Promise.all([
    db.select().from(products).limit(7).orderBy(desc(products.createdAt)),
    getPaginatedProducts(parsed),
    getBrands(),
    getServices(),
    getCategories(),
  ]);

  return (
    <Suspense fallback={<RootSkeleton />}>
      <div className="">
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-3 lg:col-span-2">
            {latestProducts[0] && <ProductOverview {...latestProducts[0]} />}
            {/*<ProductOverview {...latestProducts[0]} />*/}
          </div>
          <div className="col-span-3 lg:col-span-1">
            <h1 className="text-3xl font-bebas text-white ">
              {t("ServicesH1")}
            </h1>
            <ServicesCarousel services={services} />
          </div>
        </div>
        <LatestProductList
          title="LatestProducts"
          products={latestProducts.slice(1)}
          // products={latestProducts.slice(1)}
          containerClassName="product-list bg-bgDarker "
        />
        <section
          id="all-products"
          className="p-1  mt-5 grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3   gap-5"
        >
          <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 col-span-2     ">
            <ProductFilterForm
              availableBrands={availableBrands}
              categories={categories}
            />
          </div>
          <div className="xl:col-span-4 lg:col-span-3 md:col-span-2 col-span-2    ">
            <ProductCard products={pagedProducts} />
          </div>
        </section>
        <div className="mt-5 items-center justify-items-center ">
          <PaginationView
            type="products"
            currentPage={parsed.currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </Suspense>
  );
};
export default Home;
