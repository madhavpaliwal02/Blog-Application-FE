import { myAxios, privateAxios } from "./helper"

export const addPost = async (url, postDetails) => {
    const response = await privateAxios.post(url, postDetails)
    return response.data
}

export const loadAllPostsService = async (pageNumber, pageSize) => {
    const response = await myAxios.get(`/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`)
    return response.data
}

export const getPostByPostId = async (postId) => {
    const response = await privateAxios.get(`/api/posts/${postId}`)
    return response.data
}