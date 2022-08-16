import React from 'react'

function Message({Message}) {
    console.log(Message);
    return (
        <div className='message_div'>
            <h1>Message de {Message.userId}</h1>
            <h2>Desc : {Message.description}</h2>
            <h4>Crée le : {Message.createdAt}</h4>
            <h6>ID DU MESSAGE : {Message._id}</h6>

        </div>
    )
}

export default Message
