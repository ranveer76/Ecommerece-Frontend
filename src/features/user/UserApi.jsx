import { axiosi } from "../../config/axios"

export const fetchLoggedInUserById=async(id)=>{
    try {
        const res=await axiosi.get(`/api/users/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const updateUserById=async(update)=>{
    try {
        const res=await axiosi.patch(`/api/users/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}