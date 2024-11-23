import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { fetchAllBrands, createBrand, updateBrand } from './BrandApi'

const initialState={
    status:"idle",
    brands:[],
    errors:null
}

export const fetchAllBrandsAsync=createAsyncThunk('brands/fetchAllBrandsAsync',async()=>{
    const brands=await fetchAllBrands()
    return brands || []
})

export const createBrandAsync = createAsyncThunk('brands/createBrandAsync', async (brand) => {
    const newBrand = await createBrand(brand)
    return newBrand
})

export const updateBrandAsync = createAsyncThunk('brands/updateBrandAsync', async (brand) => {
    const updatedBrand = await updateBrand(brand)
    return updatedBrand
})

const brandSlice=createSlice({
    name:"brandSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAllBrandsAsync.pending,(state)=>{
                state.status='idle'
            })
            .addCase(fetchAllBrandsAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.brands=action.payload
            })
            .addCase(fetchAllBrandsAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })
        
            .addCase(createBrandAsync.pending,(state)=>{
                state.status='idle'
            })
            .addCase(createBrandAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.brands.push(action.payload)
            })
            .addCase(createBrandAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })
        
            .addCase(updateBrandAsync.pending,(state)=>{
                state.status='idle'
            })
            .addCase(updateBrandAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.brands=state.brands.map(brand=>brand.id===action.payload.id?action.payload:brand)
            })
            .addCase(updateBrandAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })
    }
})

export const selectBrandStatus=(state)=>state.BrandSlice.status
export const selectBrands=(state)=>state.BrandSlice.brands
export const selectBrandErrors = (state) => state.BrandSlice.errors


export default brandSlice.reducer