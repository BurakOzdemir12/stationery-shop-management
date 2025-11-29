"use client";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";

type ChartItem = {
  date: string;
  revenue: number;
  sales: number;
};

const chartConfig = {
  views: {
    label: "Total Revenue",
  },
  revenue: {
    label: "Total Revenue",
    color: "var(--chart-2)",
  },
  sales: {
    label: "Total Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type ChartProps = {
  revenueData: RevenueByDay[];
  salesData: SalesByDay[];
};
const RevenueChart = ({ revenueData, salesData }: ChartProps) => {
  const chartData: ChartItem[] = React.useMemo(
    () =>
      revenueData.map((rev, index) => ({
        date: rev.date,
        revenue: rev.total,
        sales: salesData[index]?.total ?? 0,
      })),
    [revenueData, salesData],
  );
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("revenue");

  const total = React.useMemo(
    () => ({
      revenue: chartData.reduce((acc, curr) => acc + curr.revenue, 0),
      sales: chartData.reduce((acc, curr) => acc + curr.sales, 0),
    }),
    [chartData],
  );

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Revenue & Sales Chart</CardTitle>
          <CardDescription>
            Showing total revenue and sales numbers for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["revenue", "sales"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className=" data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6 cursor-pointer hover:text-purple-700"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-sm font-semibold ">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("tr-TR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("tr-TR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default RevenueChart;
