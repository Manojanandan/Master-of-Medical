import { instance } from "./Instance";

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
    if(type === 'vendor' || type === 'customer'){
        return await  instance.post(`user/login/${type}`,data)

    }

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
export const getAllProductsPublic = async(params = {}) =>{
    const queryParams = new URLSearchParams();
    
    // Add newArrival parameter if provided
    if (params.newArrival !== undefined) queryParams.append('newArrival', params.newArrival);
    
    const queryString = queryParams.toString();
    const url = queryString ? `product/get-all-product?${queryString}` : 'product/get-all-product';
    
    return await instance.get(url)
}

export const getProductById = async(productId) =>{
    return await instance.get(`product/get-product/${productId}`)
}

export const updateProduct = async(productId, data) =>{
    try {
        const token = localStorage.getItem('token');
        
        // If data is FormData, append the product ID
        if (data instanceof FormData) {
            data.append('id', productId);
        } else {
            // If data is a plain object, create FormData and add the ID
            const formData = new FormData();
            formData.append('id', productId);
            
            // Add all other data to FormData
            Object.keys(data).forEach(key => {
                if (data[key] !== undefined && data[key] !== null) {
                    formData.append(key, data[key]);
                }
            });
            
            data = formData;
        }
        
        const response = await instance.put(`/product/update-product`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

// Public product APIs (for e-commerce)
export const getPublicProducts = async(params = {}) =>{
    const queryParams = new URLSearchParams();
    
    // Add pagination parameters
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    
    // Add filter parameters
    if (params.category) queryParams.append('category', params.category);
    if (params.subCategory) queryParams.append('subCategory', params.subCategory);
    if (params.brand) queryParams.append('brandName', params.brand); // API expects brandName
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

// Cart APIs
export const getCart = async(cartId) =>{
    return await instance.get(`cart/get-cart/${cartId}`)
}

export const addCartItem = async(cartData) =>{
    return await instance.post('cart/add-cart-item', cartData)
}

export const updateCartItem = async(cartItemId, quantity) =>{
    return await instance.put(`cart/update-cart-item/${cartItemId}`, { quantity })
}

export const deleteCartItem = async(cartItemId) =>{
    return await instance.delete(`cart/delete-cart-item/${cartItemId}`)
}

export const clearCart = async(cartId) =>{
    return await instance.delete(`cart/clear-cart/${cartId}`)
}

// Customer APIs
export const updateCustomer = async(customerData) =>{
    return await instance.put('customer/update-customer', customerData)
}

export const getCustomerById = async(customerId) =>{
    return await instance.get(`customer/get-customer/${customerId}`)
}

// Address APIs
export const getAllAddresses = async(params = {}) =>{
    const queryParams = new URLSearchParams();
    
    // Add query parameters
    if (params.city) queryParams.append('city', params.city);
    if (params.state) queryParams.append('state', params.state);
    if (params.country) queryParams.append('country', params.country);
    if (params.customerId) queryParams.append('customerId', params.customerId);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    
    const queryString = queryParams.toString();
    const url = queryString ? `address/get-all-address?${queryString}` : 'address/get-all-address';
    
    return await instance.get(url)
}

export const getAddressById = async(addressId) =>{
    return await instance.get(`address/get-address/${addressId}`)
}

export const createAddress = async(addressData) =>{
    return await instance.post('address/create-address', addressData)
}

export const updateAddress = async(addressData) =>{
    return await instance.put('address/update-address', addressData)
}

export const deleteAddress = async(addressId) =>{
    return await instance.delete(`address/delete-address/${addressId}`)
}

// Order APIs
export const createOrder = async(orderData) =>{
    return await instance.post('order/create-order', orderData)
}

export const getAllOrders = async(params = {}) =>{
    const queryParams = new URLSearchParams();
    
    console.log('getAllOrders called with params:', params);
    
    // Add query parameters
    if (params.status) queryParams.append('status', params.status);
    if (params.customerId) queryParams.append('customerId', params.customerId);
    if (params.vendorId) queryParams.append('vendorId', params.vendorId);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.search) queryParams.append('search', params.search);
    if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
    if (params.dateTo) queryParams.append('dateTo', params.dateTo);
    
    const queryString = queryParams.toString();
    const url = queryString ? `order/get-all-orders?${queryString}` : 'order/get-all-orders';
    
    console.log('getAllOrders URL:', url);
    
    return await instance.get(url)
}

// Review and Rating APIs
export const createReview = async(reviewData) =>{
    return await instance.post('review/create-review', reviewData)
}

export const getAllReviews = async(params = {}) =>{
    const queryParams = new URLSearchParams();
    
    // Add query parameters
    if (params.productId) queryParams.append('productId', params.productId);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    
    const queryString = queryParams.toString();
    const url = queryString ? `review/get-all-review?${queryString}` : 'review/get-all-review';
    
    return await instance.get(url)
}

// Categories and Subcategories APIs
export const getAllCategories = async() =>{
    return await instance.get('product/get-all-catagory')
}

export const getAllSubcategories = async(categoryId) =>{
    return await instance.get(`product/get-all-sub-catagory/${categoryId}`)
}

export const getAllCategoriesAndSubcategories = async() =>{
    return await instance.get('product/get-all-catagory-subcatagory')
}