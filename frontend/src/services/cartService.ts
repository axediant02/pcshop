import axiosURL from "@/lib/axioInstance";

export interface CartItems{
    product_id: number;
    quantity: number;
}

export const cartService = {
    async getCart() {
        const response = await axiosURL.get('/carts');
        return response.data;
    },

    async addToCart(item: CartItems) {
        const response = await axiosURL.post('/carts', item);
        return response.data;
    },

    async updateCartItem(itemId: number, quantity: number) {
        const response = await axiosURL.put(`/carts/items/${itemId}`, { quantity });
        return response.data;
    },

    async deleteCartItem(itemId: number) {
        const response = await axiosURL.delete(`/carts/items/${itemId}`);
        return response.data;
    }
}

//test