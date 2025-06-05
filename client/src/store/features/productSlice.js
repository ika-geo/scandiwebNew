import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGraphQL } from '../../graphql/fetchGraphQL';
import { GET_PRODUCTS_BY_CATEGORY, GET_PRODUCT_BY_ID } from '../../graphql/queries';


export const fetchProductsByCategory = createAsyncThunk('products/fetchProductsByCategory', async (category_id) => {
    const response = await fetchGraphQL(GET_PRODUCTS_BY_CATEGORY, { category_id });
    return response.productsByCategory;
});


export const fetchProductById = createAsyncThunk('products/fetchProductById', async (product_id) => {
    const response = await fetchGraphQL(GET_PRODUCT_BY_ID, { product_id: product_id });
    return response.product;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        selectedProduct: null,
        loading: false,
        error: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })

            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.selectedProduct = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductById.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export default productSlice.reducer;
