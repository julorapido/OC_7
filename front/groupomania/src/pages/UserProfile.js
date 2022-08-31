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
        const [file, setFile] = useState();
        const [userCanEdit, setuserCanEdit] = useState(false);


        async function getUserInfo(){
            await axios.get("http://localhost:3000/api/auth/" + params.id.toString()
            ).then((resp) => {
                setUserData(resp.data);
            }).catch(err => console.log(err))
        }


        async function handlePicture (e) {
            console.log(e.name);
            await UpdateUserData().then(resp => {
                setFileUrl("http://localhost:3000/uploads/"+ localStorage.getItem("userId") + "-" + e.name);
            });
        }


        async function UpdateUserData(){
            const form = new FormData();
            if (file){
                form.append('image', file, localStorage.getItem("userId") + "-" + file.name);
            }
            await axios({
                method: "put",
                url: "http://localhost:3000/api/auth/" + localStorage.getItem("userId"),
                data: form,
                headers: { "Content-Type": "multipart/form-data" },
              })
            .then(resp => {}).catch(err => console.log(err));
        }




        useEffect(() => {            
            getUserInfo();

            if (userData._id === localStorage.getItem("userId")){
                setuserCanEdit(true);
            }

            if (file){
                handlePicture(file);
                setFile();
            }
        }, [userData, setFile, fileUrl]);


        return (
            <>
            <div className='header'>
                <p>GROUPOMANIA</p> 
                <h1> <FontAwesomeIcon icon={faAddressCard} /> | 
                {userCanEdit ? (<>Votre Profil</>) : (<> Profil d'utilisateur</>)}
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
                                        <h3>Membre depuis le {date} </h3>
                                        {userCanEdit ? (<>
                                            <button onClick={() => inputFile.current.click()} >Modifier votre photo de profil</button>
                                        <input type="file" name="messagePicture" accept="image/png, image/jpeg" title='' id='uploadimg' onChange={e => setFile(e.target.files[0])} ref={inputFile}/>
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
