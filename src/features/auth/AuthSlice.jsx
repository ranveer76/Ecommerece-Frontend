import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { checkAuth, forgotPassword, login, logout, resendOtp, resetPassword, signup, verifyOtp } from './AuthApi'

const initialState={
    status:"idle",
    errors:undefined,
    resendOtpStatus:"idle",
    resendOtpSuccessMessage:undefined,
    resendOtpError:undefined,
    signupStatus:"idle",
    signupError:undefined,
    loginStatus:"idle",
    loginError:undefined,
    loggedInUser:undefined,
    otpVerificationStatus:"idle",
    otpVerificationError:undefined,
    forgotPasswordStatus:"idle",
    forgotPasswordSuccessMessage:undefined,
    forgotPasswordError:undefined,
    resetPasswordStatus:"idle",
    resetPasswordSuccessMessage:undefined,
    resetPasswordError:undefined,
    successMessage:undefined,
    isAuthChecked:false
}

export const signupAsync=createAsyncThunk('auth/signupAsync',async(cred)=>{
    const res=await signup(cred)
    return res
})

export const loginAsync=createAsyncThunk('auth/loginAsync',async(cred)=>{
    const res=await login(cred)
    return res
})

export const verifyOtpAsync=createAsyncThunk('auth/verifyOtpAsync',async(cred)=>{
    const res=await verifyOtp(cred)
    return res
})
export const resendOtpAsync=createAsyncThunk("auth/resendOtpAsync",async(cred)=>{
    const res=await resendOtp(cred)
    return res
})
export const forgotPasswordAsync=createAsyncThunk('auth/forgotPasswordAsync',async(cred)=>{
    const res=await forgotPassword(cred)
    return res
})

export const resetPasswordAsync=createAsyncThunk('auth/resetPasswordAsync',async(cred)=>{
    const res=await resetPassword(cred)
    return res
})

export const checkAuthAsync=createAsyncThunk('auth/checkAuthAsync',async()=>{
    const res=await checkAuth()
    return res
})

export const logoutAsync=createAsyncThunk("auth/logoutAsync",async()=>{
    const res=await logout()
    return res
})


const authSlice=createSlice({
    name:"authSlice",
    initialState:initialState,
    reducers:{
        clearAuthSuccessMessage:(state)=>{
            state.successMessage=undefined
        },
        clearAuthErrors:(state)=>{
            state.errors=undefined
        },
        resetAuthStatus:(state)=>{
            state.status='idle'
        },
        resetSignupStatus:(state)=>{
            state.signupStatus='idle'
        },
        clearSignupError:(state)=>{
            state.signupError=undefined
        },
        resetLoginStatus:(state)=>{
            state.loginStatus='idle'
        },
        clearLoginError:(state)=>{
            state.loginError=undefined
        },
        resetOtpVerificationStatus:(state)=>{
            state.otpVerificationStatus='idle'
        },
        clearOtpVerificationError:(state)=>{
            state.otpVerificationError=undefined
        },
        resetResendOtpStatus:(state)=>{
            state.resendOtpStatus='idle'
        },
        clearResendOtpError:(state)=>{
            state.resendOtpError=undefined
        },
        clearResendOtpSuccessMessage:(state)=>{
            state.resendOtpSuccessMessage=undefined
        },
        resetForgotPasswordStatus:(state)=>{
            state.forgotPasswordStatus='idle'
        },
        clearForgotPasswordSuccessMessage:(state)=>{
            state.forgotPasswordSuccessMessage=undefined
        },
        clearForgotPasswordError:(state)=>{
            state.forgotPasswordError=undefined
        },
        resetResetPasswordStatus:(state)=>{
            state.resetPasswordStatus='idle'
        },
        clearResetPasswordSuccessMessage:(state)=>{
            state.resetPasswordSuccessMessage=undefined
        },
        clearResetPasswordError:(state)=>{
            state.resetPasswordError=undefined
        }

        
    },
    extraReducers:(builder)=>{
        builder
            .addCase(signupAsync.pending,(state)=>{
                state.signupStatus='pending'
            })
            .addCase(signupAsync.fulfilled,(state,action)=>{
                state.signupStatus='fullfilled'
                state.loggedInUser=action.payload
            })
            .addCase(signupAsync.rejected,(state,action)=>{
                state.signupStatus='rejected'
                state.signupError=action.error
            })

            .addCase(loginAsync.pending,(state)=>{
                state.loginStatus='pending'
            })
            .addCase(loginAsync.fulfilled,(state,action)=>{
                state.loginStatus='fullfilled'
                state.loggedInUser=action.payload
            })
            .addCase(loginAsync.rejected,(state,action)=>{
                state.loginStatus='rejected'
                state.loginError=action.error
            })

            .addCase(verifyOtpAsync.pending,(state)=>{
                state.otpVerificationStatus='pending'
            })
            .addCase(verifyOtpAsync.fulfilled,(state,action)=>{
                state.otpVerificationStatus='fullfilled'
                state.loggedInUser=action.payload
            })
            .addCase(verifyOtpAsync.rejected,(state,action)=>{
                state.otpVerificationStatus='rejected'
                state.otpVerificationError=action.error
            })

            .addCase(resendOtpAsync.pending,(state)=>{
                state.resendOtpStatus='pending'
            })
            .addCase(resendOtpAsync.fulfilled,(state,action)=>{
                state.resendOtpStatus='fullfilled'
                state.resendOtpSuccessMessage=action.payload
            })
            .addCase(resendOtpAsync.rejected,(state,action)=>{
                state.resendOtpStatus='rejected'
                state.resendOtpError=action.error
            })

            .addCase(forgotPasswordAsync.pending,(state)=>{
                state.forgotPasswordStatus='pending'
            })
            .addCase(forgotPasswordAsync.fulfilled,(state,action)=>{
                state.forgotPasswordStatus='fullfilled'
                state.forgotPasswordSuccessMessage=action.payload
            })
            .addCase(forgotPasswordAsync.rejected,(state,action)=>{
                state.forgotPasswordStatus='rejected'
                state.forgotPasswordError=action.error
            })

            .addCase(resetPasswordAsync.pending,(state)=>{
                state.resetPasswordStatus='pending'
            })
            .addCase(resetPasswordAsync.fulfilled,(state,action)=>{
                state.resetPasswordStatus='fullfilled'
                state.resetPasswordSuccessMessage=action.payload
            })
            .addCase(resetPasswordAsync.rejected,(state,action)=>{
                state.resetPasswordStatus='rejected'
                state.resetPasswordError=action.error
            })

            .addCase(logoutAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(logoutAsync.fulfilled,(state)=>{
                state.status='fullfilled'
                state.loggedInUser=undefined
            })
            .addCase(logoutAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(checkAuthAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(checkAuthAsync.fulfilled,(state,action)=>{
                state.status='fullfilled'
                state.loggedInUser=action.payload
                state.isAuthChecked=true
            })
            .addCase(checkAuthAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
                state.isAuthChecked=true
            })
            
    }
})

export const selectAuthStatus=(state)=>state.AuthSlice.status
export const selectAuthErrors=(state)=>state.AuthSlice.errors
export const selectLoggedInUser=(state)=>state.AuthSlice.loggedInUser
export const selectAuthSuccessMessage=(state)=>state.AuthSlice.successMessage
export const selectIsAuthChecked=(state)=>state.AuthSlice.isAuthChecked
export const selectResendOtpStatus=(state)=>state.AuthSlice.resendOtpStatus
export const selectResendOtpSuccessMessage=(state)=>state.AuthSlice.resendOtpSuccessMessage
export const selectResendOtpError=(state)=>state.AuthSlice.resendOtpError
export const selectSignupStatus=(state)=>state.AuthSlice.signupStatus
export const selectSignupError=(state)=>state.AuthSlice.signupError
export const selectLoginStatus=(state)=>state.AuthSlice.loginStatus
export const selectLoginError=(state)=>state.AuthSlice.loginError
export const selectOtpVerificationStatus=(state)=>state.AuthSlice.otpVerificationStatus
export const selectOtpVerificationError=(state)=>state.AuthSlice.otpVerificationError
export const selectForgotPasswordStatus=(state)=>state.AuthSlice.forgotPasswordStatus
export const selectForgotPasswordSuccessMessage=(state)=>state.AuthSlice.forgotPasswordSuccessMessage
export const selectForgotPasswordError=(state)=>state.AuthSlice.forgotPasswordError
export const selectResetPasswordStatus=(state)=>state.AuthSlice.resetPasswordStatus
export const selectResetPasswordSuccessMessage=(state)=>state.AuthSlice.resetPasswordSuccessMessage
export const selectResetPasswordError=(state)=>state.AuthSlice.resetPasswordError

export const {clearAuthSuccessMessage,clearAuthErrors,resetAuthStatus,clearSignupError,resetSignupStatus,clearLoginError,resetLoginStatus,clearOtpVerificationError,resetOtpVerificationStatus,clearResendOtpError,clearResendOtpSuccessMessage,resetResendOtpStatus,clearForgotPasswordError,clearForgotPasswordSuccessMessage,resetForgotPasswordStatus,clearResetPasswordError,clearResetPasswordSuccessMessage,resetResetPasswordStatus}=authSlice.actions

export default authSlice.reducer

