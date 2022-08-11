import React from 'react'
import { NavLink } from "react-router-dom";
import '../styles/pages/signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

function Login() {
    return (
        <div className='parent'>

        <div className="left">

            <div className="titles">

            <span>  <FontAwesomeIcon icon={faGlobe} /></span>

                <h1>Connexion</h1>
                <h2>Coquin va</h2>
                <h3>Connexion via email</h3>

            </div>
            
            <div className="form">

            
                <div className="form_text">
                        <h2>Email</h2>
                        <input type="text" defaultValue="Email"/>
                </div>

                <div className="form_text">
                        <h2>Mot de passe</h2>
                        <input type="text" defaultValue="Mot de passe"/>
                </div>

                
                <button>Connexion</button>
                <h4>
                Pas encore enregistré ?
                    <span>
                        <NavLink exact to="/signup" activeClassName="navActive"> Créer un compte</NavLink>
                    </span>
                </h4>
                <h5>2022@ Groupomania Tout Droits Réservés</h5>

            </div>

        </div>


        <div className="right">
            <div className="template">
                <img src={require("../media/Signup.jpeg")} alt="Groupomania-icon"  className='title_icon'/>   
            </div>            
        </div>


</div>
    )
}

export default Login
