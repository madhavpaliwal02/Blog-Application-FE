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

export const postImageService = async (image, postId) => {
    let formData = new FormData()
    formData.append("image", image)

    const response = await privateAxios.post('/api/post/image/upload/' + postId, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}