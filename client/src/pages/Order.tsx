import Header from "../components/layout/Header"
import OrderList from "../components/order/OrderList"
import PageDetails from "../components/ui/PageDetails"
import style from '../styles/pages/order.module.scss'

const Order = () => {

    return (
        <>
            <Header
            />
            <section className={style.container}>
                <div className={style.page}>
                    <PageDetails
                        title="Orders"
                    />
                    <OrderList
                    />
                </div>
            </section>
        </>
    )

}

export default Order