import React from 'react';

import Card from '../UI/Card/Card';

const profile = (props) => {
    
    let userData = props.user.get(props.owner);
    let avatar_url = userData.avatar_url;
    let bio = userData.bio;
    let blog =  userData.blog;
    let created_at = userData.created_at;
    let email = userData.email;
    let location = userData.location;
    let login = userData.login;
    let name = userData.name;
    let url = userData.url;

    return(
        <div style={{marginTop: '20px'}}>
            <Card 
                width='25rem' 
                heigth='100rem'
                avatar_url={avatar_url}
                bio={bio}
                blog={blog}
                created_at={created_at}
                email={email}
                location={location}
                login={login}
                name={name}
                url={url}
                />
        </div>
    );
}

export default profile;