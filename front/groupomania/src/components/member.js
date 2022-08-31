import React from 'react';
import '../styles/components/memberCard.scss';
import Fade from 'react-reveal/Fade';
import {dateParser} from'../components/utils';

function Member({MemberInfo}) {
    const date = dateParser(MemberInfo.createdAt, false);


    return (
        <Fade bottom>
        <div className="member_card">
            <img src={MemberInfo.imageUrl}/>
            <h1>{MemberInfo.nom}</h1>
            <h2>{MemberInfo.prenom}</h2>
            <h3>
                {MemberInfo.admin === true ?
            (<>Administrateur</>) 
            : (<> Membre de la Communauté </>)} 
            
            </h3>
            <h4>Membre depuis le {date}</h4>
        </div>
        </Fade>
    )
}

export default Member
