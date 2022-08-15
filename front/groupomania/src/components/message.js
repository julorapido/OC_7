import React from 'react'

function Message({Message}) {
    console.log(Message);
    return (
        <div>
            <h4>Crée le : {Message.createdAt}</h4>
            <h1>Message de {Message.userId}</h1>
            <h2>Desc : {Message.description}</h2>
        </div>
    )
}

export default Message
