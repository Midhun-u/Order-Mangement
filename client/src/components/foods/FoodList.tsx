import { Activity, useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { foodFailed, foodRequest, foodSuccess } from "../../store/foodSlice"
import { getFoodsApi } from "../../api/foodInstance"
import style from '../../styles/components/food/foodList.module.scss'
import FoodCard from "./FoodCard"
import Button from "../ui/Button"

const FoodList = () => {

    const [pagination, setPagination] = useState<{ page: number, limit: number }>({
        page: 1,
        limit: 10
    })
    const dispatch = useAppDispatch()
    const { foods, loading } = useAppSelector(state => state.food)
    const [hasMore, setHasMore] = useState<boolean>(false)

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

    useEffect(() => {
        handleGetFoods()
    }, [handleGetFoods])

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
                        />
                    ))
                }
            </div>
            <Activity mode={hasMore? "visible": "hidden"}>
                <div className={style['button-container']}>
                    <div className={style['button']}>
                        <Button
                            name="Load"
                            isPrimaryButton
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