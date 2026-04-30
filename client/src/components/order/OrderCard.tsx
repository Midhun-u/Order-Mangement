import style from '../../styles/components/order/orderCard.module.scss'
import {
    MapPin as LocationIcon,
    BanknoteArrowUpIcon as PriceIcon,
    PhoneIcon
} from 'lucide-react'

interface OrderCardProps {
    image: string
    name: string
    location: string
    price: number
    quantity: number
    phoneNumber: string
    status: "ORDER_RECEIVED" | "SHIPPED" | "OUT_FOR_DELIVERY"
}

const OrderCard = ({ image, name, location, price, quantity, phoneNumber, status }: OrderCardProps) => {

    return (
        <div className={style.container}>
            <img
                src={image}
                alt={`${name} image`}
                className={style['image']}
            />
            <div className={style['details-container']}>
                <h2 className={style['food-name']}>{name}</h2>
                <div className={style['details']}>
                    <LocationIcon
                        size={20}
                        className={style['icon']}
                        strokeWidth={1.7}
                    />
                    <p>{location}</p>
                </div>
                <div className={style['details']}>
                    <PriceIcon
                        size={20}
                        className={style['icon']}
                        strokeWidth={1.7}
                    />
                    <p>₹{price}</p>
                </div>
                <div className={style['details']}>
                    <PhoneIcon
                        size={20}
                        className={style['icon']}
                        strokeWidth={1.7}
                    />
                    <p>{phoneNumber}</p>
                </div>
                <div className={style['details']}>
                    <p>Total: </p>
                    <p>{quantity}</p>
                </div>
                <p className={style['status']}>
                    {
                        status === "ORDER_RECEIVED"
                            ?
                            <>Order received</>
                            :
                            (
                                status === "SHIPPED"
                                ?
                                <>Shipped</>
                                :
                                <>Out for delivery</>
                            )
                    }
                </p>
            </div>
        </div>
    )

}

export default OrderCard