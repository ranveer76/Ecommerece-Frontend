import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { fetchAllCategories, addCategory, updateCategory } from './CategoriesApi'

const initialState={
    status:"idle",
    categories:[],
    errors:null
}

export const fetchAllCategoriesAsync=createAsyncThunk('categories/fetchAllCategoriesAsync',async()=>{
    const categories=await fetchAllCategories()
    return categories
})

export const addCategoryAsync = createAsyncThunk('categories/addCategoryAsync', async (category) => {
    const newCategory = await addCategory(category)
    return newCategory
})

export const updateCategoryAsync = createAsyncThunk('categories/updateCategoryAsync', async (category) => {
    const updatedCategory = await updateCategory(category)
    return updatedCategory
})

const categorySlice=createSlice({
    name:"categorySlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAllCategoriesAsync.pending,(state)=>{
                state.status='idle'
            })
            .addCase(fetchAllCategoriesAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.categories=action.payload
            })
            .addCase(fetchAllCategoriesAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

        
            .addCase(addCategoryAsync.pending,(state)=>{
                state.status='idle'
            })
            .addCase(addCategoryAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.categories.push(action.payload)
            })
            .addCase(addCategoryAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })
        
            .addCase(updateCategoryAsync.pending,(state)=>{
                state.status='idle'
            })
            .addCase(updateCategoryAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.categories=state.categories.map(category=>category.id===action.payload.id?action.payload:category)
            })
            .addCase(updateCategoryAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })
    }
})

export const selectCategoryStatus=(state)=>state.CategoriesSlice.status
export const selectCategories=(state)=>state.CategoriesSlice.categories
export const selectCategoryErrors=(state)=>state.CategoriesSlice.errors

export default categorySlice.reducer