import { combineReducers } from "@reduxjs/toolkit";
import  signUpReducer  from "../pages/login/Signup/SignUpReducer";

 const rootReducer = combineReducers({
    signUpReducer: signUpReducer,
})

export default rootReducer  