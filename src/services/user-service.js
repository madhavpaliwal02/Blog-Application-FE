import { myAxios } from "./helper"

export const loginUser = async (loginDetail) => {
    const response = await myAxios.post('/auth/login', loginDetail)
    return response.data
}

export const signupUser = async (userDetail) => {
    const response = await myAxios.post('/api/users/', userDetail)
    return response
}