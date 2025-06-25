import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://luxcycs.com:5500/',
    withCredentials: true
});

// Add request interceptor to dynamically set authorization header
instance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("jwt");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle authentication errors
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Token is invalid or expired
            sessionStorage.removeItem("jwt");
            window.location.href = "/loginform";
        }
        return Promise.reject(error);
    }
);

export default instance