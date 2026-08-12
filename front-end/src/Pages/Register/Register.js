import React, { useContext } from 'react'
import './Register.css'
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import Input from '../../Components/Form/Input';
import Button from '../../Components/Form/Button';
import { emailValidator, maxValidator, minValidator, requiredValidator } from '../../validators/rules'
import { useForm } from "../../Components/hooks/useForm"
import AuthContext from '../../context/authContext';
import swal from 'sweetalert';


export default function Register() {

    const authContext = useContext(AuthContext)


    const [formState, onInputHandler] = useForm({
        name: {
            value: '',
            isValue: false
        },
        username: {
            value: '',
            isValue: false
        },
        email: {
            value: '',
            isValue: false
        },
        phone: {
            value: '',
            isValue: false
        },
        password: {
            value: '',
            isValue: false
        }
    }, false)

    console.log(formState);


    const registerNewUser = (event) => {
        event.preventDefault()


        const newUserInfos = {
            name: formState.inputs.name.value,
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            phone: formState.inputs.phone.value,
            password: formState.inputs.password.value,
            confirmPassword: formState.inputs.password.value,
        }

        fetch(`http://localhost:4000/v1/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserInfos)
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                if (res.status === 403) {
                    swal({
                        title: 'این شماره مسدود شده است',
                        icon: 'error',
                        buttons: "ای بابا"
                    })
                }
            }
        }).then((result) => {
            console.log('result is:', result);
            authContext.login(result.user, result.accessToken)
        })


    }

    return (
        <>
            <Topbar />
            <Navbar />

            <section className="login-register">
                <div className="login register-form">
                    <span className="login__title">ساخت حساب کاربری</span>
                    <span className="login__subtitle">خوشحالیم قراره به جمع ما بپیوندی</span>
                    <div className="login__new-member">
                        <span className="login__new-member-text">قبلا ثبت‌نام کرده‌اید؟ </span>
                        <Link className="login__new-member-link" to="/login">
                            وارد شوید
                        </Link>
                    </div>
                    <form action="#" className="login-form">
                        <div className="login-form__username">
                            <Input
                                className="login-form__username-input"
                                type="text"
                                placeholder="نام و نام خانوادگی"
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(6),
                                    maxValidator(20)
                                ]}
                                id="name"
                                onInputHandler={onInputHandler}
                            />
                            <i className="login-form__username-icon fa fa-user"></i>
                        </div>
                        <div className="login-form__username">
                            <Input
                                className="login-form__username-input"
                                type="text"
                                placeholder="نام کاربری"
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20)
                                ]}
                                id="username"
                                onInputHandler={onInputHandler}
                            />
                            <i className="login-form__username-icon fa fa-user"></i>
                        </div>
                        <div className="login-form__username">
                            <Input
                                className="login-form__username-input"
                                type="text"
                                placeholder="شماره تماس"
                                element="input"
                                validations={[
                                    minValidator(10),
                                    maxValidator(12)
                                ]}
                                id="phone"
                                onInputHandler={onInputHandler}
                            />
                            <i className="login-form__username-icon fa fa-user"></i>
                        </div>
                        <div className="login-form__password">
                            <Input
                                className="login-form__password-input"
                                type="email"
                                placeholder="آدرس ایمیل"
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(18),
                                    emailValidator()
                                ]}
                                id="email"
                                onInputHandler={onInputHandler}
                            />
                            <i className="login-form__password-icon fa fa-envelope"></i>
                        </div>
                        <div className="login-form__password">
                            <Input
                                className="login-form__password-input"
                                type="passsword"
                                placeholder="رمز عبور"
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(18)
                                ]}
                                id="password"
                                onInputHandler={onInputHandler}
                            />
                            <i className="login-form__password-icon fa fa-lock-open"></i>
                        </div>
                        <Button className={`login-form__btn ${formState.isFormValid ? 'login-form__btn-success' : 'login-form__btn-error'}`} type="submit" onClick={registerNewUser} disabled={false}>
                            <i className="login-form__btn-icon fa fa-user-plus"></i>
                            <span className="login-form__btn-text">عضویت</span>
                        </Button>
                    </form>
                    <div className="login__des">
                        <span className="login__des-title">سلام کاربر محترم:</span>
                        <ul className="login__des-list">
                            <li className="login__des-item">
                                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                                استفاده کنید.
                            </li>
                            <li className="login__des-item">
                                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
                            </li>
                            <li className="login__des-item">
                                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
