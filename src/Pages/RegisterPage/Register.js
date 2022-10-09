import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import "./Register.css";
import { Link } from "react-router-dom";
import Axios from "../../Services/AuthService/Axios";
import { InputMask } from "primereact/inputmask";

export const Register = () => {
    const [val4, setVal4] = useState();
    const [showMessage, setShowMessage] = useState(false);
    const defaultValues = {
        name: "",
        email: "",
        password: "",
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ defaultValues });

    const HandleSignUp = (e) => {
        try {
            Axios.post(
                "https://assignment-api.piton.com.tr/api/v1/user/register",
                JSON.stringify(e),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    withCredentials: true,
                }
            )
                .then((response) => {
                    localStorage.setItem("user", JSON.stringify(response?.data));
                    console.log(JSON.stringify(response?.data));
                    console.log(JSON.stringify(response));
                    console.log("Registeration Successfull", response);

                    window.location.href = "Giris";
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (err) { }
    };
    const getFormErrorMessage = (firstName) => {
        return (
            errors[firstName] && (
                <small className="p-error">{errors[firstName].message}</small>
            )
        );
    };

    const dialogFooter = (
        <div className="flex justify-content-center">
            <Button
                label="OK"
                className="p-button-text"
                autoFocus
                onClick={() => setShowMessage(false)}
            />
        </div>
    );
    const passwordHeader = <h6>Please set your password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
                <li>Password must be 6-20 characters long and must be alphanumeric</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="form-demo">
            <Dialog
                visible={showMessage}
                onHide={() => setShowMessage(false)}
                position="top"
                footer={dialogFooter}
                showHeader={false}
                breakpoints={{ "960px": "80vw" }}
                style={{ width: "30vw" }}
            >
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i
                        className="pi pi-check-circle"
                        style={{ fontSize: "5rem", color: "var(--green-500)" }}
                    ></i>
                    <h5>Registeration Successfull!</h5>
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <form onSubmit={handleSubmit(HandleSignUp)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{ required: "First and last name are required." }}
                                    render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            autoFocus
                                            className={classNames({
                                                "p-invalid": fieldState.invalid,
                                            })}
                                        />
                                    )}
                                />
                                <label
                                    htmlFor="name"
                                    className={classNames({ "p-error": errors.name })}
                                >
                                    name*
                                </label>
                            </span>
                            {getFormErrorMessage("name")}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputMask
                                    mask="(999) 999-9999"
                                    value={val4}
                                    placeholder="(999) 999-9999"
                                    onChange={(e) => setVal4(e.value)}
                                    name="Mobile"
                                    control={control}
                                    rules={{ required: "Mobile is required." }}

                                />

                                <label
                                    htmlFor="name"
                                    className={classNames({ "p-error": errors.Mobile })}
                                >
                                    Mobile*
                                </label>
                            </span>
                            {getFormErrorMessage("Mobile")}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: "Email is required.",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "invalid email. E.g. example@email.com",
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
                                    rules={{ required: "Password is required." }}
                                    render={({ field, fieldState }) => (
                                        <Password
                                            id={field.name}
                                            {...field}
                                            toggleMask
                                            className={classNames({
                                                "p-invalid": fieldState.invalid,
                                            })}
                                            header={passwordHeader}
                                            footer={passwordFooter}
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
                        <Button
                            onClick={HandleSignUp}
                            type="submit"
                            label="SignUp"
                            className="mt-2"
                        />
                        Already have an account?
                        <br />
                    </form>
                    <p>
                        <span>
                            <Link to="/https://assignment-api.piton.com.tr/api/v1/user/login">
                                Login
                            </Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Register;
