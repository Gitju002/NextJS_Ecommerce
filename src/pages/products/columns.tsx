import { product } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<product>[] = [
  {
    accessorKey: "product_name",
    header: "Product Name",
    cell: ({ row }) => <div>{row.getValue("product_name")}</div>,
  },
  {
    accessorKey: "product_category",
    header: "Product Category",
    cell: ({ row }) => <div>{row.getValue("product_category")}</div>,
  },
  {
    accessorKey: "product_sizes",
    header: "Product Sizes",
    cell: ({ row }) => (
      <div>
        {row.original.product_sizes.map((size) => (
          <span key={size.value} className="mr-2">
            {size.label}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "product_color",
    header: "Product Color",
    cell: ({ row }) => (
      <div className="flex gap-2 flex-wrap">
        {row.original.product_color.map((color) => (
          <div
            key={color.value}
            className="size-4 rounded-full"
            style={{
              backgroundColor: color.color,
              color: color.color === "white" ? "black" : "white",
            }}
          ></div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "product_price",
    header: "Product Price",
    cell: ({ row }) => <div>{row.original.product_price}</div>,
  },
  {
    accessorKey: "product_description",
    header: "Product Description",
    cell: ({ row }) => <div>{row.original.product_description}</div>,
  },
];
