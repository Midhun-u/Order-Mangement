import { Activity, useId, useRef, useState, type SubmitEvent } from "react"
import CartList from "../components/cart/CartList"
import Header from "../components/layout/Header"
import Button from "../components/ui/Button"
import PageDetails from "../components/ui/PageDetails"
import style from '../styles/pages/cart.module.scss'
import FormInput from "../components/form/FormInput"
import {
    MapPin as LocationIcon,
    PhoneIcon
} from 'lucide-react'
import { checkoutApi } from "../api/cartInstance"
import toast from "react-hot-toast"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { cartSuccess } from "../store/cartSlice"

const Cart = () => {

    const [isCheckout, setIsCheckout] = useState<boolean>(false)
    const addressId = useId()
    const phoneId = useId()
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneNumberRef = useRef<HTMLInputElement>(null)
    const { cartList } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()

    // Function for checkoung cart
    const handleCheckout = async (event: SubmitEvent) => {
        event.preventDefault()

        if (!addressRef.current.value || !phoneNumberRef.current.value) return

        const result = await checkoutApi({
            address: addressRef.current.value,
            phoneNumber: phoneNumberRef.current.value
        })

        if (result.success) {
            toast.success("Checkouted")
            dispatch(cartSuccess({cartList: [], page: 1}))
            setIsCheckout(false)
        } else {
            toast.error(result.error)
        }

    }

    return (
        <>
            <Header
            />
            <section className={style.container}>
                <div className={style.page}>
                    <div className={style['top-bar']}>
                        <PageDetails
                            title="Cart"
                        />
                        {
                            cartList.length
                                ?
                                <Button
                                    name="Checkout"
                                    className={style['checkout-button']}
                                    onClick={() => setIsCheckout(true)}
                                />
                                :
                                null
                        }
                    </div>
                    <CartList
                    />
                    <Activity mode={isCheckout ? "visible" : "hidden"}>
                        <div className={style['checkout-form-container']}>
                            <form
                                className={style['checkout-form']}
                                onSubmit={handleCheckout}
                            >
                                <FormInput
                                    Icon={LocationIcon}
                                    id={addressId}
                                    labelText="Address"
                                    type="text"
                                    placeholder="Enter address"
                                    ref={addressRef}
                                    minLength={5}
                                    maxLength={350}
                                />
                                <FormInput
                                    Icon={PhoneIcon}
                                    id={phoneId}
                                    labelText="Phone Number"
                                    placeholder="Enter phone number"
                                    type="number"
                                    ref={phoneNumberRef}
                                    minLength={10}
                                    maxLength={10}
                                />
                                <div className={style['button-container']}>
                                    <Button
                                        name="Checkout"
                                        type="submit"
                                        className={style['submit-button']}
                                    />
                                    <Button
                                        name="Close"
                                        type="button"
                                        onClick={() => setIsCheckout(false)}
                                        className={style['close-button']}
                                    />
                                </div>
                            </form>
                        </div>
                    </Activity>
                </div>
            </section>
        </>
    )

}

export default Cart