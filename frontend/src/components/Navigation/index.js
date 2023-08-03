// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";
import logo from '../../images/CATBNBLOGO.png'
import './Navigation.css'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user); //根据是否有用户信息，决定显示不同的导航内容

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <Link to='/spots/new' className='header-create-new-spot links'>Create a New Spot</Link>
        );
    }
    return (
        <div className='navigation-header'>
            <NavLink className='Home-icon' exact to="/">
                <div className='nagivation-logo-title'>
                    <img alt='logo' className='logo' src={logo} />
                    <div>
                        <span className='header-title links'>catbnb</span>
                    </div>
                </div>
            </NavLink>
            <div className='sessionLinks'>
                {isLoaded && sessionLinks}
                {isLoaded && (
                    <div>
                        <ProfileButton user={sessionUser} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navigation;
