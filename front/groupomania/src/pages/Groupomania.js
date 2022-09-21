import {useEffect, useState, useRef} from 'react'
import axios from 'axios';
import MessageCard from "../components/message";
import MemberCard from "../components/member";
import {useDispatch, useSelector} from "react-redux";
import cookies from 'js-cookie';
import { NavLink } from "react-router-dom";
import '../styles/pages/forum.scss'
import '../styles/pages/responsive_forum.scss'
import {dateParser} from'../components/utils';
import { setPostsData, addPost } from '../feature/postsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faEarthAmerica, faPaperPlane, faCloudArrowDown, faCaretRight, faUserPen, faArrowRightToBracket, faPeopleArrows, faCircleLeft, faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons'
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Fade';

function Groupomania() {
    const [userAuth, setuserAuth] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [userData, setUserData] = useState([]);
    const inputFile = useRef(null);
    const [fileName, setFileName] = useState('');
    const [memberClicked, setMemberClicked] = useState(false);
    const [users, getUsers] = useState('');

    const dispatch = useDispatch();
    const postsData = useSelector((state) => state.posts.posts);
    const [file, setFile] = useState();
    const date = dateParser(userData.createdAt, false);

    const [allUsersData, setallUsersData] = useState([]);

    const [sortMode, setSortMode] = useState(false);

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

    async function GetAllMumbers(allUsersData){
        if (allUsersData.length === 0){
            await axios.get("http://localhost:3000/api/auth/"
            ).then((resp) => {
                setallUsersData(resp.data);
            }).catch(err => console.log(err))
        }

    }

    const handlePicture = (e)=> {
        setFileName(e.target.files[0].name);
        setFile(e.target.files[0]);
    }

    async function handleClick(){
        const form = new FormData();
        if (file){
            form.append('image', file, localStorage.getItem("userId") + "_poste_" + file.name);
        }
        form.append('userId', localStorage.getItem("userId").toString());
        form.append('description', newMessage);

        await axios({
            method: "post",
            url: "http://localhost:3000/api/post/",
            data: form,
            headers: { "Content-Type": "multipart/form-data" },
          })
        .then(resp => {
                console.log(resp.data)
                dispatch(addPost(resp.data));
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        axios.get("http://localhost:3000/api/auth/users").then((response)  => {
            getUsers(response.data.docs);
        })
        
        .catch(error => console.error(`Error : ${error}`))
        CheckUserAuth();
        GetAllMumbers(allUsersData);
        getUserInfo();
        if (userAuth){
            axios.get('http://localhost:3000/api/post/').then(
                (resp) => {
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

    function switchSort(){
        if (sortMode){
            setSortMode(false);
        }else{
            setSortMode(true);
        }
    }
    return (
        <>
        <div className='wholepage'>
        {userAuth ? (
            <>

                <div className="header">
                            <p>GROUPOMANIA</p> 
                            <h1> <FontAwesomeIcon icon={faPeopleArrows} />  Postes de la Communauté</h1>
                            <div className="edit">
                              <h2 className='editprofile'> 
                                    <span>
                                    <NavLink exact to={"/forum/user/" + localStorage.getItem("userId").toString()} className="linktopage" style={{ textDecoration: 'none', color: "#000" }} >
                                    <FontAwesomeIcon icon={faUserPen} className="headerFa" /> Modifier mon profil
                                    </NavLink>
                                    </span>
                              </h2>

                              <h2 className='disconnect'>

                                    <NavLink exact to="/login" className="linktopage" style={{ textDecoration: 'none', color: "#FD2D01" }} >
                                    Déconnexion
                                    <FontAwesomeIcon icon={faArrowRightToBracket} className="headerFa"/>
                                    </NavLink>
                                                                     
                               </h2>
                           </div>
                </div>


                <div className="post_form">


                    <div className="top">
                        {memberClicked ? (<><img src={require("../media/home3.png")}  alt="Icone du forum"/></>): (<><img src={require("../media/forum2.png")}  alt="Icone du forum"/></>)}
                        <div className="top_title">
                            <h1>Groupomania</h1>
                            <h2>Membre depuis le {date} </h2>
                        </div>
                        <h4>Bienvenue, {userData.prenom} {userData.nom} </h4>
                        <h1>Communauté Groupomania <FontAwesomeIcon icon={faEarthAmerica} /> </h1>
                        {memberClicked ? (<><h2>Communauté publique  : <span> {users} Membres</span></h2></>) : (<><h2>Forum Groupomania  : <span> {postsData ? (<>{postsData.length}</>) : (<></>)} Postes</span></h2></>)}

                         <div className="bottom_title">
                            <h1 onClick={turnOff} className={memberClicked ? "" : "navclicked"}>Forum</h1>
                            <h1 onClick={turnOn} className={memberClicked ? "navclicked" : ""}>Membres</h1>
                         </div>
                    </div>

                        {memberClicked ? (<>
                            <div className='fil_members'>
                                <Slide bottom>
                                    <h1>Liste des membres</h1>
                                </Slide>
                                <Slide bottom>
                                    {sortMode ? (<> <h6 onClick={switchSort}>Trier par date (décroissant) <FontAwesomeIcon icon={faArrowTrendDown}/>  </h6></>) : (<> <h6 onClick={switchSort} >Trier par date (croissant)<FontAwesomeIcon icon={faArrowTrendUp}/> </h6></>)}
                                </Slide>
             
                                        <div className="cards-member">
                                            {sortMode ? (<>
                                            {allUsersData?.map((oneUser, index) => (
                                                <>
                                                <MemberCard key={index} MemberInfo={oneUser} />
                                                </>
                                            ))}

                                            </>) :(<>

                                            {allUsersData?.map((oneUser, index) => (
                                                <>
                                                <MemberCard key={index} MemberInfo={oneUser} />
                                                </>
                                            )).reverse()}

                                            </>)}
                               
                                        </div>
                         
                            </div>

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
                                    <input type="description"   placeholder="Nouveau message" onChange={e => setNewMessage(e.target.value)} className='desc_input' />
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
            <>
                <div className='connect_first'>

                    <h1>Veuillez vous connecter d'abord pour pouvoir consulter le forum  </h1>
                    <h2><NavLink exact to="/login" style={{ textDecoration: 'none', color: "white"}} > En cliquant ici <FontAwesomeIcon icon={faCircleLeft}/> </NavLink></h2>
                    <img src={require("../media/connectFirst.png")}  alt="Connectez vous d'abord"/>
                </div>
                </>
            )
             }
        </div>


        </>
    )
}

export default Groupomania
