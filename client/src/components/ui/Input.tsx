import type { InputHTMLAttributes, Ref } from 'react'
import style from '../../styles/components/ui/input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    type: "email" | "text" | "password" | "number"
    ref?: Ref<HTMLInputElement>
}

const Input = (props: InputProps) => {

    return (
        <input className={style.input}
            type="text"
            ref={props.ref}
            {...props}
        />
    )

}

export default Input