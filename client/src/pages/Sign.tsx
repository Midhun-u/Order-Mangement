import { useId } from 'react'
import FormInput from '../components/form/FormInput'
import style from '../styles/pages/sign.module.scss'
import {
    UserIcon,
    MailIcon as EmailIcon,
    LockIcon as PasswordIcon
} from 'lucide-react'
import Button from '../components/ui/Button'

const Sign = () => {

    const fullnameId = useId()
    const emailId = useId()
    const passwordId = useId()

    return (
        <section className={style.container}>
            <form className={style.form}>
                <h1 className={style['form-title']}>Sign In</h1>
                <div className={style['form-input-container']}>
                    <FormInput
                        id={fullnameId}
                        labelText="Fullname"
                        type='text'
                        placeholder='Enter your fullname'
                        Icon={UserIcon}
                    />
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
                    name='Sign In'
                />
            </form>
        </section>
    )

}

export default Sign