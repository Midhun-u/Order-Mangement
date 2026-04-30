import style from '../../styles/components/food/foodCard.module.scss'

interface FoodCardProps{
    imageUrl: string
    name: string
    price: number
    onClick?: () => void
}

const FoodCard = ({imageUrl, name, price, onClick}: FoodCardProps) => {

    return (
        <div onClick={onClick} className={style.container}>
            <img
                src={imageUrl}
                alt={`${name} image`}
                className={style.image}
                title={name}
            />
            <div className={style['details-container']}>
                <h2 className={style['name']}>{name}</h2>
                <p className={style.price}>₹{price}</p>
            </div>
        </div>
    )

}

export default FoodCard