import type { ButtonHTMLAttributes } from "react"
import style from '../../styles/components/ui/button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    name: string
    isPrimaryButton?: boolean
}

const Button = ({name, isPrimaryButton, ...props}: ButtonProps) => {

    return (
        <button
            {...props}
            className={isPrimaryButton? style['primary-button']: style['button']}
        >
            <span>{name}</span>
        </button>
    )

}

export default Button