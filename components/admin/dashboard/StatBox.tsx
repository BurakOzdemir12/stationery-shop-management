"use client";
import React, { useState } from "react";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { textUpperCase } from "@/lib/utils";
import { FaPercentage } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
type StatBoxProps = {
  type: "revenue" | "sales" | "users" | "requests";
  value: number;
  title: string;
  percentageValue?: number;
  percentage?: boolean;
  currency?: string;
  higherThan?: boolean;
};
const StatBox = ({
  type,
  value,
  percentage,
  title,
  percentageValue,
  higherThan,
  currency,
}: StatBoxProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const periodParam = searchParams.get("period");
  const period = periodParam === "year" ? "year" : "month";

  const nf = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency || "TRY",
    minimumFractionDigits: 0,
  });
  const handleTogglePeriod = () => {
    const params = new URLSearchParams(searchParams.toString());

    const nextPeriod = period === "month" ? "year" : "month";
    params.set("period", nextPeriod);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const label = period === "month" ? "Month" : "Year";
  return (
    <div className="bg-sidebar  col-span-1 p-5 rounded-2xl border-border border-1 ">
      <span className="flex flex-row justify-between items-center  ">
        <h3 className="font-serif text-neutral-800 text-lg">
          {textUpperCase(title)}
        </h3>
        {(type === "revenue" || type === "sales") && (
          <Button className=" btn-pri  " onClick={handleTogglePeriod}>
            {label}
          </Button>
        )}

        <span className="bg-bgDark  rounded-2xl p-2 border-border border-1  font-extrabold   ">
          {percentageValue && percentageValue > 0 ? (
            <span className="flex gap-2 ">
              <IoIosTrendingUp className="text-primary  text-3xl font-extrabold " />
              <p className="flex items-center gap-0 text-white">
                {"+" + percentageValue} <FaPercentage />
              </p>
            </span>
          ) : (
            <span className="flex gap-2 ">
              <IoIosTrendingDown className="text-red-500  text-3xl font-extrabold" />
              <p className="flex items-center gap-0 text-white">
                {percentageValue} <FaPercentage />
              </p>
            </span>
          )}
        </span>
      </span>
      <div className="">
        <h1 className="text-3xl font-extrabold text-neutral-700 mt-2">
          {type === "revenue" ? nf.format(value) : value}
        </h1>
      </div>
      <div className="">
        <p>
          {type === "revenue" && higherThan
            ? `Revenue are ${nf.format(5)}  more than the previous month`
            : `Revenue are ${nf.format(5)}  less than the previous month`}
          {/*{type === "users" &&*/}
          {/*  higherThan &&*/}
          {/*  `Revenue are ${nf.format(5)}  more than the previous month`}{" "}*/}
          {/*{type === "sales" &&*/}
          {/*  higherThan &&*/}
          {/*  `Revenue are ${nf.format(5)}  more than the previous month`}{" "}*/}
          {/*{type === "requests" &&*/}
          {/*  higherThan &&*/}
          {/*  `Revenue are ${nf.format(5)}  more than the previous month`}*/}
        </p>
      </div>
    </div>
  );
};
export default StatBox;
