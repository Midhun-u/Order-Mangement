import { useId, type InputHTMLAttributes, type Ref } from "react"
import FormInput from "./FormInput"

import style from '../../styles/components/form/passwordInput.module.scss'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement>{
    passwordRef: Ref<HTMLInputElement>
}

const PasswordInput = ({passwordRef}: PasswordInputProps) => {

    

    return (
        <div className={style.container}>
            <FormInput
                id={passwordId}
                labelText="Password"
                type='password'
                placeholder='Enter your password'
                Icon={PasswordIcon}
                ref={passwordRef}
                required
                maxLength={50}
                minLength={6}
                aria-invalid
            />
        </div>
    )

}

export default PasswordInput