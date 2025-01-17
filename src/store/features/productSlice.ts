import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { product } from "@/utils/types";

interface InitialProductState {
  products: Array<product>;
  product: product | null;
  isLoading: boolean;
  error: boolean;
  success: boolean;
  message: string | null;
}

const initialProductsState: InitialProductState = {
  products: [],
  product: null,
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
    getProducts: (state) => {
      const storedProducts = localStorage.getItem("products");
      state.isLoading = true;
      if (storedProducts === null) {
        state.isLoading = false;
        state.error = true;
        state.success = false;
        state.message = "No products found";
      } else {
        state.products = JSON.parse(storedProducts);
        state.isLoading = false;
        state.error = false;
        state.success = true;
        state.message = "Products fetched successfully";
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      const storedProducts = localStorage.getItem("products");
      state.isLoading = true;
      if (storedProducts === null) {
        state.isLoading = false;
        state.error = true;
        state.success = false;
        state.message = "No products found";
      } else {
        const products = JSON.parse(storedProducts);
        const updatedProducts = products.filter(
          (product: product) => product.product_name !== action.payload
        );
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        state.products = updatedProducts;
        state.isLoading = false;
        state.error = false;
        state.success = true;
        state.message = "Product deleted successfully";
      }
    },
    getProductByName: (state, action: PayloadAction<string>) => {
      const storedProducts = localStorage.getItem("products");
      state.isLoading = true;
      if (storedProducts === null) {
        state.isLoading = false;
        state.error = true;
        state.success = false;
        state.message = "No products found";
      } else {
        const products = JSON.parse(storedProducts);
        const product = products.find(
          (product: product) => product.product_name === action.payload
        );
        if (product) {
          state.product = product;
          state.isLoading = false;
          state.error = false;
          state.success = true;
          state.message = "Product fetched successfully";
        } else {
          state.isLoading = false;
          state.error = true;
          state.success = false;
          state.message = "Product not found";
        }
      }
    },
    editProductByName: (state, action: PayloadAction<product>) => {
      const storedProducts = localStorage.getItem("products");
      state.isLoading = true;
      if (storedProducts === null) {
        state.isLoading = false;
        state.error = true;
        state.success = false;
        state.message = "No products found";
      } else {
        const products = JSON.parse(storedProducts);
        const updatedProducts = products.map((product: product) =>
          product.product_name === action.payload.product_name
            ? action.payload
            : product
        );
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        state.products = updatedProducts;
        state.isLoading = false;
        state.error = false;
        state.success = true;
        state.message = "Product updated successfully";
      }
    },
    resetProductState: (state) => {
      state.isLoading = false;
      state.product = null;
      state.success = false;
      state.error = false;
      state.message = null;
    },
  },
});

export const {
  addProduct,
  getProducts,
  deleteProduct,
  editProductByName,
  getProductByName,
  resetProductState,
} = productsSlice.actions;

export const selectProduct = (state: RootState) => state.products;

export default productsSlice.reducer;
