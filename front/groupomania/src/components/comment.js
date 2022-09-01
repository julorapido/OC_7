import React from 'react';
import {useEffect, useState, useRef} from 'react'
import '../styles/components/comment.scss';
import axios from "axios";
import { faTrashCan, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Comment({Commentaire}) {
    let date = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit',
     minute: '2-digit' }).format(Commentaire.timestamp);

    const [userValid, setUserValid] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const [commentDeleted, setCommentDeleted] = useState(false);
    const [commentModifying, setCommentModifying] = useState(false);
    const inputElement = useRef();
    const [commentValue, setCommentValue] = useState("");
    async function fetchUser(){
        await axios.get("http://localhost:3000/api/auth/" + Commentaire.commenterId).then(
            resp => {
                setUserInfo(resp.data)
        }).catch(err => console.log(err));
    }


    async function DeleteComment(){
        await axios.post("http://localhost:3000/api/post/deleteComment/" + Commentaire.postId , {
            commentId: Commentaire._id
        }).then(resp => console.log(resp.data)).catch(err => console.log(err));
        setCommentDeleted(true);
    }
    function ModifyComment(){
        if (commentModifying){setCommentModifying(false)}
        else{setCommentModifying(true)}    
    }
    function SendComment(){
        setCommentModifying(false);
        setCommentValue(inputElement.current.value);
        const data = {
            commentId: Commentaire._id,
            text : inputElement.current.value
        }
         axios.post("http://localhost:3000/api/post/modifyComment/" + Commentaire.postId, data).then(resp => {
            console.log(resp.data)
         });
    }
     useEffect(() => {
        if ( Commentaire.commenterId === localStorage.getItem("userId")){
            setUserValid(true);
        }
        fetchUser();
     }, [])
     

    return (
        <>
        {commentDeleted ? (<></>) : (<>
        
            {userInfo ? (<>
                <div className='comment_card'>

                        <div className="user_card">
                            <img src={userInfo.imageUrl}/>
                            <h1>{userInfo.prenom} {userInfo.nom}</h1>
                        </div>

                        <div className="top">
                            {commentModifying ? (<>
                                <input 
                                    ref={inputElement}
                                    defaultValue={commentValue.length === 0 ? (Commentaire.text) : (commentValue) }
                                    autoFocus
                                />  
                                <button onClick={SendComment}>Confirmer</button>
                            </>) :(<>
                                <h1>{commentValue ?  (commentValue) : (Commentaire.text)  }</h1>    
                            </>)}
                                <h2>{date}</h2>    
                        </div>

                        <div className="bottom">
                            { userValid ? (<>
                                <button onClick={ModifyComment}className='modify' ><FontAwesomeIcon icon={faPenToSquare} /> </button>
                                <button onClick={DeleteComment} className='delete' ><FontAwesomeIcon icon={faTrashCan}/> </button>
                            </>) : (<></>)}   
                        </div>

                </div>
            
            </>) : (<>
                <div className="loader">
                    <h1>...</h1>
                </div>
            </>)}

        </>)}
        </>
    )
}

export default Comment
