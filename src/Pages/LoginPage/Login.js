import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import "./Login.css";
import { Link } from "react-router-dom";
import Axios from "../../Services/AuthService/Axios";

export const Login = () => {
    const defaultValues = {
        email: "",
        password: "",
        rememberMe: false
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ defaultValues });

    const HandleLogin = (e) => {
        try {
            Axios.post(
                "/api/v1/user/login",
                JSON.stringify(e),
                {
                    headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
                    withCredentials: true,
                }
            )
                .then((response) => {
                    localStorage.setItem("access-token", JSON.stringify(response?.data));
                    console.log(JSON.stringify(response?.data));
                    console.log(JSON.stringify(response));
                    console.log("Giriş Başarılı", response);

                    window.location.href = "/https://assignment-api.piton.com.tr/api/v1/product/all";
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (err) { }
    };
    const getFormErrorMessage = (Name) => {
        return (
            errors[Name] && <small className="p-error">{errors[Name].message}</small>
        );
    };
    return (
        <div className="form-demo">
            <div className="flex justify-content-center">
                <div className="card">
                    <form onSubmit={handleSubmit(HandleLogin)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: "Email required.",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Geçersiz Email. E.g. örnek@email.com",
                                        },
                                    }}
                                    render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            className={classNames({
                                                "p-invalid": fieldState.invalid,
                                            })}
                                        />
                                    )}
                                />
                                <label
                                    htmlFor="email"
                                    className={classNames({ "p-error": !!errors.email })}
                                >
                                    Email*
                                </label>
                            </span>
                            {getFormErrorMessage("email")}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{ required: "Password required." }}
                                    render={({ field, fieldState }) => (
                                        <Password
                                            id={field.name}
                                            {...field}
                                            feedback={false}
                                            className={classNames({
                                                "p-invalid": fieldState.invalid,
                                            })}
                                        />
                                    )}
                                />
                                <label
                                    htmlFor="password"
                                    className={classNames({ "p-error": errors.password })}
                                >
                                    Password*
                                </label>
                            </span>
                            {getFormErrorMessage("password")}

                        </div>
                        <input type="checkbox" value="lsRememberMe" id="rememberMe" ></input>
                        <label for="rememberMe">RememberMe</label>

                        <Button type="submit" label="Login" className="mt-2" onclick="lsRememberMe()" />
                        Dont have an account?
                        <br />
                    </form>
                    <p>
                        <span>
                            <Link to="/https://assignment-api.piton.com.tr/api/v1/user/register">SignUp</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Login;