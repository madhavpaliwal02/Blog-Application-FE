import { myAxios } from "./helper"

export const loadAllCategories = async () => {
    const response = await myAxios.get('/api/categories/')
    return response.data
}
