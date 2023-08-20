import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            const res = await dispatch(
                sessionActions.signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                })
            )
            console.log(res);
            if (res.status === 500) {
                setErrors({ unqiueUsername: "Username must be unique." });
                return;
            }
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
                return;
            }
            closeModal()
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };

    const disableButton = (
        email.length < 1 || username.length < 4 || firstName.length < 1 || lastName.length < 1 || password.length < 6 || confirmPassword.length < 1
    )
    return (
        <div className='signup-modal'>
            <h1>Sign Up</h1>
            {errors.unqiueUsername && <p className='signup-errors'>{errors.unqiueUsername}</p>}
            <form className='signup-form' onSubmit={handleSubmit}>

                <label>
                    First Name
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                {errors.firstName && <p className='signup-errors'>{errors.firstName}</p>}

                <label>
                    Last Name
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                {errors.lastName && <p className='signup-errors'>{errors.lastName}</p>}

                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p className='signup-errors'>{errors.email}</p>}

                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {errors.username && <p className='signup-errors'>{errors.username}</p>}

                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && <p className='signup-errors'>{errors.password}</p>}
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.confirmPassword && (
                    <p className='signup-errors'>{errors.confirmPassword}</p>
                )}
                <button disabled={disableButton} className={disableButton ? 'disabled signup-button' : 'enabled signup-button'} type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormModal;
