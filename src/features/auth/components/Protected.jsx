import { useSelector } from "react-redux"
import { selectLoggedInUser } from "../AuthSlice"
import { Navigate } from "react-router"
import { toast } from "react-toastify"


export const Protected = ({children}) => {
    const loggedInUser=useSelector(selectLoggedInUser)

    if(loggedInUser?.isVerified){
        return children
    }
    toast.error('Please login to continue');
    return <Navigate to={'/login'} replace={true}/>
}
