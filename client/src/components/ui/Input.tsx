import type { InputHTMLAttributes } from 'react'
import style from '../../styles/components/ui/input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    type: "email" | "text" | "password"
}

const Input = (props: InputProps) => {

    return (
        <input className={style.input}
            type="text"
            {...props}
        />
    )

}

export default Input