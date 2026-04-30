import { Activity, useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { foodFailed, foodRequest, foodSuccess } from "../../store/foodSlice"
import { getFoodDetailsApi, getFoodsApi } from "../../api/foodInstance"
import style from '../../styles/components/food/foodList.module.scss'
import FoodCard from "./FoodCard"
import Button from "../ui/Button"
import {
    X as CloseIcon
} from 'lucide-react'
import { cartFailed, cartRequest, cartSuccess } from "../../store/cartSlice"
import { addFoodToCartApi, getCartItemApi } from "../../api/cartInstance"
import toast from "react-hot-toast"

const FoodList = () => {

    const [pagination, setPagination] = useState<{ page: number, limit: number }>({
        page: 1,
        limit: 10
    })
    const dispatch = useAppDispatch()
    const { foods, loading, food } = useAppSelector(state => state.food)
    const { loading: cartLoading, cartItem } = useAppSelector(state => state.cart)
    const [hasMore, setHasMore] = useState<boolean>(false)
    const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null)

    // Function for fetching foods
    const handleGetFoods = useCallback(async () => {

        dispatch(foodRequest())

        const result = await getFoodsApi(pagination.page, pagination.limit)
        if (result.success) {

            if (result?.foods?.length < pagination.limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }

            dispatch(foodSuccess({ foods: result.foods, page: pagination.page }))

        } else {
            dispatch(foodFailed({ errorMessage: result.error }))
        }

    }, [pagination.page, pagination.limit])

    // Function for fetching food details
    const handleFetchFoodDetails = useCallback(async () => {

        if (!selectedFoodId) return

        dispatch(foodRequest())
        const result = await getFoodDetailsApi(selectedFoodId)
        if (result.success) {
            dispatch(foodSuccess({ food: result.food }))
        } else {
            dispatch(foodFailed({ errorMessage: result.error }))
        }

    }, [selectedFoodId])

    // Function for adding food to cart
    const handleAddCart = async () => {

        if (!selectedFoodId) return

        dispatch(cartRequest())
        const result = await addFoodToCartApi({ foodId: selectedFoodId })
        if (result.success) {
            toast.success("Food added to cart")
            dispatch(cartSuccess({ cartItem: result.cartItem }))
        } else {
            dispatch(cartFailed({ errorMessage: result.error }))
        }

    }

    // Function for fetching cart item
    const handleFetchCartItem = useCallback(async () => {

        if (!selectedFoodId) return

        dispatch(cartRequest())
        const result = await getCartItemApi(selectedFoodId)
        if (result.success) {
            dispatch(cartSuccess({ cartItem: result.cartItem }))
        } else {
            dispatch(cartFailed({ errorMessage: result.error }))
        }

    }, [selectedFoodId])

    useEffect(() => {
        handleGetFoods()
    }, [handleGetFoods])

    useEffect(() => {
        if (selectedFoodId) {
            handleFetchFoodDetails()
            handleFetchCartItem()
        }
    }, [handleFetchFoodDetails, handleFetchCartItem])

    return (
        <div className={style.container}>
            <div className={style.list}>
                {
                    foods?.map((food) => (
                        <FoodCard
                            key={food.id}
                            imageUrl={food.image_url}
                            name={food.name}
                            price={food.price}
                            onClick={() => setSelectedFoodId(food.id)}
                        />
                    ))
                }
            </div>
            <Activity mode={selectedFoodId && food ? "visible" : "hidden"}>
                <div className={style['food-details-container']}>
                    <div className={style['details-container']}>
                        <div onClick={() => setSelectedFoodId(null)} className={style['close-icon-container']}>
                            <CloseIcon
                                className={style['close-icon']}
                                strokeWidth={1.7}
                                size={22}
                            />
                        </div>
                        <img
                            src={food?.image_url}
                            alt={`${food?.name} image`}
                            className={style['food-image']}
                        />
                        <div className={style['details']}>
                            <h2 className={style['food-name']}>{food?.name}</h2>
                            <p className={style['food-description']}>{food?.description}</p>
                        </div>
                        <div className={style['details-button-container']}>
                            {
                                cartItem
                                    ?
                                    <Button
                                        name="Added to cart"
                                        className={style['disable-cart-button']}
                                        disabled
                                    />
                                    :
                                    <Button
                                        name="Add to Cart"
                                        className={style['cart-button']}
                                        onClick={() => handleAddCart()}
                                        disabled={cartLoading}
                                    />
                            }
                        </div>
                    </div>
                </div>
            </Activity>
            <Activity mode={hasMore ? "visible" : "hidden"}>
                <div className={style['button-container']}>
                    <div className={style['button']}>
                        <Button
                            name="Load"
                            className={style['load-button']}
                            disabled={loading}
                            onClick={() => {
                                setPagination(pre => {
                                    return { ...pre, page: pre.page + 1 }
                                })
                            }}
                        />
                    </div>
                </div>
            </Activity>
        </div>
    )

}

export default FoodList