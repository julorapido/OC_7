import React from 'react'
import { NavLink } from "react-router-dom";
function Login() {
    return (
        <div>
            <h1>LOGIN</h1>
            <h2>CONEXXIO :</h2>
            <h3>
                PAS DE COMPTE ?
                <NavLink exact to="/signup" activeClassName="navActive">S'inscrire ?</NavLink>
            </h3>
        </div>
    )
}

export default Login
