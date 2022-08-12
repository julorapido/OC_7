import React from 'react'
import '../styles/pages/home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";

function Home() {
    return (
        <div className='home_div'>
            
            <div className="image">
                  <img src={require("../media/template3.png")} alt="Groupomania-template"  className='home_template'/>   
            </div>

            <div className="content">
                <img src={require("../media/blackIcon.png")} alt="Groupomania-template"  className='groupomania_logo'/>   
                <h1>Bienvenue sur le site de Groupomania !</h1>
                <h2>Échangez avec vos </h2>
                <NavLink exact to="/login" style={{ textDecoration: 'none', color: "white" }}  > <button>Se Connecter <FontAwesomeIcon icon={faGlobe} /> </button></NavLink>
                <h3>Où alors S'inscrire ?</h3>
            </div>
      
        </div>
    )
}

export default Home
