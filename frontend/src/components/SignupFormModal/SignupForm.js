import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm({ setShowSignupModal }) {
    const dispatch = useDispatch();
    // const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {

            setErrors([]);
            let isError = false;
            dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                    isError = true;
                }).then(() => {
                    // console.log("data...." + data.statusCode);
                    if (!isError) {
                        //    console.log("setShowsignupModal false$$$$$$$$$$$$$")
                        setShowSignupModal(false)
                    }
                    ;
                })

        }

        return setErrors(['Confirm Password field must be the same as the Password field']);
    };
    // if (sessionUser) return <Redirect to="/" />;
    return (
        <>
            <div className="signup-form-div">

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="signup-header">
                        Sign Up
                    </div>
                    <div className="error-div">
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    </div>

                    <div className="sign-up-form">
                        <div className="input-email">
                            <label>
                                <div className="input-m" >
                                    Email
                                </div>
                                <input
                                    placeholder="validate Email (@)"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                        </div>

                        <div className="input-username2">
                            <label>
                                <div className="input-m" >
                                    Username
                                </div>
                                <input
                                    placeholder="length more than 4"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div className="input-firstName">
                            <label>
                                <div className="input-m" >
                                    First Name
                                </div>
                                <input
                                    placeholder="First Name"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setfirstName(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div className="input-lastName">
                            <label>
                                <div className="input-m" >
                                    Last Name
                                </div>
                                <input
                                    placeholder="Last Name"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setlastName(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div className="input-password">
                            <label>
                                <div className="input-m" >
                                    Password
                                </div>
                                <input
                                    placeholder="length more than 6"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div className="confirm-password">
                            <label>
                                <div className="input-m" >
                                    Confirm Password
                                </div>
                                <input
                                    placeholder="length more than 6"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                    </div>
                    <div className="sign-up-button">
                        <button type="submit" className="sign-up">Sign Up</button>

                    </div>
                </form>

            </div>
        </>
    );
}

export default SignupForm;
