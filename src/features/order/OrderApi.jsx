import {axiosi} from '../../config/axios'


export const createOrder=async(order)=>{
    try {
        const res=await axiosi.post("/api/orders",order)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getOrderByUserId=async(id)=>{
    try {
        const res=await axiosi.get(`/api/orders/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getAllOrders=async()=>{
    try {
        const res=await axiosi.get(`/api/orders`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateOrderById=async(update)=>{
    try {
        const res=await axiosi.patch(`/api/orders/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}