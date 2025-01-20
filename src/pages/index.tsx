import DataTable from "@/pages/products/(component)/data-table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { getProducts, resetProductState } from "@/store/features/productSlice";
import { toast } from "sonner";
import { useEffect } from "react";
import { columns } from "@/pages/products/(component)/columns";
import CustomButton from "@/components/custom-button";

const LandingPage = () => {
  const { products, message } = useSelector(
    (state: RootState) => state.products
  );
  const newColumns = columns.filter(
    (column) =>
      column.header !== "Delete Product" && column.header !== "Edit Product"
  );
  // console.log(newColumns);

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
    <main className="flex items-center min-h-[91.3vh]">
      <div className="container pt-24 mx-auto p-4 flex flex-col gap-6">
        <section className="text-2xl md:text-4xl lg:text-6xl font-semibold md:font-bold text-white text-center">
          <h1>
            Create Your Products <br /> More Efficiently
          </h1>
        </section>

        <section className="text-violet-200 text-center">
          <p className="text-lg md:text-xl lg:text-2xl w-1/2 mx-auto">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
        </section>

        <section className="flex justify-center gap-4">
          <CustomButton
            onClick={() => {
              router.push("/products/add");
            }}
          >
            Add Products
          </CustomButton>
          <CustomButton
            onClick={() => {
              router.push("/analytic");
            }}
          >
            View Analytics
          </CustomButton>
        </section>

        <section className="rounded-md border border-white/10 text-white bg-[#3b2a69]/60 w-4/5 mx-auto p-4">
          <DataTable data={products || []} columns={newColumns} />
        </section>
      </div>
    </main>
  );
};

export default LandingPage;
