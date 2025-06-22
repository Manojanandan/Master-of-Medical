import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createVendorRegisteration } from "../../../utils/Service";

export const registerVendor = createAsyncThunk("RegisterVendor", async (data) => {
    return await createVendorRegisteration(data).then((response) => response.data)
})

export const signUpReducer = createSlice({
    name: "vendorSignup",
    initialState: {
        createUser: {
            name: "",
            email: "",
            password: "",
            address: "",
            area: "",
            phone: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            type: "",
        },
        loader: false,
        message: "",
        success: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerVendor.pending, (state) => {
                state.loader = true;
            })
            .addCase(registerVendor.fulfilled, (state, action) => {
                state.loader = false;
                state.createUser.name = action.payload.name;
                state.createUser.email = action.payload.email;
                state.createUser.password = action.payload.password;
                state.createUser.address = action.payload.address;
                state.createUser.area = action.payload.area;
                state.createUser.phone = action.payload.phone;
                state.createUser.city = action.payload.city;
                state.createUser.state = action.payload.state;
                state.createUser.pincode = action.payload.pincode;
                state.createUser.country = action.payload.country;
                state.createUser.type = action.payload.type;
                state.success = action.payload.success;
                state.message = "Vendor created successfully";
                sessionStorage.setItem("jwt", action.payload.accessToken);                
            })
            .addCase(registerVendor.rejected, (state, action) => {
                state.loader = false;
                state.success = action.payload.success;
                state.message = action.error.message;
            });
    }
})

// export const { addVendorDetails } = signUpReducer.actions;
export default signUpReducer.reducer