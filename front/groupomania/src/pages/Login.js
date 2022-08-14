import React, {useState, useEffect} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/pages/signup.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import Fade from 'react-reveal/Fade';

function Login() {

    const [formEmail, setEmail] = useState('');
    const [formPassword, setPassword] = useState('');

    const data = {
        email : formEmail,
        password : formPassword
    }

    const [emailResp, setEmailResp] = useState('');
    const [passwordResp, setPasswordResp] = useState('');

    const navigate = useNavigate();

    const handleClick = async () => {
        try{
            console.log(JSON.stringify(data));
            await axios.post('http://localhost:3000/api/auth/login',  {
                    email: data.email ,
                    password: data.password
                }).then(resp => {
                    if (resp.data.errors){
                        console.log(resp.data.errors);
                        const emailResp = resp.data.errors.email;
                        const passwordResp = resp.data.errors.password;

                        if (emailResp.length != 0){
                            setEmailResp(resp.data.errors.email);
                        }else if (emailResp.length == 0){
                            setEmailResp(' ');
                        }

                        if (passwordResp.length == 0 ){
                            setPasswordResp(' ');
                        }else{
                            setPasswordResp(resp.data.errors.password);
                        }
                    }else {
                        console.log(resp.data);
                        setEmailResp(' ');
                        setPasswordResp(' ');
                        localStorage.setItem("userId", resp.data.userId);
                        localStorage.setItem("userToken", resp.data.token);
                        navigate("/forum");
                    }
                })
        }catch (err) {
            console.log(err);
        }
      }


    return (
        <>
    <Fade right>
    <div className='parent'>
        <div className="left">

            <div className="titles">

            <span>  <FontAwesomeIcon icon={faGlobe} /></span>

                <h1>Connexion</h1>
                <h2>Collaborez et communiquez avec votre équipe !</h2>
                <h3>Connexion via email</h3>

            </div>
            
            <div className="form">

            
                <div className="form_text">
                        <h2>Email</h2>
                        <input type="email" defaultValue="Email"  onChange={e => setEmail(e.target.value)}/>
                        <h2 className='errorHandler'>{emailResp}</h2>
                </div>

                <div className="form_text">
                        <h2>Mot de passe</h2>
                        <input type="password" defaultValue="Mot de passe" onChange={e => setPassword(e.target.value)}/>
                        <h2 className='errorHandler'>{passwordResp}</h2>
                </div>

                
                <button onClick={handleClick}>Connexion</button>
                <h4>
                Pas encore enregistré ?
                    <span>
                        <NavLink exact to="/signup" className="linktopage"  style={{ textDecoration: 'none', color: "#FD2D01" }}> Créer un compte</NavLink>
                    </span>
                </h4>
                <h5>2022@ Groupomania Tout Droits Réservés</h5>

            </div>

        </div>


            <div className="right right_two">
                <div className="template">
                    <img src={require("../media/template2.png")} alt="Groupomania-icon"  className='title_icon template2'/>   
                </div>            
            </div>

    </div>
    </Fade>
    </>
    )
}

export default Login
