import { myAxios, privateAxios } from "./helper"

export const addPost = async (url, postDetails) => {
    const response = await privateAxios.post(url, postDetails)
    return response.data
}

export const loadAllPostsService = async (pageNumber, pageSize) => {
    const response = await myAxios.get(`/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    return response.data
}