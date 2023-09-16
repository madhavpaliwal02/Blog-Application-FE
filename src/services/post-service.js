import { myAxios, privateAxios } from "./helper"

export const addPost = async (postId, catId, postDetails) => {
    const response = await privateAxios.post(`/api/user/${postId}/category/${catId}/posts`, postDetails)
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

export const loadPostsByCategory = async (catId, pageNumber, pageSize) => {
    const response = await privateAxios.get(`/api/category/${catId}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`)
    return response.data
}

export const loadPostsByUser = async (userId) => {
    const response = await privateAxios.get(`/api/user/${userId}/posts`)
    return response.data
}


export const updatePostById = async (post) => {
    const response = await privateAxios.put(`/api/posts/${post.postId}`, post)
    return response.data
}

export const deletePostById = async (postId) => {
    const response = await privateAxios.delete(`/api/posts/${postId}`)
    return response.data
}