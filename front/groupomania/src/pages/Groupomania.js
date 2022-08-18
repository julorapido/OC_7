import {useEffect, useState} from 'react'
import axios from 'axios';
import MessageCard from "../components/message";
import {useDispatch, useSelector} from "react-redux";
import cookies from 'js-cookie';
import { NavLink } from "react-router-dom";

import { setPostsData } from '../feature/postsSlice';
function Groupomania() {
    const [userAuth, setuserAuth] = useState(false);
    const dispatch = useDispatch()
    const postsData = useSelector((state) => state.posts.posts);

    async function CheckUserAuth (){
        await axios.post(
            'http://localhost:3000/api/auth/checktoken',{
                cookie:cookies.get('jwt').toString()
            }).then((resp) =>{
                console.log(resp);
                if (resp.status === 200){
                    setuserAuth(true);
                }else{
                    setuserAuth(false);
                }
            }).catch(err => {
                console.log(err.response.data);
            })
    }

    useEffect(() => {
        console.log(cookies.get('jwt'));
        CheckUserAuth();
    })


    return (
        <>
        <div>
        {userAuth ? (
            <>
                <div className="post_form">
                        <h1>ee</h1>
                </div>

                <div className='fil_messages'>
                        <h1>POSTES DE TOUT LE MONDE</h1>
                        <div className="cards-container">
                        {postsData?.map((pic, index) => (
                            <MessageCard key={index} Message={pic} />
                        ))}
                        </div>
                </div>
        </>
        ):(
                <div>
                    Veuillez vous connecter pour pouvoir consulter le forum 
                    <NavLink exact to="/login" style={{ textDecoration: 'none'}} > Connecte-toi</NavLink>

                </div>
            )
             }
        </div>


        </>
    )
}

export default Groupomania
