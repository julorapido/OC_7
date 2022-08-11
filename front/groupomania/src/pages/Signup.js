import React from 'react'
import { NavLink } from "react-router-dom";
import '../styles/pages/signup.css';
function Signup() {
    return (
        <div>
        <h1>Bienvenue à Groupomania !</h1>
        <h1>Inscription</h1>
        <h2>renseigne tes infos fdp</h2>
        <NavLink exact to="/login" activeClassName="navActive">Déjà un compte ?</NavLink>
    </div>
    )
}

export default Signup
