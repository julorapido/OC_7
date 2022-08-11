import React from 'react'
import { NavLink } from "react-router-dom";
import '../styles/pages/signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'

function Signup() {
    return (
    <div className='parent'>

            <div className="left">

                <div className="titles">
                    <h1 className='insc_title'>Inscription   <FontAwesomeIcon icon={faUserTie}/></h1>
                    <h2>Bienvenue sur le site de Groupomania !</h2>
                    <h3>Inscription avec Email</h3>

                </div>
                
                <div className="form">

                    <div className="form_text">
                        <h2>Nom
                        <span>*</span>
                        </h2>
                        <input type="text" defaultValue="Nom"/>
                    </div>

                    <div className="form_text">
                        <h2>Prénom
                        <span>*</span>
                        </h2>
                        <input type="text" defaultValue="Prénom"/>
                    </div>

                    <div className="form_text">
                        <h2>
                            Email
                            <span>*</span>
                        </h2>
                        <input type="text"defaultValue="Adresse Mail"/>
                    </div>

                    <div className="form_text">
                        <h2>Mot de passe
                        <span>*</span>
                        </h2>
                        <input type="text" defaultValue="Mot de passe"/>
                    </div>

                    <button>Inscription</button>
                    <h4>
                       Déjà un compte ?            
                        <NavLink exact to="/login" activeClassName="navActive"> Connecte-toi</NavLink>
                    </h4>
                </div>
                <h5>2022@ Groupomania Tout Droits Réservés</h5>

            </div>


        <div className="right">
            <div className="template">
                <img src={require("../media/Signup.jpeg")} alt="Groupomania-icon"  className='title_icon'/>   
            </div>            
        </div>
   
    
    </div>
    )
}

export default Signup
