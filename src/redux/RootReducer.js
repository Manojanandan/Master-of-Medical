import { combineReducers } from "@reduxjs/toolkit";
import  signUpReducer  from "../pages/login/Signup/SignUpReducer";
import  loginReducer  from "../pages/login/LoginReducer";

 const rootReducer = combineReducers({
    signUpReducer: signUpReducer,
    loginReducer: loginReducer,
})

export default rootReducer  