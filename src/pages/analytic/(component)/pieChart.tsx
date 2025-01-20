import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell, Label } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
function CategoryChart({
  chartData = [],
  chartConfig = {},
  totalProducts = 0,
}: {
  chartData: { category: string; count: number; fill: string }[];
  chartConfig: ChartConfig;
  totalProducts: number;
}) {
  return (
    <Card className="flex flex-col bg-gradient-to-tl from-[#493062] to-[#3b3980] border border-white/20">
      <CardHeader className="items-center pb-0 text-white">
        <CardTitle className="text-2xl">Products by Category</CardTitle>
        <CardDescription className="text-violet-200 text-lg">
          Distribution of products across categories
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="category"
              innerRadius={80}
              outerRadius={100}
              strokeWidth={5}
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-3xl font-bold"
                        >
                          {totalProducts}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-violet-200 text-lg"
                        >
                          Products
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-violet-100 text-base">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground text-white text-lg">
          Showing product distribution across categories
        </div>
      </CardFooter>
    </Card>
  );
}
export default CategoryChart;
