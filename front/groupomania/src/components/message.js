import axios from 'axios';
import React from 'react';
import {useEffect, useState, useRef} from 'react';
import {dateParser} from'./utils';

function Message({Message}) {

    const [userId, setuserId] = useState(false);
    const [messageModifying, setMessageModifying] = useState(false);
    const [messageValue, setMessageValue] = useState('');
    const inputElement = useRef();
    const [messageChangedOnce, setMessageChangedOnce] = useState(false);
    const [userData, setUserData] = useState([]);
    const [loggedUserData, setloggedUserData] = useState([]);
    const [messageDeleted, setMessageDeleted] = useState(false);
    const date = dateParser(Message.createdAt);
    useEffect(() => {
        getUserInfo();
        if ( (localStorage.getItem("userId") === Message.userId)){
            setuserId(true);
        }else{
            setuserId(false);
        }

        if(loggedUserData.admin === true ){
            setuserId(true)
        };

        if(messageValue.length === 0){setMessageChangedOnce(false)}else{setMessageChangedOnce(true)}
    }, [messageModifying, messageValue, loggedUserData])


    function handlemodify(){
        if (messageModifying === true){
            setMessageModifying(false);}
        else {
            setMessageModifying(true);}
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
            
        <div className='message_div'>

                {messageModifying ? (
                    <>
                    <div>
                        <input 
                            ref={inputElement}
                            defaultValue={messageChangedOnce ? messageValue : Message.description }
                            autoFocus
                        />
                        <button onClick={ () => postModifiedMessage()}>confirmer</button>
                    </div>
                    </>
                ) : (
                    <h2>Desc : {messageChangedOnce ? messageValue : Message.description }</h2>
                )
                }
                <img src={userData.imageUrl}/>
                <h1>Message de {userData.nom}</h1>
                <h4>Crée le : {date}</h4>
                <h4>Likes {Message.likes}</h4>
                <h6>ID DU MESSAGE : {Message._id}</h6>
                <>
                {userId ? (
                    <>
                        <button onClick={handlemodify}>MODIFIER</button>
                        <button onClick={handleDelete}>SUPPRIMER</button>
                    </>
                ):(
                    <>  
                    </>
                )}
                </>
        </div>     
        </>)}

        </>
    )
}

export default Message
