import React from 'react';
import axios from 'axios';
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faHouse, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState, useRef} from 'react';
import '../styles/pages/userprofile.scss';
import {dateParser} from'../components/utils';
import Fade from 'react-reveal/Fade';

function UserProfile() {
        const [userData, setUserData] = useState([]);
        const params = useParams();
        const date = dateParser(userData.createdAt, false);
        const [fileUrl, setFileUrl] = useState("");
        const inputFile = useRef(null);
        const [file, setFile] = useState(null);
        const [userCount, setUserCount] = useState(0);

        async function getUserInfo(){
            await axios.get("http://localhost:3000/api/auth/" + params.id.toString()
            ).then((resp) => {
                setUserData(resp.data);
            }).catch(err => console.log(err))
        }

        async function getPostsCount(){
            await axios.get("http://localhost:3000/api/post/user/" + params.id.toString()
            ).then((resp) => {
                setUserCount(resp.data);
            }).catch(err => console.log(err))
        }
        
        const handleFileChange = (e) => {
            setFile(e.target.files[0]);
            UpdateUserData(e.target.files[0]);
          };

        async function UpdateUserData(imageFile){
 
            const form = new FormData();
            if (imageFile){
                form.append('image', imageFile, localStorage.getItem("userId") + "-" + imageFile.name);
            }
            await axios({
                method: "put",
                url: "http://localhost:3000/api/auth/" + localStorage.getItem("userId"),
                data: form,
                headers: { "Content-Type": "multipart/form-data" },
              })
            .then(resp => {
                setFileUrl("http://localhost:3000/uploads/"+ localStorage.getItem("userId") + "-" + imageFile.name);
            }).catch(err => console.log(err));
            setFile();
        }



        useEffect(() => {         
            getUserInfo();
            getPostsCount();
        }, []);



        return (
            <>
            <div className='header'>
                <p>GROUPOMANIA</p> 
                <h1> <FontAwesomeIcon icon={faAddressCard} /> | 
                {userData._id === localStorage.getItem("userId") ? (<>Votre Profil</>) : (<> Profil d'utilisateur</>)}
                </h1>
                <div className="edit">
                    <h2 className='editprofile'> 
                                        <NavLink exact to="/forum/" className="linktopage" style={{ textDecoration: 'none', color: "#000" }} >
                                        <FontAwesomeIcon icon={faHouse} className="headerFa" /> Retourner au forum
                                        </NavLink>
                    </h2>

                    <h2 className='disconnect'>
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
                                        {fileUrl === "" ? (<><img src={userData.imageUrl} alt="Icone de profil"/></>) : (<><img src={fileUrl} alt="Icone de profil"/></>)}
                                        <h1>{userData.nom} {userData.prenom}</h1>
                                        {userData.admin === true ?(<>
                                        <h2>Administrateur Groupomania</h2></>) 
                                         : (<> <h2>Membre de la Communauté</h2>
                                        </>)} 
                                        <h2>{userCount} Postes</h2>
                                        <h3>Membre depuis le {date} </h3>
                                        {userData._id === localStorage.getItem("userId") ? (<>
                                            <button onClick={() => inputFile.current.click()} >Modifier votre photo de profil</button>
                                        <input type="file" name="messagePicture" accept="image/png, image/jpeg" title='' id='uploadimg'
                                         onChange={handleFileChange} 
                                             ref={inputFile}/>
                                        <h4>Taille Maximale 500 x 500 </h4>
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
