import {useEffect} from 'react'
import axios from 'axios';
import MessageCard from "../components/message";
import {useDispatch, useSelector} from "react-redux";
import { setPostsData } from '../feature/postsSlice';
function Groupomania() {
    const dispatch = useDispatch()
    const postsData = useSelector((state) => state.posts.posts);

    useEffect(() => {
        axios.get("http://localhost:3000/api/post")
        .then((res) => {
            console.log(res.data);
            dispatch(setPostsData(res.data));
        }).catch(err => console.log(err))
    })


    return (
        <div>
            <h1>POSTES DE TOUT LE MONDE</h1>
            <div className="cards-container">
            {postsData?.map((pic, index) => (
                <MessageCard key={index} Message={pic} />
            ))}
            </div>
        </div>
    )
}

export default Groupomania
