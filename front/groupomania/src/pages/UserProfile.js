import React from 'react';
import '../styles/pages/userprofile.css';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPen, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

function UserProfile() {
    return (
        <div className='wholeprofile'>
            <h2>GROUPOMANIA</h2> 
            <h1>Profil d'utilisateure</h1>
            <div className="edit">
                <h2 className='editprofile'> 
                                    <NavLink exact to="/forum/" className="linktopage" style={{ textDecoration: 'none', color: "#000" }} >
                                    <FontAwesomeIcon icon={faUserPen} className="headerFa" /> Modifier mon profil
                                    </NavLink>
                </h2>

                <h2>
                        <NavLink exact to="/login" className="linktopage" style={{ textDecoration: 'none', color: "#FD2D01" }} >
                        Déconnexion
                        <FontAwesomeIcon icon={faArrowRightToBracket} className="headerFa"/>
                        </NavLink>
                </h2>
             </div>
        </div>
    )
}

export default UserProfile
