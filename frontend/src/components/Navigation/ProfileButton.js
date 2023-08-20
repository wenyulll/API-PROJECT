// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
// import OpenModalMenuItem from '../OpenModalButton';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link, useHistory } from 'react-router-dom';
import './Navigation.css';


function ProfileButton({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push('/')
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden"); //如果 showMenu 为 true，元素将只有 "profile-dropdown" 类，因此默认情况下会显示。如果 showMenu 为 false，元素将同时有 "profile-dropdown" 类和 "hidden" 类，"hidden" 类可能在CSS中定义为隐藏元素（例如，display: none;）。这样就会使元素隐藏起来，直到某个操作或事件触发去除 "hidden" 类来显示下拉菜单。

    return (
        <>
            <button className='profile-button' onClick={openMenu}>
                <i className="fa-solid fa-bars"></i>
                <span> </span>
                <i className="fa-solid fa-circle-user"></i>

            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li className='dropdown' >Hello, {user.firstName}</li>
                        <li className='dropdown'>{user.email}</li>
                        <div className='manage-spots-div'>
                            <li className='dropdown'>
                                <Link className='manage-spots-link' to='/spots/current' onClick={closeMenu}>Manage Spots</Link>
                            </li>
                        </div>
                        <li className='dropdown'>
                            <button className='logout-button' onClick={logout}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <OpenModalMenuItem
                            itemText={"Log In"}
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText={"Sign Up"}
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal setShowMenu={setShowMenu} />}
                        />
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
