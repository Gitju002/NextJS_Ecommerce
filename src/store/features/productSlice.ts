import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { product } from "@/utils/types";

interface InitialProductState {
  products: Array<product>;
  isLoading: boolean;
  error: boolean;
  success: boolean;
  message: string | null;
}

const initialProductsState: InitialProductState = {
  products: [],
  isLoading: false,
  error: false,
  success: false,
  message: null,
};

export const productsSlice = createSlice({
  name: "products/add",
  initialState: initialProductsState,
  reducers: {
    addProduct: (state, action: PayloadAction<product>) => {
      const storedProducts = localStorage.getItem("products");
      state.isLoading = true;
      if (storedProducts === null) {
        state.products.push(action.payload);
        localStorage.setItem("products", JSON.stringify(state.products));
        state.isLoading = false;
        state.error = false;
        state.success = true;
        state.message = "Product added successfully";
      } else {
        const products = JSON.parse(storedProducts);
        const productExists = products.find(
          (product: product) =>
            product.product_name === action.payload.product_name
        );
        if (productExists) {
          state.isLoading = false;
          state.error = true;
          state.success = false;
          state.message = "Product already exists";
        } else {
          state.products.push(action.payload);
          localStorage.setItem("products", JSON.stringify(state.products));
          state.isLoading = false;
          state.error = false;
          state.success = true;
          state.message = "Product added successfully";
        }
      }
    },
  },
});

export const { addProduct } = productsSlice.actions;

export const selectProduct = (state: RootState) => state.products;

export default productsSlice.reducer;
