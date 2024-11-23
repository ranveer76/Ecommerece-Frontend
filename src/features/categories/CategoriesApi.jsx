import { axiosi } from "../../config/axios"

export const fetchAllCategories=async()=>{
    try {
        const res=await axiosi.get("/api/categories")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const addCategory=async(category)=>{
    try {
        const res=await axiosi.post("/api/categories",category)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateCategory=async(category)=>{
    try {
        const res=await axiosi.put(`/api/categories/${category.id}`,category)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}