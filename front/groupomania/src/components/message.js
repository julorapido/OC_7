import axios from 'axios';
import React from 'react';
import {useEffect, useState, useRef} from 'react';
import {dateParser} from'./utils';
import '../styles/components/post.scss';
import '../styles/components/post_responsive.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPenToSquare, faTrashCan, faEllipsis, faSquareCheck, faCommentDots} from '@fortawesome/free-solid-svg-icons';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Fade';
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addComment, setComments } from '../feature/commentSlice';
import CommentCard from "../components/comment";

function Message({Message}) {

    const [userId, setuserId] = useState(false);
    const [messageModifying, setMessageModifying] = useState(false);
    const [messageValue, setMessageValue] = useState('');
    const inputElement = useRef();

    const [userData, setUserData] = useState([]);
    const [loggedUserData, setloggedUserData] = useState([]);
    const [messageDeleted, setMessageDeleted] = useState(false);
    const [randomClass, setRandomClass] = useState(false);
    const [messagePhoto, setMessagePhoto] = useState(true);
    const [userLiked, setUserLiked] = useState(false);
    const [userAlreadyLiked, setuserAlreadyLiked] = useState(false);
    const [likeInt, setlikeInt] = useState(0);
    const [newComment, setNewComment] = useState("Nouveau Commentaire");
    const dispatch = useDispatch();
    const commentsData = useSelector((state) => state.comments);

    const randInt = Math.floor(Math.random() * 4);
    //dispatch(setCommentsData(Message.comments));
    const date = dateParser(Message.createdAt, true);


     function DispatchComments(){
        Message.comments.forEach(element => {
             dispatch(addComment(element));
        });
    }

    useEffect(() => {
        if (Message.comments.length !== 0){
            DispatchComments();    
        }
    }, [])

    useEffect(() => {
        if (randInt === 1 || randInt === 3){setRandomClass(true);}
        getUserInfo();
        
        if ( (localStorage.getItem("userId") === Message.userId)){
            setuserId(true);
        }else{setuserId(false);}
        if(loggedUserData.admin === true ){setuserId(true);};


        if (Message.imageUrl === "http://localhost:3000/uploads"){
            setMessagePhoto(false);
        }
  
        checkPostLikeStatus();
    }, [userData.admin])






    function handlemodify(){
        if (messageModifying === true){
            setMessageModifying(false);}
        else {
            setMessageModifying(true);}
    }

    function checkPostLikeStatus(){
        if (Message.usersLiked.indexOf(localStorage.getItem("userId")) === -1){
            setUserLiked(false);
            setuserAlreadyLiked(false);
        }else{
            setUserLiked(true);
            setuserAlreadyLiked(true);
        }
    }

    function handleLike(){
            axios.post(`http://localhost:3000/api/post/` + Message._id,{
                userId: localStorage.getItem("userId")
            }).then(resp => {
                if (resp.status === 202){
                    setUserLiked(false);
                    setlikeInt(-1);
                }else {
                    setlikeInt(0);
                    setUserLiked(true);
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

    async function handleComment(){
        if (newComment){
            await axios.post("http://localhost:3000/api/post/comment/" + Message._id, {
                commenterId: localStorage.getItem("userId").toString(),
                text: newComment,
            }).then(resp => {
                dispatch(addComment(resp.data));
            }).catch(err => console.log(err))
        }
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
                                    <h2><NavLink exact to={"/forum/user/" + userData._id} className="linktopage"  style={{ textDecoration: 'none', color: "#FD2D01" }}> Voir Profil</NavLink></h2>
                                </div>

                                <div className="descdiv">
                                        <div className="textdiv">
                                                <h1>{userData.nom} {userData.prenom}</h1>
                                                <>
                                                {
                                                    userData.admin === true ? 
                                                    (<>
                                                    <h2>Administrateur Groupomania</h2>
                                                    </>) 
                                                    : (<>
                                                    <h2>Membre de la Communauté</h2>
                                                    </>)
                                                } 
                                                </>
                                        </div>
                              
                                        <img src={userData.imageUrl} alt="Icone de profil"/>
                                </div>

                        </div>
                        
                ) : (
                    <div className="top_msg right">
                            <div className="profile   prfl_right">
                                    <h1><FontAwesomeIcon icon={faEllipsis} /></h1>
                                    <h2><NavLink exact to={"/forum/user/" + userData._id} className="linktopage"  style={{ textDecoration: 'none', color: "#FD2D01" }}> Voir Profil</NavLink></h2>
                            </div>
                            <div className="descdiv">
                                        <div className="textdiv">
                                                <h1>{userData.nom} {userData.prenom}</h1>
                                                <>
                                                {
                                                    userData.admin === true ? 
                                                    (<>
                                                    <h2>Administrateur Groupomania</h2>
                                                    </>) 
                                                    : (<>
                                                    <h2>Membre de la Communauté</h2>
                                                    </>)
                                                } 
                                                </>
                                        </div>
                              
                                        <img src={userData.imageUrl} alt="Icone de profil"/>
                                </div>
                     </div>
                )}
        
       
                {messageModifying ? (
                    <>
                    <div className='mid_msg'>
                        <input 
                            ref={inputElement}
                            defaultValue={messageValue.length === 0 ? (Message.description) : (messageValue) }
                            autoFocus
                        />
                        <button onClick={ () => postModifiedMessage()}>Confirmer <FontAwesomeIcon icon={faSquareCheck} /></button>
                        <div className="imgdiv">
                                {messagePhoto ? (<><img src={Message.imageUrl} alt="Icone de message"/>  </>) : (<></>)}
                        </div>
                    </div>
                    </>
                ) : (
                    <div className='mid_msg'>
                        <h2>{messageValue.length === 0 ? (Message.description) : (messageValue) }</h2>
                        <div className="imgdiv">
                            {messagePhoto ? (<><img src={Message.imageUrl} alt="Icone de message"/> </>) : (<></>)}
                        </div>
                    </div>
                )
                }
                <div className="bottom_msg">
                    <div className="inf_msg">
                        <h2>{date}</h2>
                        <div className="like">
                        <h4 onClick={handleLike} className={ userLiked === true ? "heart_liked" : " "}> <FontAwesomeIcon icon={faHeart} /> </h4>
                        <h3> {userAlreadyLiked === true ? ( Message.likes + likeInt) : ( Message.likes + userLiked ) }  </h3>
                        </div>
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
                    <>
                    <h1>Commentaires</h1>
                    <div className="post_comment">
                        <input type="description" defaultValue="Nouveau Commentaire" onChange={e => setNewComment(e.target.value)} />
                        <button onClick={handleComment}>Commenter <FontAwesomeIcon icon={faCommentDots} /></button>
                        
                    </div>
                    </>
                    <>
                    <div className="all_comments">

                        {commentsData.comments.length === 0 ? (<></>) : (<>
                            {commentsData.comments?.map(function(comment) {
                                if (comment.postId === Message._id){
                                    return (
                                        <>
                                            <CommentCard Commentaire={comment}/>
                                        </>
                                    )
                                }
                            })}  
                        </>)}  
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
