"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProductCountGraph({
  chartData,
  totalProducts,
}: {
  chartData: { category: string; count: number; fill: string }[];
  totalProducts: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Categories - Area Chart</CardTitle>
        <CardDescription>
          Distribution of products across categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AreaChart
          width={600}
          height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="category"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total Products: {totalProducts}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing product distribution across categories
        </div>
      </CardFooter>
    </Card>
  );
}
