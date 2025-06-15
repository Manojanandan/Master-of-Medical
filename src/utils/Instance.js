import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://luxcycs.com:5500/',
    'Authorization': sessionStorage.getItem("jwt") ?? ""
})
export default instance