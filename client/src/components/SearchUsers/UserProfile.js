import React from 'react';

import { Button } from 'react-bootstrap';
import Pagination from '../Pagination/Paginate';
import Card from '../UI/UserCard/UserCard';

const userProfile = (props) => {

    return(
        <div style={{display: 'flex', flexFlow: 'column', margin: '20px 400px 40px 400px'}}>
            <Button onClick={props.handleBack} style={{margin: '10px', width: '100px'}}> Go Back </Button>
                <Pagination 
                    lastPageNumber={props.lastPageNumber}
                    pageType='usersList'
                    userType='searchedUser' 
                    user={props.user}
                    fetchPageData={props.fetchPageData} />
                    
            {Object.values(props.usersList).map(user => {
                 return <Card 
                    avatar_url={user.avatar_url} 
                    login={user.login}
                    owner={props.owner}
                    loadProfile={props.loadUserProfile} />
            })}
        </div>
    );
}

export default userProfile;