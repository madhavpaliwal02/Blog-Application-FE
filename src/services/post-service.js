import { privateAxios } from "./helper"

export const addPost = async (url, postDetails) => {
    const response = await privateAxios.post(url, postDetails)
    return response.data
}