import React from 'react'
import '../styles/pages/pagenotfound.scss';
import { NavLink } from "react-router-dom";

function componentName() {
    return (
        <div className='pagenotfound'>
            <div className="container">
                <h1>404 </h1>
                    <h2>Oops, Cette page est introuvable !</h2>
                    <h3>Le lien pourrait être corrumpu.</h3>
                    <h4>ou la page a pu être supprimée</h4>
                    <NavLink exact to="/" style={{ textDecoration: 'none', color: "white" }}> <button>Retourner à l'accueil</button></NavLink>
            </div>

        </div>
    )
}

export default componentName
