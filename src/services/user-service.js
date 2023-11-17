import { doLogin } from "../auth"
import { myAxios, privateAxios } from "./helper"

export const loginUser = async (loginDetail) => {
    const response = await myAxios.post('/auth/login', loginDetail)
    return response.data
}

export const signupUser = async (userDetail) => {
    const response = await myAxios.post('/auth/register', userDetail)
    return response
}

export const getUser = async (userId) => {
    const response = await privateAxios.get('/api/users/' + userId)
    return response.data
}

export const uploadImage = async (image, userId) => {
    let formData = new FormData()
    formData.append("image", image)

    const response = await privateAxios.post('/api/users/image/upload/' + userId, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

export const updateUser = async (userId, user) => {
    const response = await privateAxios.put('/api/users/' + userId, user)
    doLogin(response.data, () => {
        console.log("User updated !!!")
    })
    return response.data?.user
}

export const getAllUsers = async () => {
    const response = await myAxios.get('/api/users/')
    return response.data
}

