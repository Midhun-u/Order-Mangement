export type Cart = {
    id: string,
    food_id: string,
    quantity: number,
    user_id: string,
    user: {
        id: string,
        email: string,
        fullname: string
    },
    food: {
        id: string,
        name: string,
        image_url: string,
        price: number,
    }
}