import { privateAxios } from "./helper"

export const saveComment = async (postId, comment) => {
    const response = await privateAxios.post('/api/post/' + postId + '/comments', comment)
    return response.data
}