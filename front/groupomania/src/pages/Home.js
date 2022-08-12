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
            <img src={require("../media/red.png")} alt="Groupomania-template"  className='groupomania_logo'/>   
                <h1>Bienvenue sur le site de Groupomania !</h1>
                <button><NavLink exact to="/login" style={{ textDecoration: 'none', color: "white" }}  > Se Connecter <FontAwesomeIcon icon={faGlobe} /></NavLink></button>
                <h2>Où alors S'inscrire ?</h2>
            </div>
      
        </div>
    )
}

export default Home
