import React from 'react';
import axios from 'axios';
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faHouse } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState, useRef} from 'react';
import '../styles/pages/userprofile.scss';
import {dateParser} from'../components/utils';
import Fade from 'react-reveal/Fade';

function UserProfile() {
        const [userData, setUserData] = useState([]);
        const [isAdmin, setIsAdmin] = useState(false);
        const params = useParams();
        const date = dateParser(userData.createdAt, false);
        const [fileUrl, setFileUrl] = useState("http://localhost:3000/uploads/");
        const inputFile = useRef(null);
        const [file, setFile] = useState();
        const [userCanEdit, setuserCanEdit] = useState(false);

        async function getUserInfo(){
            await axios.get("http://localhost:3000/api/auth/" + params.id.toString()
            ).then((resp) => {
                setUserData(resp.data);
            }).catch(err => console.log(err))
        }
        const handlePicture = (e)=> {
            setFileUrl(fileUrl + e.target.files[0].name);
            setFile(e.target.files[0]);
            if (e.target.files[0]){
                UpdateUserData();
            }
        }

        async function UpdateUserData(){
            const form = new FormData();
            if (file){
                form.append('image', file, 'image.png');
            }
            const data = {};
            form.forEach((value, key) => (
                data[key] = value
            ));
            await axios({
                method: "put",
                url: "http://localhost:3000/api/auth/" + localStorage.getItem("userId"),
                data: form,
                headers: { "Content-Type": "multipart/form-data" },
              })
            .then(resp => {
                console.log(resp.data);
            }).catch(err => console.log(err))
        }
        useEffect(() => {            
            getUserInfo();
            if (userData.admin === true){
                setIsAdmin(true);
            }else{setIsAdmin(false);}

            if (userData._id === localStorage.getItem("userId")){
                setuserCanEdit(true);
            }
        }, [userData]);


        return (
            <>
            <div className='header'>
                <h2>GROUPOMANIA</h2> 
                <h1>Profil d'utilisateur</h1>
                <div className="edit">
                    <h2 className='editprofile'> 
                                        <NavLink exact to="/forum/" className="linktopage" style={{ textDecoration: 'none', color: "#000" }} >
                                        <FontAwesomeIcon icon={faHouse} className="headerFa" /> Retourner au forum
                                        </NavLink>
                    </h2>

                    <h2>
                            <NavLink exact to="/login" className="linktopage" style={{ textDecoration: 'none', color: "#FD2D01" }} >
                            Déconnexion
                            <FontAwesomeIcon icon={faArrowRightToBracket} className="headerFa"/>
                            </NavLink>
                    </h2>
                </div>
            </div>
                {userData.length === 0 ? (<>
                            <div className="loaderdiv">
                              <span class="loader"></span>
                            </div>
                        
                    </>) : (
                        <>



                            <Fade bottom>
                            <div className="profile_content">
                                <div className="profile_subcontent">
                                        <img src={userData.imageUrl} alt="Icone de profil"/>
                                        <h1>{userData.nom} {userData.prenom}</h1>
                                        {isAdmin ?(<>
                                        <h2>Administrateur Groupomania</h2></>) 
                                         : (<> <h2>Membre de la Communauté</h2>
                                        </>)} 
                                        <h3>Membre depuis le {date} </h3>
                                        {userCanEdit ? (<>
                                            <button onClick={() => inputFile.current.click()} >Modifier sa photo de profil</button>
                                        <input type="file" name="messagePicture" accept="image/png, image/jpeg" title='' id='uploadimg' onChange={e => handlePicture(e)} ref={inputFile}/>
                                        </>): (<>
                          
                                        </>)}
                           
                                </div>  
                             
                            </div>
                            </Fade>






                        </>
                 )}


            </>

        )
}

export default UserProfile
