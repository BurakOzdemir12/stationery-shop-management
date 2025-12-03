"use client";
import React, { useState } from "react";
import ProductCarousel from "@/components/client/product/ProductCarousel";
import { FaMessage, FaTurkishLiraSign } from "react-icons/fa6";
import { cn, textUpperCase } from "@/lib/utils";
import { FaArrowCircleRight, FaBox, FaBoxOpen } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useTranslations } from "next-intl";

type ProductDetailProps = ProductClient & {
  session: Session | null;
  existingRequest?: boolean;
};
const ProductDetail = ({
  id,
  name,
  category,
  brand,
  description,
  sale_price,
  image,
  stock,
  session,
  existingRequest,
}: ProductDetailProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const handleProductRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    if (!session?.user?.id) {
      toast.error(t("requestError"));
      return;
    }
    try {
      const res = await fetch("/api/requests/product/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });
      const data = await res.json().catch(() => null);
      if (res.status === 429) {
        router.push("/too-fast");
      }
      if (!res.ok) {
        const message = t("requestFailed");
        // data?.error || data?.message || "Failed to request product";
        toast.error(message);
        setIsPending(false);
        return;
      }
      setIsPending(false);
      router.refresh();
      toast.success(t("requestSuccess"));
    } catch (e) {
      toast.error(t("requestNetworkError"));
      setIsPending(false);

      console.error(e);
    }
  };
  const t = useTranslations("ProductDetails");
  return (
    <section className=" product-detail  lg:px-10 justify-items-center bg-bgDarker p-10 rounded-2xl  ">
      <div className=" p-10 pt-0 grid grid-cols-2 gap-10 max-md:gap-5   ">
        <div className="  lg:col-span-1 max-lg:pb-0 col-span-2 ">
          <ProductCarousel
            image={image}
            containerClassName={cn(
              "w-145 max-h-145 w-full h-full object-fill pt-0 mt-0  rounded-lg  ",
            )}
          />
        </div>
        <div className=" justify-items-center items-center lg:col-span-1 col-span-2 ">
          <div className="h-full w-fit gap-5  flex flex-col flex-1 ">
            <h1 className="text-text-gold text-3xl  font-medium">
              {textUpperCase(name)}
            </h1>
            {stock > 0 ? (
              <div className="p-2 w-fit rounded-2xl bg-[#16a34a]   text-xl">
                <p className="text-white font-medium flex-row flex gap-2 flex-1 items-center ">
                  <FaBoxOpen className="size-7 text-gray-900" />
                  {t("inStock")}
                  {stock}
                </p>
              </div>
            ) : (
              <div className="flex max-sm:flex-col gap-5 items-center  ">
                <div className="p-2 w-fit max-sm:w-full  rounded-2xl bg-red-700   text-xl">
                  <p className="text-white  font-medium flex-row flex gap-2 flex-1 items-center ">
                    <FaBox className="size-7 text-gray-100" />
                    {t("outStock")}
                    {stock}
                  </p>
                </div>
                <div className="">
                  <form
                    onSubmit={handleProductRequest}
                    className="flex flex-col items-center  "
                  >
                    <Button
                      disabled={isPending || existingRequest}
                      type="submit"
                      className={`h-max  rounded-2xl btn-gold  `}
                    >
                      {isPending && <Spinner className="size-5 text-black " />}

                      {existingRequest ? t("alreadyRequested") : t("request")}
                      <FaMessage
                        className={`${existingRequest ? "text-red-600" : "text-success size-5"}`}
                      />
                    </Button>
                    {existingRequest && (
                      <Link
                        href="/my-profile"
                        className="hover:text-blue-300  cursor-pointer gap-2 text-white flex  items-center underline"
                      >
                        {t("viewRequests")}
                        <FaArrowCircleRight className="size-5" />
                      </Link>
                    )}
                  </form>
                </div>
              </div>
            )}
            <p className="text-white font-serif font-light text-lg opacity-80">
              {textUpperCase(description)}
            </p>
            {/*#9aa6b2*/}
            <div className="rounded-2xl p-4   grid grid-cols-4 w-full bg-gray-800 text-white font-bold text-lg gap-10 max-sm:gap-5  ">
              <div className="flex col-span-4 sm:col-span-2  ">
                {" "}
                {t("price")}:
                <span className="mx-1 font-semibold flex text-text-gold">
                  {sale_price}
                  <FaTurkishLiraSign />
                </span>
              </div>
              <div className="flex col-span-4 sm:col-span-2  ">
                {t("category")}:
                <span className="mx-1 font-semibold flex text-text-gold">
                  {textUpperCase(category || "")}
                </span>
              </div>
              <div className="flex col-span-4 sm:col-span-2   ">
                {t("brand")}:
                <span className="mx-1 font-semibold flex text-text-gold">
                  {textUpperCase(brand || "")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductDetail;
