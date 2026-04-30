export type Order = {
    id: string
    user_id: string
    food_id: string
    price: number
    food: {
        name: string
        image_url: string
    },
    quantity: number
    address: string
    phone_number: string
    status: "ORDER_RECEIVED" | "SHIPPED" | "OUT_FOR_DELIVERY"
}