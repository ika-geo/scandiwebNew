import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGraphQL } from '../../graphql/fetchGraphQL';
import { GET_CATEGORIES } from '../../graphql/queries';


export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await fetchGraphQL(GET_CATEGORIES);
    return response.categories;
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        selectedCategory: {name:'all', id:1},
        loading: false,
        error: false,
    },
    reducers: {
        selectCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.loading = false;
                state.error = true
            });
    },
});

export const { selectCategory } = categorySlice.actions;
export default categorySlice.reducer;
