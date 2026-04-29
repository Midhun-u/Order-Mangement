import FormInput from './FormInput'
import style from '../../styles/components/form/authForm.module.scss'
import {
    UserIcon,
    MailIcon as EmailIcon,
    LockIcon as PasswordIcon
} from 'lucide-react'
import { useId } from 'react'
import Button from '../ui/Button'

interface AuthFormProps {
    formType: "sign" | "login"
}

const AuthForm = ({ formType }: AuthFormProps) => {

    const fullnameId = useId()
    const emailId = useId()
    const passwordId = useId()

    return (
        <section className={style.container}>
            <form className={style.form}>
                <h1 className={style['form-title']}>
                    {
                        formType === "sign"
                        ?
                        <>Sign In</>
                        :
                        <>Login In</>
                    }
                </h1>
                <div className={style['form-input-container']}>
                    {
                        formType === "sign"
                        ?
                        <FormInput
                            id={fullnameId}
                            labelText="Fullname"
                            type='text'
                            placeholder='Enter your fullname'
                            Icon={UserIcon}
                        />
                        :
                        null
                    }
                    <FormInput
                        id={emailId}
                        labelText="Email"
                        type='email'
                        placeholder='Enter your email address'
                        Icon={EmailIcon}
                    />
                    <FormInput
                        id={passwordId}
                        labelText="Password"
                        type='password'
                        placeholder='Enter your password'
                        Icon={PasswordIcon}
                    />
                </div>
                <Button
                    name={formType === "sign"? "Sign In": "Login In"}
                />
            </form>
        </section>
    )

}

export default AuthForm