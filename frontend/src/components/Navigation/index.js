// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";
import classes from "./index.module.css";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import logo from '../../images/CATBNBLOGO.png'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user); //根据是否有用户信息，决定显示不同的导航内容

    return (
        <nav>
            <NavLink exact to="/">
                <img
                    className={classes.home}
                    alt=""
                    src={logo}
                ></img>
            </NavLink>
            <div className={classes["nav-right"]}>
                {sessionUser && (
                    <Link className={classes.host} to="/hosting">
                        Catbnb your home
                    </Link>
                )}
                {/* {!sessionUser && (
                    <OpenModalButton
                        className="host"
                        buttonText="Airbnb your home"
                        modalComponent={<LoginFormModal />}
                    />
                )} */}
                {isLoaded && <ProfileButton user={sessionUser} />}
            </div>
        </nav>
    );
}

export default Navigation;
