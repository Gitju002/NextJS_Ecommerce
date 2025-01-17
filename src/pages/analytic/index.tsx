import React from "react";
import { CategoryChart } from "@/pages/analytic/(component)/pieChart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getProducts } from "@/store/features/productSlice";
import { toast } from "sonner";
import { ChartConfig } from "@/components/ui/chart";
import { ProductCountGraph } from "./(component)/areaChart";
const predefinedColors = [
  "#FF6384", // Red
  "#36A2EB", // Blue
  "#FFCE56", // Yellow
  "#4BC0C0", // Teal
  "#9966FF", // Purple
  "#FF9F40", // Orange
];
const Analytic = () => {
  const { message, products, success } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();
  const [chartData, setChartData] = React.useState<
    { category: string; count: number; fill: string }[]
  >([]);
  const [chartConfig, setChartConfig] = React.useState<ChartConfig>({});

  React.useEffect(() => {
    dispatch(getProducts());
    if (success) {
      toast.success(message);
    }
  }, [dispatch, success, message]);

  React.useEffect(() => {
    if (products.length > 0) {
      // Group products by category and count them
      const categoryCounts = products.reduce(
        (acc: Record<string, number>, product) => {
          acc[product.product_category] =
            (acc[product.product_category] || 0) + 1;
          return acc;
        },
        {}
      );

      // Generate chart data
      const data = Object.entries(categoryCounts).map(
        ([category, count], index) => ({
          category: category,
          count: count,
          fill: `var(--color-${category.toLowerCase().replace(/\s/g, "-")}, ${
            predefinedColors[index % predefinedColors.length]
          })`,
        })
      );

      // Generate chart config
      const config = {
        products: {
          label: "Products",
        },
        ...Object.fromEntries(
          Object.keys(categoryCounts).map((category, index) => [
            category,
            {
              label: category,
              color: predefinedColors[index % predefinedColors.length],
            },
          ])
        ),
      } satisfies ChartConfig;

      setChartData(data);
      setChartConfig(config);
    }
  }, [products]);

  const totalProducts = chartData.reduce((acc, curr) => acc + curr.count, 0);

  console.log(chartData, chartConfig);
  return (
    <div className="min-h-[91vh] border p-8 bg-slate-50 grid lg:grid-cols-6 gap-3">
      <div className="lg:col-span-3">
        <CategoryChart
          chartConfig={chartConfig}
          chartData={chartData}
          totalProducts={totalProducts}
        />
      </div>
      <div className="lg:col-span-3">
        <ProductCountGraph
          chartData={chartData}
          totalProducts={totalProducts}
        />
      </div>
    </div>
  );
};

export default Analytic;
