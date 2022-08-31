import React from 'react';
import '../styles/components/memberCard.scss';
import Fade from 'react-reveal/Fade';
import {dateParser} from'../components/utils';
import { NavLink } from "react-router-dom";

function Member({MemberInfo}) {
    const date = dateParser(MemberInfo.createdAt, false);


    return (
        <Fade bottom>
        <div className="member_card">
        <NavLink exact to={"/forum/user/" + MemberInfo._id} className="linktopage" style={{ textDecoration: 'none', color: "#000" }} >
            <img src={MemberInfo.imageUrl}/>
            <h1>{MemberInfo.nom}</h1>
            <h2>{MemberInfo.prenom}</h2>
            <h3>
                {MemberInfo.admin === true ?
            (<>Administrateur</>) 
            : (<> Membre de la Communauté </>)} 
            
            </h3>
            <h4>Membre depuis le {date}</h4>
            </NavLink>
        </div>
        </Fade>
    )
}

export default Member
