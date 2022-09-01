import React from 'react'

function Comment({Commentaire}) {
    return (
        <div>
            <h1>{Commentaire.text}</h1>
        </div>
    )
}

export default Comment
