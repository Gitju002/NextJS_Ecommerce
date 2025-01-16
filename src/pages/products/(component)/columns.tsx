import { Button } from "@/components/ui/button";
import {
  deleteProduct,
  resetProductState,
} from "@/store/features/productSlice";
import { product } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const HelperComponent = ({ product_name }: { product_name: string }) => {
  const dispatch = useDispatch();
  return (
    <Button
      className="bg-red-500 text-white"
      variant={"ghost"}
      size={"icon"}
      onClick={() => {
        dispatch(deleteProduct(product_name));
        toast.success("Product deleted successfully.");
        dispatch(resetProductState());
      }}
    >
      <Trash size={20} />
    </Button>
  );
};

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
        {row.original.product_sizes?.map((size) => (
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
        {row.original.product_color?.map((color) => (
          <div
            key={color.value}
            className="size-4 rounded-full"
            style={{
              backgroundColor: color.color,
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
  {
    header: "Delete Product",
    cell: ({ row }) => (
      <HelperComponent product_name={row.original.product_name} />
    ),
  },
];

export default HelperComponent;
