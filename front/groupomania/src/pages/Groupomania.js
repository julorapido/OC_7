import {useEffect, useState} from 'react'
import axios from 'axios';
import MessageCard from "../components/message";
import {useDispatch, useSelector} from "react-redux";
import cookies from 'js-cookie';
import { NavLink } from "react-router-dom";

import { setPostsData, addPost } from '../feature/postsSlice';
function Groupomania() {
    const [userAuth, setuserAuth] = useState(false);
    const [newMessage, setNewMessage] = useState('');

    const dispatch = useDispatch();
    const postsData = useSelector((state) => state.posts.posts);

    async function CheckUserAuth (){
        await axios.post(
            'http://localhost:3000/api/auth/checktoken',{
                cookie:cookies.get('jwt').toString()
            }).then((resp) =>{
                if (resp.status === 200){
                    localStorage.setItem("userId", resp.data._id)
                    setuserAuth(true);
                }else{
                    setuserAuth(false);
                }
            }).catch(err => {
                console.log(err.response.data);
            })
    }




    async function handleClick(){
        console.log("ici");
        console.log(newMessage);
        await axios.post('http://localhost:3000/api/post/', {
            userId: localStorage.getItem("userId") ,
            description: newMessage
            } ).then(resp => {
                console.log(resp);
                dispatch(addPost(resp.data));
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        CheckUserAuth()
        if (userAuth){
            axios.get('http://localhost:3000/api/post/').then(
                (resp) => {
                    //console.log(resp.data)  
                    dispatch(setPostsData(resp.data))
                }
            ).catch(err => console.log(err))
        }
    }, [userAuth]);


    return (
        <>
        <div>
        {userAuth ? (
            <>
                <div className="post_form">
                        <h1>ee</h1>
                        <h1>POSTES DE TOUT LE MONDE</h1>
                        <h2>Rédiger un nouveau message</h2>
                        <input type="description" defaultValue="Nouveau message" onChange={e => setNewMessage(e.target.value)}/>
                        <button type='submit' onClick={handleClick}>envoyer</button>
                </div>

                <div className='fil_messages'>
                        <div className="cards-container">
                            {postsData?.map((pic, index) => (
                                <MessageCard key={index} Message={pic} />
                            )).reverse()}
                        </div>
                </div>
        </>
        ):(
                <div>
                    
                    Veuillez vous connecter pour pouvoir consulter le forum 
                    <NavLink exact to="/login" style={{ textDecoration: 'none'}} > En cliquant ici </NavLink>

                </div>
            )
             }
        </div>


        </>
    )
}

export default Groupomania
