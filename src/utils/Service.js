import instance from "./Instance";

//vendor creation
export const createVendorRegisteration = async(data) =>{
    return await  instance.post('vendor/create-vendor',data)
}