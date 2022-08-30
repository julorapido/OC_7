import axios from 'axios';
import React from 'react';
import {useEffect, useState, useRef} from 'react';
import {dateParser} from'./utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPenToSquare, faTrashCan, faEllipsis, faE} from '@fortawesome/free-solid-svg-icons';
import Fade from 'react-reveal/Fade';
import { NavLink } from "react-router-dom";

function Message({Message}) {

    const [userId, setuserId] = useState(false);
    const [messageModifying, setMessageModifying] = useState(false);
    const [messageValue, setMessageValue] = useState('');
    const inputElement = useRef();
    const [messageChangedOnce, setMessageChangedOnce] = useState(false);
    const [userData, setUserData] = useState([]);
    const [loggedUserData, setloggedUserData] = useState([]);
    const [messageDeleted, setMessageDeleted] = useState(false);
    const [randomClass, setRandomClass] = useState(false);
    const [userAdmin, setuserAdmin] = useState(false);
    const [messagePhoto, setMessagePhoto] = useState(true);
    const [userLiked, setUserLiked] = useState(0);

    const randInt = Math.floor(Math.random() * 4);

    const date = dateParser(Message.createdAt, true);
    useEffect(() => {
        if (randInt === 1 || randInt === 3){
            setRandomClass(true);
        }
        getUserInfo();
        if ( (localStorage.getItem("userId") === Message.userId)){
            setuserId(true);
        }else{
            setuserId(false);
        }

        if(loggedUserData.admin === true ){
            setuserId(true);

        };

        if (userData.admin === true){
            setuserAdmin(true);
        }else{
            setuserAdmin(false);
        }

        if (Message.imageUrl === "http://localhost:3000/uploads"){
            setMessagePhoto(false);
        }
        if(messageValue.length === 0){setMessageChangedOnce(false)}else{setMessageChangedOnce(true)}
    }, [messageValue])


    function handlemodify(){
        if (messageModifying === true){
            setMessageModifying(false);}
        else {
            setMessageModifying(true);}
    }

    function handleLike(){
        axios.post(`http://localhost:3000/api/post/` + Message._id,{
            userId: localStorage.getItem("userId")
        }).then(resp => {
            if (resp.status === 202){
                setUserLiked(0);
            }else {
                setUserLiked(1);
            }
        });
    }


    function postModifiedMessage(){
        setMessageModifying(false);
        setMessageValue(inputElement.current.value);
        const data = {
            userId : localStorage.getItem("userId"),
            description: inputElement.current.value
        }
         axios.put("http://localhost:3000/api/post/" + Message._id, data);
    }
    
    function handleDelete(){
        setMessageDeleted(true);
        axios.delete("http://localhost:3000/api/post/" + Message._id);
    }


    async function getUserInfo(){
        const requestOne = axios.get("http://localhost:3000/api/auth/" + Message.userId);
        const requestTwo = axios.get("http://localhost:3000/api/auth/" + localStorage.getItem("userId"));
        await axios.all([requestOne, requestTwo]).then((axios.spread((...responses) => {
            setUserData(responses[0].data);
            setloggedUserData(responses[1].data);
        })))
    }

    return (
        <>
        {messageDeleted ?
         (<></>)
        : (<>
                                <Fade bottom>

        <div className='message_div'>
                {randomClass ? (
                        <div className="top_msg left">
                                <div className="profile prfl_left">
                                    <h1><FontAwesomeIcon icon={faEllipsis} /></h1>
                                    <h2><NavLink exact to="/signup" className="linktopage"  style={{ textDecoration: 'none', color: "#FD2D01" }}> Voir Profil</NavLink></h2>
                                </div>

                                <div className="descdiv">
                                        <div className="textdiv">
                                                <h1>{userData.nom} {userData.prenom}</h1>
                                                <>
                                                {
                                                    userAdmin ? 
                                                    (<>
                                                    <h2>Administrateur Groupomania</h2>
                                                    </>) 
                                                    : (<>
                                                    <h2>Membre de la Communauté</h2>
                                                    </>)
                                                } 
                                                </>
                                        </div>
                              
                                        <img src={userData.imageUrl}/>
                                </div>

                        </div>
                        
                ) : (
                    <div className="top_msg right">
                            <div className="profile   prfl_right">
                                    <h1><FontAwesomeIcon icon={faEllipsis} /></h1>
                                    <h2><NavLink exact to="/signup" className="linktopage"  style={{ textDecoration: 'none', color: "#FD2D01" }}> Voir Profil</NavLink></h2>
                            </div>
                            <div className="descdiv">
                                        <div className="textdiv">
                                                <h1>{userData.nom} {userData.prenom}</h1>
                                                <>
                                                {
                                                    userAdmin ? 
                                                    (<>
                                                    <h2>Administrateur Groupomania</h2>
                                                    </>) 
                                                    : (<>
                                                    <h2>Membre de la Communauté</h2>
                                                    </>)
                                                } 
                                                </>
                                        </div>
                              
                                        <img src={userData.imageUrl}/>
                                </div>
                     </div>
                )}
        
       
                {messageModifying ? (
                    <>
                    <div className='mid_msg'>
                        <input 
                            ref={inputElement}
                            defaultValue={messageChangedOnce ? messageValue : Message.description }
                            autoFocus
                        />
                        <button onClick={ () => postModifiedMessage()}>confirmer</button>
                        <div className="imgdiv">
                                {messagePhoto ? (<><img src={Message.imageUrl}/></>) : (<></>)}
                        </div>
                    </div>
                    </>
                ) : (
                    <div className='mid_msg'>
                        <h2>{messageChangedOnce ? messageValue : Message.description }</h2>
                        <div className="imgdiv">
                            {messagePhoto ? (<><img src={Message.imageUrl}/></>) : (<></>)}
                        </div>
                    </div>
                )
                }
                <div className="bottom_msg">
                    <div className="inf_msg">
                        <h2>{date}</h2>
                        <h4 onClick={handleLike}> <FontAwesomeIcon icon={faHeart} /> </h4>
                        <h3>{Message.likes + userLiked}</h3>
                    </div>


                    <>
                        <div className="edit_msg">
                                {userId ? (
                                    <>  
                                        
                                            <button onClick={handlemodify} className="modify">MODIFIER <FontAwesomeIcon icon={faPenToSquare}/> </button>
                                    
                                        <button onClick={handleDelete}  className="delete">SUPPRIMER <FontAwesomeIcon icon={faTrashCan}/> </button>
                                    </>
                                ):(
                                    <>  
                                    </>
                                )}
                        </div>
           
                    </>

                </div>


        </div>   
        </Fade>
  
        </>)
        
        }

        </>
    )
}

export default Message
