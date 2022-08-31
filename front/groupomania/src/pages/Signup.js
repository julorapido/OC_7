import React, {useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/pages/signup.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import Fade from 'react-reveal/Fade';

function Signup() {

    const [formEmail, setEmail] = useState('');
    const [formPassword, setPassword] = useState('');
    const [formFirstName, setFirstName] = useState('');
    const [formLastName, setLastName] = useState('');
    const data = {
        email : formEmail,
        password : formPassword,
        firstName: formFirstName,
        lastName: formLastName
    }
    const navigate = useNavigate();


    const [emailResp, setEmailResp] = useState('');
    const [passwordResp, setPasswordResp] = useState('');

    const handleClick = async () => {

    
    
        try{
            console.log(JSON.stringify(data));
            await axios.post('http://localhost:3000/api/auth/signup',  {
                    email: data.email ,
                    password: data.password,
                    nom: data.firstName,
                    prenom: data.lastName
                }).then(resp => {
                    if (resp.data.errors){
                        setEmailResp(resp.data.errors.email);
                        setPasswordResp(resp.data.errors.password);
                    }else {
                        setEmailResp(' ');
                        setPasswordResp(' ');
                        localStorage.setItem("userId", resp.data.userId);
                        navigate("/login");
                    }
                })    
        }catch(err){
            console.log(err);
        }
    }
    
    const handleEmail = event => {
        if (/\S+@\S+\.\S+/.test(event.target.value) === true){
            setEmailResp(' ');
            setEmail(event.target.value);
        }else{
            setEmailResp('Veuiller insérer un email correct');
        }
    }

    
    return (
        <>
        <Fade left>
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
                        <input type="text" defaultValue="Nom"  onChange={e => setFirstName(e.target.value)}/>
                    </div>

                    <div className="form_text">
                        <h2>Prénom
                        <span>*</span>
                        </h2>
                        <input type="text" defaultValue="Prénom" onChange={e => setLastName(e.target.value)}/>
                    </div>

                    <div className="form_text">
                        <h2>
                            Email
                            <span>*</span>
                        </h2>
                        <input type="text"defaultValue="Adresse Mail"  onChange={handleEmail}/>
                        <h2 className='errorHandler'>{emailResp}</h2>
                    </div>

                    <div className="form_text">
                        <h2>Mot de passe
                        <span>*</span>
                        </h2>
                        <input type="password" defaultValue="Mot de passe"  onChange={e => setPassword(e.target.value)}/>
                        <h2 className='errorHandler'>{passwordResp}</h2>
                    </div>

                    <button onClick={handleClick}>Inscription</button>
                    <h4>
                       Déjà un compte ?            
                        <NavLink exact to="/login" className="linktopage" style={{ textDecoration: 'none', color: "#FD2D01" }} > Connecte-toi</NavLink>
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
    </Fade>
    </>
    )
}

export default Signup
