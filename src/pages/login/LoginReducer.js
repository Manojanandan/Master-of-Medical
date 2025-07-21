import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../utils/Service";

export const loginUser = createAsyncThunk("Login User",async({data,type})=>{
    return await userLogin(data,type).then((response) => response.data)
})

export const loginReducer = createSlice({
    name: 'login',
    initialState: {
        loginReducer: {
            email: "",
            password: "",
        },
        loader: false,
        message: "",
        success: false,
    },
    reducer: {},
    extraReducers: (builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.loader = true;
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.loader= false
            state.loginReducer.email = action.payload.email
            state.loginReducer.password = action.payload.password
            state.success = action.payload.success
            state.message = action.payload.message
            sessionStorage.setItem("jwt", action.payload.accessToken); 
            
            // Debug: Log the full response to understand structure
            console.log('Login API Response:', action.payload);
            
            // Store user data for cart operations and status checking
            if (action.payload.user) {
                console.log('Storing user data from payload.user:', action.payload.user);
                sessionStorage.setItem("userData", JSON.stringify(action.payload.user));
            } else if (action.payload.data) {
                console.log('Storing user data from payload.data:', action.payload.data);
                sessionStorage.setItem("userData", JSON.stringify(action.payload.data));
            } else {
                // If no specific user object, store the entire payload for status checking
                console.log('Storing entire payload for status checking:', action.payload);
                sessionStorage.setItem("userData", JSON.stringify(action.payload));
            }
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.loader = false
            state.success = false
            state.message = action.error.message
        })
    }
})

export default loginReducer.reducer