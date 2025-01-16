import { columns } from "./(component)/columns";
import DataTable from "./(component)/data-table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { getProducts, resetProductState } from "@/store/features/productSlice";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { toast } from "sonner";

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
  }, []);

  return (
    <div className="container min-h-screen border p-10 bg-slate-50">
      <Button className="mb-5" onClick={() => router.push("/products/add")}>
        Add Product
      </Button>
      <DataTable columns={columns} data={products || []} />
    </div>
  );
};

export default Products;
