import { axiosi } from "../../config/axios";

export const fetchAllBrands=async()=>{
    try {
        const res=await axiosi.get("/api/brands")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const createBrand = async (brand) => {
    try {
        const res = await axiosi.post("/api/brands", brand)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateBrand = async (brand) => {
    try {
        const res = await axiosi.put(`/api/brands/${brand.id}`, brand)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}