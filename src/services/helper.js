import axios from "axios";
import { getToken } from "../auth";

export const BASE__URL = "http://3.17.187.237:443"

export const myAxios = axios.create({
    baseURL: BASE__URL
})

export const privateAxios = axios.create({
    baseURL: BASE__URL
})


privateAxios.interceptors.request.use(config => {
    const token = getToken()

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    console.log(config)
    return config
}, error => Promise.reject(error)
)