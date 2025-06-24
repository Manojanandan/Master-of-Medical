import { combineReducers } from "@reduxjs/toolkit";
import  signUpReducer  from "../pages/login/Signup/SignUpReducer";
import  loginReducer  from "../pages/login/LoginReducer";
import vendorProfileReducer from "../pages/vendor/reducers/VendorProfileReducer";

 const rootReducer = combineReducers({
    signUpReducer: signUpReducer,
    loginReducer: loginReducer,
    vendorProfileReducer: vendorProfileReducer,
})

export default rootReducer  