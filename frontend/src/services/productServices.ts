import axiosURL from "@/lib/axioInstance";

export async function getProducts() {
    const response = await axiosURL.get('/products', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.data) throw new Error("Failed to fetch products.");
    return response.data;
}