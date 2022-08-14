import React, {useEffect, useState} from 'react'
import '../styles/pages/home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import axios from 'axios';
import Fade from 'react-reveal/Fade';

function Home() {
    const [users, getUsers] = useState('');
    const url = "http://localhost:3000/api/auth/users";
    const getUsersMembers = () => {
        axios.get(url).then((response)  => {
            const MemberNumber = response.data.docs;
            getUsers(MemberNumber);
        })
        .catch(error => console.error(`Error : ${error}`))
    }
    useEffect(() => {
        getUsersMembers();
    }, []);

    return (
        <div className='home_div'>
            <Fade left>
            <div className="image">
                  <img src={require("../media/template3.png")} alt="Groupomania-template"  className='home_template'/>   
            </div>
            </Fade>
            <Fade right>
            <div className="content">
                <img src={require("../media/blackIcon.png")} alt="Groupomania-template"  className='groupomania_logo'/>   
                <h1>Bienvenue sur le site de Groupomania !</h1>
                <h2>Rejoignez cette plateforme pour pouvoir échanger avec vos collègues !</h2>
                <h3>Communiquez dès maintenant avec plus de <span>{users -1}</span> Utilisateurs</h3>
                <NavLink exact to="/login" style={{ textDecoration: 'none', color: "white" }}  > <button>Se Connecter <FontAwesomeIcon icon={faSquareArrowUpRight} /> </button></NavLink>
                <h4>OU</h4>
                <NavLink exact to="/signup" style={{ textDecoration: 'none', color: "white" }} > <button className='btn-2'>S'inscrire <FontAwesomeIcon icon={faUserTie} /> </button></NavLink>
                <h5>2022 © Groupomania Tout Droit Reservés</h5>

            </div>
            </Fade>
        </div>
    )
}

export default Home
