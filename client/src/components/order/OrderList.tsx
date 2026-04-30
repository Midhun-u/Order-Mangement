import { Activity, useCallback, useEffect, useState } from "react"
import style from '../../styles/components/order/orderList.module.scss'
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { orderFailed, orderRequest, orderSuccess } from "../../store/orderSlice"
import { getOrdersApi } from "../../api/orderInstance"
import OrderCard from "./OrderCard"
import Button from "../ui/Button"

const OrderList = () => {

    const [pagination, setPagination] = useState<{ page: number, limit: number }>({
        page: 1,
        limit: 10
    })
    const [hasMore, setHasMore] = useState<boolean>(false)
    const { orders } = useAppSelector(state => state.order)
    const dispatch = useAppDispatch()

    // Function for fetching orders
    const handleFetchOrders = useCallback(async () => {

        dispatch(orderRequest())
        const result = await getOrdersApi(pagination.page, pagination.limit)
        if (result.success) {
            if (result.orders?.length < pagination.limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }
            dispatch(orderSuccess({ orders: result.orders, page: pagination.page }))
        } else {
            dispatch(orderFailed({ errorMessage: result.error }))
        }

    }, [pagination.page, pagination.limit])

    useEffect(() => {
        handleFetchOrders()
    }, [handleFetchOrders])

    return (
        <div className={style.container}>
            <div className={style['list']}>
                {
                    orders.map((order) => (
                        <OrderCard
                            key={order.id}
                            image={order?.food?.image_url}
                            name={order?.food.name}
                            location={order.address}
                            price={order.price}
                            quantity={order.quantity}
                            phoneNumber={order.phone_number}
                            status={order.status}
                        />
                    ))
                }
            </div>
            <Activity mode={hasMore ? "visible" : "hidden"}>
                <div className={style['button-container']}>
                    <Button
                        name="Load"
                        className={style['load-button']}
                        onClick={() => setPagination(pre => {
                            return {...pre, page: pre.page + 1}
                        })}
                    />
                </div>
            </Activity>
        </div>
    )

}

export default OrderList