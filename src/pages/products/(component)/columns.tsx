import { Button } from "@/components/ui/button";
import {
  deleteProduct,
  editProductByName,
  getProductByName,
  resetProductState,
} from "@/store/features/productSlice";
import { product } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { Textarea } from "@/components/ui/textarea";
import ReactSelect from "react-select";
import { sizeOptions } from "@/utils/sizeOptions";
import { colorOptions, multiSelectStyles } from "@/utils/colorOptions";

const EditHelperComponent = ({ product_name }: { product_name: string }) => {
  const { product, success } = useSelector(
    (state: RootState) => state.products
  );
  const [fetchedProduct, setFetchedProduct] = useState<product | null>(null);
  const dispatch = useDispatch();

  // Fetch product when the component is opened
  const handleOpen = () => {
    dispatch(getProductByName(product_name));
  };

  useEffect(() => {
    if (success && product) {
      setFetchedProduct(product);
    }
  }, [success, product]);

  return (
    <Sheet onOpenChange={handleOpen}>
      <SheetTrigger>
        <Button
          className="bg-indigo-500 hover:bg-indigo-200 text-white hover:text-indigo-500"
          variant={"ghost"}
          size={"icon"}
        >
          <Pencil size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
          <SheetClose />
        </SheetHeader>
        <div className="py-4 space-y-2">
          <div>
            <Label>Product Name</Label>
            <Input
              value={fetchedProduct?.product_name || ""}
              onChange={(e) =>
                setFetchedProduct((prev) =>
                  prev ? { ...prev, product_name: e.target.value } : prev
                )
              }
            />
          </div>
          <div>
            <Label>Product Category</Label>
            <Input
              value={fetchedProduct?.product_category || ""}
              onChange={(e) =>
                setFetchedProduct((prev) =>
                  prev ? { ...prev, product_category: e.target.value } : prev
                )
              }
            />
          </div>
          <div>
            <Label>Product Sizes</Label>
            <ReactSelect
              isMulti
              options={sizeOptions}
              value={fetchedProduct?.product_sizes || []}
              onChange={(selected) =>
                setFetchedProduct((prev) =>
                  prev ? { ...prev, product_sizes: [...selected] } : prev
                )
              }
              className="text-black shadow-sm"
              classNamePrefix="select"
            />
          </div>
          <div>
            <Label>Product Color</Label>
            <ReactSelect
              isMulti
              options={colorOptions}
              value={fetchedProduct?.product_color || []}
              onChange={(selected) =>
                setFetchedProduct((prev) =>
                  prev
                    ? {
                        ...prev,
                        product_color: selected as {
                          label: string;
                          value: string;
                          color: string;
                        }[],
                      }
                    : prev
                )
              }
              className="basic-multi-select shadow-sm"
              classNamePrefix="select"
              styles={multiSelectStyles}
            />
          </div>
          <div>
            <Label>Product Price</Label>
            <Input
              value={fetchedProduct?.product_price || ""}
              onChange={(e) =>
                setFetchedProduct((prev) =>
                  prev ? { ...prev, product_price: e.target.value } : prev
                )
              }
            />
          </div>
          <div>
            <Label>Product Description</Label>
            <Textarea
              className="h-40"
              value={fetchedProduct?.product_description || ""}
              onChange={(e) =>
                setFetchedProduct((prev) =>
                  prev ? { ...prev, product_description: e.target.value } : prev
                )
              }
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              onClick={() => {
                console.log("Updated Product:", fetchedProduct);
                dispatch(editProductByName(fetchedProduct as product));
                if (success) {
                  toast.success("Product updated successfully.");
                  dispatch(resetProductState());
                }
              }}
            >
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const DeleteHelperComponent = ({ product_name }: { product_name: string }) => {
  const dispatch = useDispatch();
  return (
    <Button
      className="bg-violet-500 hover:bg-violet-200 text-white hover:text-violet-500"
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
            className="size-4 border border-white/20 rounded-full"
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent hover:text-inherit text-left"
        >
          Price
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.product_price}</div>,
    sortingFn: (a, b) => {
      const priceA = parseFloat(a.original.product_price) || 0;
      const priceB = parseFloat(b.original.product_price) || 0;
      return priceA - priceB;
    },
  },
  {
    accessorKey: "product_description",
    header: "Product Description",
    cell: ({ row }) => (
      <div className="truncate max-w-[200px]">
        {row.original.product_description}
      </div>
    ),
  },
  {
    header: "Delete Product",
    cell: ({ row }) => (
      <DeleteHelperComponent product_name={row.original.product_name} />
    ),
  },
  {
    header: "Edit Product",
    cell: ({ row }) => (
      <EditHelperComponent product_name={row.original.product_name} />
    ),
  },
];

export default DeleteHelperComponent;
