import FoodList from "../components/foods/FoodList"
import Header from "../components/layout/Header"
import PageDetails from "../components/ui/PageDetails"
import style from '../styles/pages/home.module.scss'

const Home = () => {

    return (
        <>
            <Header
            />
            <section className={style.container}>
                <div className={style.page}>
                    <PageDetails
                        title="Foods"
                    />
                    <FoodList
                    />
                </div>
            </section>
        </>
    )

}

export default Home