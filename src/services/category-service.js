import { myAxios } from "./helper"

export const loadAllCategories = async () => {
    const response = await myAxios.get('/api/categories/')
    return response.data
}

export const addCategory = async (data) => {
    const response = await myAxios.post('/api/categories/', data)
    return response.data
}

export const getCategory = async (id) => {
    const response = await myAxios.get('/api/categories/' + id)
    return response.data
}

export const updateCategory = async (id, cat) => {
    const respone = await myAxios.put('/api/categories/' + id, cat)
    return respone.data
}