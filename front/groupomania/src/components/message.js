import axios from 'axios';
import React from 'react'
import {useEffect, useState, useRef} from 'react'

function Message({Message}) {
    const [userId, setuserId] = useState(false);
    const [messageModifying, setMessageModifying] = useState(false);
    const [messageValue, setMessageValue] = useState('');
    const inputElement = useRef();
    const [messageChangedOnce, setMessageChangedOnce] = useState(false);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        getUserInfo();

        if (localStorage.getItem("userId") === Message.userId ){
            setuserId(true);
        }else{
            setuserId(false);
        }
        if(messageValue.length === 0){setMessageChangedOnce(false)}else{setMessageChangedOnce(true)}
    }, [messageModifying, messageValue])


    function handlemodify(){
        if (messageModifying === true){
            setMessageModifying(false);}
        else {
            setMessageModifying(true);}
    }



    function postModifiedmessage(){
        setMessageModifying(false);
        setMessageValue(inputElement.current.value);
        const data = {
            userId : localStorage.getItem("userId"),
            description: inputElement.current.value
        }
         axios.put("http://localhost:3000/api/post/" + Message._id, data);
    }
    

    async function getUserInfo(){
        await axios.get("http://localhost:3000/api/auth/" + Message.userId
        ).then((resp) => {
            setUserData(resp.data)
        }).catch(err => console.log(err))
    }

    return (
        <div className='message_div'>
            <>
            {userId ? (
                <>
                    <button onClick={handlemodify}>MODIFIER</button>
                </>
            ):(
                <>  
                </>
            )}
            </>
            {messageModifying ? (
                <>
                <div>
                    <input 
                        ref={inputElement}
                        defaultValue={messageChangedOnce ? messageValue : Message.description }
                        autoFocus
                    />
                    <button onClick={ () => postModifiedmessage()}>confirmer</button>
                </div>
                </>
            ) : (
                <h2>Desc : {messageChangedOnce ? messageValue : Message.description }</h2>
            )
            }
            <h1>Message de {userData.nom}</h1>
            <h4>Crée le : {Message.createdAt}</h4>
            <h6>ID DU MESSAGE : {Message._id}</h6>
        </div>
        
    )
}

export default Message
