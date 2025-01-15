import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

interface InitialProductState{
    products: Array<product>,
    isLoading: boolean,
    error: null | string,
    success: null | string
}

const initialProductsState: InitialProductState = {
   products: [],
   isLoading: false,
    error: null,
    success:null
    }

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        addProduct: (state, action: PayloadAction<product>) => {
            if (localStorage.getItem('products') === null) {
                localStorage.setItem('products', JSON.stringify([]))
            }else{
                const products = JSON.parse(localStorage.getItem('products') || '[]')
                products.find((product: product) => product.product_name === action.payload.product_name) ? state.error = 'Product already exists' : state.products.push(action.payload)
                localStorage.setItem('products', JSON.stringify(state.products))
            }
        }
    }
})

export const { addProduct } = productsSlice.actions

export const selectProduct = (state: RootState) => state.products

export default productsSlice.reducer