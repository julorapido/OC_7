import {useEffect, useState} from 'react'
import axios from 'axios';
import MessageCard from "../components/message";
import {useDispatch, useSelector} from "react-redux";
import cookies from 'js-cookie';
import { NavLink } from "react-router-dom";
import '../styles/pages/forum.css'
import {dateParser} from'../components/utils';
import { setPostsData, addPost } from '../feature/postsSlice';
function Groupomania() {
    const [userAuth, setuserAuth] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [userData, setUserData] = useState([]);

    const dispatch = useDispatch();
    const postsData = useSelector((state) => state.posts.posts);
    const [file, setFile] = useState();
    const date = dateParser(userData.createdAt, false);

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

    const handlePicture = (e)=> {
       //setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }
    async function handleClick(){
        console.log(file);
        const form = new FormData();
        form.append('userId', localStorage.getItem("userId").toString());
        form.append('description', 'dff');
        form.append('image', file, 'image.png');
        const data = {};
        form.forEach((value, key) => (
            data[key] = value
        ));
        console.log(data);
        await axios({
            method: "post",
            url: "http://localhost:3000/api/post/",
            data: form,
            headers: { "Content-Type": "multipart/form-data" },
          })
        .then(resp => {
                console.log(resp);
                dispatch(addPost(resp.data));
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        CheckUserAuth();
        getUserInfo();
        if (userAuth){
            axios.get('http://localhost:3000/api/post/').then(
                (resp) => {
                    //console.log(resp.data)  
                    dispatch(setPostsData(resp.data))
                }
            ).catch(err => console.log(err))
        }
    }, [userAuth]);


    async function getUserInfo(){
        await axios.get("http://localhost:3000/api/auth/" + localStorage.getItem("userId")
        ).then((resp) => {
            setUserData(resp.data)
        }).catch(err => console.log(err))
    }


    return (
        <>
        <div>
        {userAuth ? (
            <>
                <div className="post_form">

                    <div className="header">
                       <h2>GROUPOMANIA</h2> 
                        <h1>POSTES DE TOUT LE MONDE</h1>
                        <h2>FOrum</h2>
                    </div>

                    <div className="newpost">
                        <h1>BIENVENU {userData.nom} {userData.prenom}</h1>
                        <h1>Membre depuis le {date}</h1>
                        <img src={userData.imageUrl}/>
                        <input type="description" defaultValue="Nouveau message" onChange={e => setNewMessage(e.target.value)} className='desc_input' />
                        <input type="file" name="messagePicture" accept="image/png, image/jpeg" title='' id='uploadimg' onChange={e => handlePicture(e)}/>
                        <button type='submit'name='submit' onClick={handleClick}>envoyer</button>
                    </div>
               
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
