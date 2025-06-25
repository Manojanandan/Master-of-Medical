import instance from "./Instance";

//vendor creation
export const createVendorRegisteration = async(data) =>{
    return await  instance.post('vendor/create-vendor',data)
}

//login creation
export const userLogin = async(data,type) =>{
    return await  instance.post(`user/login/${type}`,data)
}

//vendor profile APIs
export const getVendorProfile = async(vendorId) =>{
    return await instance.get(`vendor/get-vendor/${vendorId}`)
}

export const updateVendorProfile = async(data) =>{
    return await instance.put('vendor/update-vendor', data)
}

//product APIs
export const createProduct = async(data) =>{
    return await instance.post('product/create-product', data)
}

export const getAllProducts = async(vendorId) =>{
    return await instance.get(`product/get-all-product?userId=${vendorId}`)
}

export const getProductById = async(productId) =>{
    return await instance.get(`product/get-product/${productId}`)
}

export const updateProduct = async(productId, data) =>{
    return await instance.put(`product/update-product/${productId}`, data)
}