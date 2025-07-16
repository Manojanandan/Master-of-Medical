import instance from "./Instance";

//vendor creation
export const createVendorRegisteration = async(data) =>{
    return await  instance.post('vendor/create-vendor',data)
}

//customer creation
export const createCustomer = async(data) =>{
    return await instance.post('customer/create-customer', data)
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

// Get all products (public endpoint without filters)
export const getAllProductsPublic = async() =>{
    return await instance.get('product/get-all-product')
}

export const getProductById = async(productId) =>{
    return await instance.get(`product/get-product/${productId}`)
}

export const updateProduct = async(productId, data) =>{
    return await instance.put(`product/update-product/${productId}`, data)
}

// Public product APIs (for e-commerce)
export const getPublicProducts = async(params = {}) =>{
    const queryParams = new URLSearchParams();
    
    // Add pagination parameters
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    
    // Add filter parameters
    if (params.category) queryParams.append('category', params.category);
    if (params.brand) queryParams.append('brand', params.brand);
    if (params.minPrice) queryParams.append('minPrice', params.minPrice);
    if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);
    
    // Add search parameter
    if (params.search) queryParams.append('search', params.search);
    
    // Add sort parameter
    if (params.sort) queryParams.append('sort', params.sort);
    
    const queryString = queryParams.toString();
    const url = queryString ? `product/get-all-product?${queryString}` : 'product/get-all-product';
    
    return await instance.get(url)
}

export const getPublicProductById = async(productId) =>{
    return await instance.get(`product/get-product/${productId}`)
}