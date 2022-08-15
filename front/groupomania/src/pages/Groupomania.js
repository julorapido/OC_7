import {useEffect, useState} from 'react'
import axios from 'axios';
import MessageCard from "../components/message";

function Groupomania() {
    const [messagesData, setMessagesData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/post")
        .then((res) => {
            setMessagesData(res.data)
        }).catch(err => console.log(err))
    }, [])

    console.log(messagesData);

    return (
        <div className='message_div'>
            <h1>POSTES DE TOUT LE MONDE</h1>
            <div className="cards-container">
            {messagesData?.map((pic, index) => (
                <MessageCard key={index} Message={pic} />
            ))}
            </div>
        </div>
    )
}

export default Groupomania
