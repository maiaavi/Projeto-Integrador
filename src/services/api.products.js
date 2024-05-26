import api from "./api"

const mainRoute = '/products'

const productsApi = {
    async getProducts() {
        try {
            const { data } = await api.get(mainRoute)
            return data
        } catch (error) {
            console.error(error)
            return []
        }
    },
    async newProduct(data) {
        try {
            const { data: product } = await api.post(mainRoute, data)
            return product.productId
        } catch (error) {
            console.error(error)
            return { error: error }
        }
    },
    async deleteProduct(id) {
        try {
            const { data } = await api.delete(mainRoute + '/' + id)
            return data.message
        } catch (error) {
            console.error(error)
            return { error }
        }
    },
    async updateProduct(id, data) {
        try {
            const { data: returned } = await api.put(mainRoute + '/' + id, data)
            return returned.message
        } catch (error) {
            console.error(error)
            return { error }
        }
    }
}

export default productsApi
