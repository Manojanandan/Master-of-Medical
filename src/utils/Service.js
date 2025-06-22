import instance from "./Instance";

//vendor creation
export const createVendorRegisteration = async(data) =>{
    return await  instance.post('vendor/create-vendor',data)
}

//login creation
export const userLogin = async(data,type) =>{
    return await  instance.post(`user/login/${type}`,data)
}