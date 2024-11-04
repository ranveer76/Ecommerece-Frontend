import { axiosi } from "../../config/axios";

export const addAddress=async(address)=>{
    try {
        const res=await axiosi.post("/api/address",address)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const fetchAddressByUserId=async(id)=>{
    try {
        const res=await axiosi.get(`/api/address/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const updateAddressById=async(update)=>{
    try {
        const res=await axiosi.patch(`/api/address/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const deleteAddressById=async(id)=>{
    try {
        const res=await axiosi.delete(`/api/address/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}