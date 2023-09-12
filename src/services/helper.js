import axios from "axios";
import { getToken } from "../auth";

const BASE__URL = "http://localhost:9191"

export const myAxios = axios.create({
    baseURL: BASE__URL
})

export const privateAxios = axios.create({
    baseURL: BASE__URL
})


privateAxios.interceptors.request.use(config => {
    const token = getToken()
    console.log("Token ", token)

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
        console.log("Config: ", config)
    }
    return config
}, error => Promise.reject(error)
)