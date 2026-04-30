import CartList from "../components/cart/CartList"
import Header from "../components/layout/Header"
import Button from "../components/ui/Button"
import PageDetails from "../components/ui/PageDetails"
import style from '../styles/pages/cart.module.scss'

const Cart = () => {

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
                        <Button
                            name="Checkout"
                            className={style['checkout-button']}
                        />
                    </div>
                    <CartList
                    />
                </div>
            </section>
        </>
    )

}

export default Cart