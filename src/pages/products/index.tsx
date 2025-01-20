import { columns } from "./(component)/columns";
import DataTable from "./(component)/data-table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { getProducts, resetProductState } from "@/store/features/productSlice";
import { useRouter } from "next/router";
import { toast } from "sonner";
import CustomButton from "@/components/custom-button";

const Products = () => {
  const { products, message } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(getProducts());
    if (message) {
      toast.success(message);
    }
    dispatch(resetProductState());
  }, [dispatch, message]);

  return (
    <div className="min-h-[91.3vh] p-8 flex flex-col gap-6 items-center">
      <div className="flex justify-end w-4/5 mx-auto">
        <CustomButton
          onClick={() => {
            router.push("/products/add");
          }}
        >
          Add Product
        </CustomButton>
      </div>
      <div className="rounded-md border border-white/10 text-white bg-[#3b2a69]/60 w-4/5 p-4">
        <DataTable columns={columns} data={products || []} />
      </div>
    </div>
  );
};

export default Products;
