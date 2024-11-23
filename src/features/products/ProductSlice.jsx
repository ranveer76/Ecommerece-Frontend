import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    addProduct,
    deleteProductById,
    fetchProductById,
    fetchProducts,
    undeleteProductById,
    updateProductById,
} from './ProductApi';

const initialState = {
    status: 'idle',
    productUpdateStatus: 'idle',
    productAddStatus: 'idle',
    productFetchStatus: 'idle',
    featuredProductsFetchStatus: 'idle',
    products: [],
    featuredProducts: [],
    totalResults: 0,
    isFilterOpen: false,
    selectedProduct: null,
    errors: null,
    successMessage: null,
};

export const addProductAsync = createAsyncThunk(
    'products/addProductAsync',
    async (data) => {
        const addedProduct = await addProduct(data);
        return addedProduct;
    }
);
export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProductsAsync',
    async (filters) => {
        const products = await fetchProducts(filters);
        return products;
    }
);
export const fetchProductByIdAsync = createAsyncThunk(
    'products/fetchProductByIdAsync',
    async (id) => {
        const selectedProduct = await fetchProductById(id);
        return selectedProduct;
    }
);
export const updateProductByIdAsync = createAsyncThunk(
    'products/updateProductByIdAsync',
    async (update) => {
        const updatedProduct = await updateProductById(update);
        return updatedProduct;
    }
);
export const undeleteProductByIdAsync = createAsyncThunk(
    'products/undeleteProductByIdAsync',
    async (id) => {
        const unDeletedProduct = await undeleteProductById(id);
        return unDeletedProduct;
    }
);
export const deleteProductByIdAsync = createAsyncThunk(
    'products/deleteProductByIdAsync',
    async (id) => {
        const deletedProduct = await deleteProductById(id);
        return deletedProduct;
    }
);
export const fetchFeaturedProductsAsync = createAsyncThunk(
    'products/fetchFeaturedProductsAsync',
    async () => {
        const featuredProducts = await fetchProducts({ featured: true });
        return featuredProducts;
    }
);

const productSlice = createSlice({
    name: 'productSlice',
    initialState: initialState,
    reducers: {
        clearProductErrors: (state) => {
            state.errors = null;
        },
        clearProductSuccessMessage: (state) => {
            state.successMessage = null;
        },
        resetProductStatus: (state) => {
            state.status = 'idle';
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        resetProductUpdateStatus: (state) => {
            state.productUpdateStatus = 'idle';
        },
        resetProductAddStatus: (state) => {
            state.productAddStatus = 'idle';
        },
        toggleFilters: (state) => {
            state.isFilterOpen = !state.isFilterOpen;
        },
        resetProductFetchStatus: (state) => {
            state.productFetchStatus = 'idle';
        },
        resetFeaturedProductsFetchStatus: (state) => {
            state.featuredProductsFetchStatus = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProductAsync.pending, (state) => {
                state.productAddStatus = 'pending';
            })
            .addCase(addProductAsync.fulfilled, (state, action) => {
                state.productAddStatus = 'fullfilled';
                state.products.push(action.payload);
            })
            .addCase(addProductAsync.rejected, (state, action) => {
                state.productAddStatus = 'rejected';
                state.errors = action.error;
            })

            .addCase(fetchProductsAsync.pending, (state) => {
                state.productFetchStatus = 'pending';
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.productFetchStatus = 'fullfilled';
                state.products = action.payload.data;
                state.totalResults = action.payload.totalResults;
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.productFetchStatus = 'rejected';
                state.errors = action.error;
            })
            .addCase(fetchFeaturedProductsAsync.pending, (state) => {
                state.featuredProductsFetchStatus = 'pending';
            })
            .addCase(fetchFeaturedProductsAsync.fulfilled, (state, action) => {
                state.featuredProductsFetchStatus = 'fullfilled';
                state.featuredProducts = action.payload.data;
            })
            .addCase(fetchFeaturedProductsAsync.rejected, (state, action) => {
                state.featuredProductsFetchStatus = 'rejected';
                state.errors = action.error;
            })

            .addCase(fetchProductByIdAsync.pending, (state) => {
                state.productFetchStatus = 'pending';
            })
            .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
                state.productFetchStatus = 'fullfilled';
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductByIdAsync.rejected, (state, action) => {
                state.productFetchStatus = 'rejected';
                state.errors = action.error;
            })

            .addCase(updateProductByIdAsync.pending, (state) => {
                state.productUpdateStatus = 'pending';
            })
            .addCase(updateProductByIdAsync.fulfilled, (state, action) => {
                state.productUpdateStatus = 'fullfilled';
                const index = state.products.findIndex(
                    (product) => product._id === action.payload._id
                );
                state.products[index] = action.payload;
            })
            .addCase(updateProductByIdAsync.rejected, (state, action) => {
                state.productUpdateStatus = 'rejected';
                state.errors = action.error;
            })

            .addCase(undeleteProductByIdAsync.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(undeleteProductByIdAsync.fulfilled, (state, action) => {
                state.status = 'fullfilled';
                const index = state.products.findIndex(
                    (product) => product._id === action.payload._id
                );
                state.products[index] = action.payload;
            })
            .addCase(undeleteProductByIdAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.errors = action.error;
            })

            .addCase(deleteProductByIdAsync.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(deleteProductByIdAsync.fulfilled, (state, action) => {
                state.status = 'fullfilled';
                const index = state.products.findIndex(
                    (product) => product._id === action.payload._id
                );
                state.products[index] = action.payload;
            })
            .addCase(deleteProductByIdAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.errors = action.error;
            });
    },
});

export const selectProductStatus = (state) => state.ProductSlice.status;
export const selectProducts = (state) => state.ProductSlice.products;
export const selectProductTotalResults = (state) =>
    state.ProductSlice.totalResults;
export const selectSelectedProduct = (state) =>
    state.ProductSlice.selectedProduct;
export const selectProductErrors = (state) => state.ProductSlice.errors;
export const selectProductSuccessMessage = (state) =>
    state.ProductSlice.successMessage;
export const selectProductUpdateStatus = (state) =>
    state.ProductSlice.productUpdateStatus;
export const selectProductAddStatus = (state) =>
    state.ProductSlice.productAddStatus;
export const selectProductIsFilterOpen = (state) =>
    state.ProductSlice.isFilterOpen;
export const selectProductFetchStatus = (state) =>
    state.ProductSlice.productFetchStatus;
export const selectFeaturedProductsFetchStatus = (state) =>
    state.ProductSlice.featuredProductsFetchStatus;
export const selectFeaturedProducts = (state) =>
    state.ProductSlice.featuredProducts;

export const {
    clearProductSuccessMessage,
    clearProductErrors,
    clearSelectedProduct,
    resetProductStatus,
    resetProductUpdateStatus,
    resetProductAddStatus,
    toggleFilters,
    resetProductFetchStatus,
    resetFeaturedProductsFetchStatus,
} = productSlice.actions;

export default productSlice.reducer;
