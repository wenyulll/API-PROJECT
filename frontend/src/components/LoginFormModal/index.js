// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Link } from 'react-router-dom'
import "./LoginForm.css";
// import classes from "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    const demoLoginHandler = async (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
            .then(closeModal);

    };
    return (
        <>
            <div className='login-modal'>
                <h1>Log In</h1>
                {errors.credential && (
                    <p className='errors'>{errors.credential}</p>
                )}
                <form onSubmit={handleSubmit}>
                    <label>
                        Username or Email
                        <input
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    <button disabled={credential.length < 4 || password.length < 6} className={(credential.length < 4 || password.length < 6) ? 'disabled login-button' : 'enabled login-button'} type="submit">Log In</button>

                    <Link className='demo-user'>
                        <a className='demo-user' onClick={demoLoginHandler}>Demo User</a>
                    </Link>
                </form>
            </div>
        </>
    );
}

export default LoginFormModal;