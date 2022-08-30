import {useEffect, useState, useRef} from 'react'
import axios from 'axios';
import MessageCard from "../components/message";
import {useDispatch, useSelector} from "react-redux";
import cookies from 'js-cookie';
import { NavLink } from "react-router-dom";
import '../styles/pages/forum.scss'
import {dateParser} from'../components/utils';
import { setPostsData, addPost } from '../feature/postsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faEarthAmerica, faPaperPlane, faCloudArrowDown, faCaretRight, faUserPen, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import Fade from 'react-reveal/Fade';

function Groupomania() {
    const [userAuth, setuserAuth] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [userData, setUserData] = useState([]);
    const inputFile = useRef(null);
    const [fileName, setFileName] = useState('');
    const [memberClicked, setMemberClicked] = useState(false);

    const dispatch = useDispatch();
    const postsData = useSelector((state) => state.posts.posts);
    const [file, setFile] = useState();
    const date = dateParser(userData.createdAt, false);

    async function CheckUserAuth (){
        if (cookies.get("jwt")){
            await axios.post(
                'http://localhost:3000/api/auth/checktoken',{
                    cookie:cookies.get('jwt').toString()
                }).then((resp) =>{
                    if (resp.status === 200){
                        setuserAuth(true);
                        localStorage.setItem("userId", resp.data._id)
                    }else{
                        setuserAuth(false);
                    }
                }).catch(err => {
                    console.log(err.response.data);
                })
        }else {
            setuserAuth(false);
        }
    }

    const handlePicture = (e)=> {
        setFileName(e.target.files[0].name);
        setFile(e.target.files[0]);
    }

    async function handleClick(){
        const form = new FormData();
        if (file){
            form.append('image', file, 'image.png');
        }
        form.append('userId', localStorage.getItem("userId").toString());
        form.append('description', newMessage);
        const data = {};
        form.forEach((value, key) => (
            data[key] = value
        ));
        await axios({
            method: "post",
            url: "http://localhost:3000/api/post/",
            data: form,
            headers: { "Content-Type": "multipart/form-data" },
          })
        .then(resp => {
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
    }, [userAuth, dispatch]);


    async function getUserInfo(){
        await axios.get("http://localhost:3000/api/auth/" + localStorage.getItem("userId")
        ).then((resp) => {
            setUserData(resp.data)
        }).catch(err => console.log(err))
    }
    function turnOff(){setMemberClicked(false)};
    function turnOn(){setMemberClicked(true)};
    return (
        <>
        <div className='wholepage'>
        {userAuth ? (
            <>

                <div className="header">
                            <h2>GROUPOMANIA</h2> 
                            <h1>Postes de la Communauté</h1>
                            <div className="edit">
                              <h2 className='editprofile'> 
                                    <NavLink exact to={"/forum/user/" + localStorage.getItem("userId").toString()} className="linktopage" style={{ textDecoration: 'none', color: "#000" }} >
                                    <FontAwesomeIcon icon={faUserPen} className="headerFa" /> Modifier mon profil
                                    </NavLink>
                              </h2>

                               <h2>
                                    <NavLink exact to="/login" className="linktopage" style={{ textDecoration: 'none', color: "#FD2D01" }} >
                                    Déconnexion
                                    <FontAwesomeIcon icon={faArrowRightToBracket} className="headerFa"/>
                                    </NavLink>
                               </h2>
                           </div>
                </div>


                <div className="post_form">


                    <div className="top">
                        <img src={require("../media/forum.png")}  alt="Icone du forum"/>
                        <div className="top_title">
                            <h1>Groupomania</h1>
                            <h2>Membre depuis le {date} </h2>
                        </div>
                        <h4>Bienvenue,  {userData.nom} {userData.prenom}</h4>
                        <h1>Communauté Groupomania <FontAwesomeIcon icon={faEarthAmerica} /> </h1>
                         <h2>Communauté publique * 112 Membres</h2>

                         <div className="bottom_title">
                            <h1 onClick={turnOff} className={memberClicked ? "" : "navclicked"}>Forum</h1>
                            <h1 onClick={turnOn} className={memberClicked ? "navclicked" : ""}>Membres</h1>
                         </div>
                    </div>

                        {memberClicked ? (<>

                            tout les membres

                        </>): (
                            <>
                        <div className="newpost">

                            <div className="left">
                                <div className="imgdiv">
                                    <img src={userData.imageUrl} alt="Icone de profil"/>
                                </div>
                            </div>

                            <Fade clear>

                            <div className="right">
                                
                                <div className="top">
                                    <h3>{userData.nom} {userData.prenom}</h3>
                                    <input type="description" defaultValue="Nouveau message" onChange={e => setNewMessage(e.target.value)} className='desc_input' />
                                </div>

                                <div className="bottom">
                                    <div className="imgbtn">
                                        <h3 onClick={() => inputFile.current.click()} ><FontAwesomeIcon icon={faImages}  className="img_font"/> Image</h3>
                                        <h4>
                                            {fileName === "" ? 
                                            <>
                                               <FontAwesomeIcon icon={faCloudArrowDown} />
                                            </>
                                            : 
                                            <>
                                            <FontAwesomeIcon icon={faCaretRight} />
                                             {"  " + fileName} 
                                            </>
                                            }
                                        </h4>
                                    </div>
                                    <input type="file" name="messagePicture" accept="image/png, image/jpeg" title='' id='uploadimg' onChange={e => handlePicture(e)} ref={inputFile}/>
                                    <button type='submit'name='submit' onClick={handleClick}>Envoyer   <FontAwesomeIcon icon={faPaperPlane} /></button>
                                </div>
                            </div>
                            </Fade>
                        </div>
                            </>
                        )}

                </div>
                <>
                {memberClicked ? (<>
                
                </>): (
                <div className='fil_messages'>
                        <div className="cards-container">
                            {postsData?.map((pic, index) => (
                                <MessageCard key={index} Message={pic} />
                            )).reverse()}
                        </div>
                </div>

                )
                
            }
                </>
   
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
