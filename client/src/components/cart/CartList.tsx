import { Activity, useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { cartFailed, cartRequest, cartSuccess } from "../../store/cartSlice"
import { deleteCartItemApi, getCartListApi, updateCartItemApi } from "../../api/cartInstance"
import style from '../../styles/components/cart/cartList.module.scss'
import FoodCard from "../foods/FoodCard"
import Button from "../ui/Button"
import toast from "react-hot-toast"
import {
    TrashIcon as DeleteIcon
} from 'lucide-react'

const CartList = () => {

    const [pagination, setPagination] = useState<{ page: number, limit: number }>({
        page: 1,
        limit: 10
    })
    const { cartList } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()
    const [hasMore, setHasMore] = useState<boolean>(false)

    // Function for fetching cart list
    const handleFetchCartList = useCallback(async () => {

        dispatch(cartRequest())
        const result = await getCartListApi(pagination.page, pagination.limit)
        if (result.success) {
            if (result.cartItems.length < pagination.limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }
            dispatch(cartSuccess({ cartList: result.cartItems, page: pagination.page }))
        } else {
            dispatch(cartFailed({ errormessage: result.error }))
        }

    }, [pagination.page, pagination.limit])

    // Function for updating quantity
    const handleUpdateQuanity = async (id: string, type: "increment" | "decrement") => {

        const filteredCart = cartList.map((item) => {

            if (item.id !== id) return item

            const newCartItem = { ...item, quantity: type === "increment" ? item.quantity + 1 : item.quantity - 1 }
            return newCartItem
        })

        dispatch(cartSuccess({ cartList: filteredCart, page: 1 }))

        const result = await updateCartItemApi(id, type)
        if (result.success) {
            toast.success(type === "increment" ? "Cart item count is incremented" : "Cart item count is decremented")
        } else {

            const filteredCart = cartList.map((item) => {

                if (item.id !== id) return item

                const newCartItem = { ...item, quantity: type === "increment" ? item.quantity : item.quantity }
                return newCartItem
            })

            dispatch(cartSuccess({ cartList: filteredCart, page: 1 }))

            toast.success(result.error)
        }

    }

    // Function for deleting cart item
    const handleDeleteCartItem = async (id: string) => {

        const oldCartList = cartList

        const filteredCart = cartList.filter((cart) => cart.id !== id)
        dispatch(cartSuccess({ cartList: filteredCart, page: 1 }))

        const result = await deleteCartItemApi(id)
        if (result.success) {
            toast.success("Item is deleted")
        } else {
            dispatch(cartSuccess({ cartList: oldCartList }))
            toast.success("Item is couldn't delete")
        }

    }

    useEffect(() => {
        handleFetchCartList()
    }, [handleFetchCartList])

    return (
        <div className={style.container}>
            {
                cartList.length
                    ?
                    <div className={style.list}>
                        {
                            cartList.map((item) => (
                                <div key={item.id} className={style['item-container']}>
                                    <div onClick={() => handleDeleteCartItem(item.id)} className={style['delete-container']}>
                                        <DeleteIcon
                                            className={style['delete-icon']}
                                            strokeWidth={1.7}
                                        />
                                    </div>
                                    <FoodCard
                                        imageUrl={item?.food?.image_url}
                                        name={item?.food.name}
                                        price={item.quantity * item?.food?.price}
                                    />
                                    <div className={style['quantity-container']}>
                                        <Button
                                            onClick={() => handleUpdateQuanity(item.id, "decrement")}
                                            disabled={item.quantity <= 1}
                                            name="-"
                                        />
                                        <span>{item.quantity}</span>
                                        <Button
                                            name="+"
                                            disabled={item.quantity >= 10}
                                            onClick={() => handleUpdateQuanity(item.id, "increment")}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div className={style['fallback']}>
                        <h2>You don't have any cart item</h2>
                    </div>
            }
            <Activity mode={hasMore ? "visible" : "hidden"}>
                <div className={style['button-container']}>
                    <Button
                        name="Load"
                        className={style['load-button']}
                        onClick={() => setPagination(pre => {
                            return { ...pre, page: pre.page + 1 }
                        })}
                    />
                </div>
            </Activity>
        </div>
    )

}

export default CartList