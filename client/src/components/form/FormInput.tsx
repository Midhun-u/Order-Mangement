import type { InputHTMLAttributes } from 'react'
import style from '../../styles/components/form/formInput.module.scss'
import Input from '../ui/Input'
import type { LucideReactType } from '../../types/lucideReactType'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string
    labelText: string
    type: "text" | "email" | "password"
    Icon: LucideReactType
}

const FormInput = ({ id, type, labelText, Icon,  ...props }: FormInputProps) => {

    return (
        <div className={style.container}>
            <label className={style.label} htmlFor={id}>{labelText}</label>
            <div className={style['input-container']}>
                <Icon
                    size={22}
                    strokeWidth={1.5}
                    className={style.icon}
                />
                <Input
                    type={type}
                    {...props}
                />
            </div>
        </div>
    )

}

export default FormInput