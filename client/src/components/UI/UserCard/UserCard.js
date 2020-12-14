import React from 'react';

import { Card, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const userCard = (props) => {

    let date = new Date(props.created_at)

    return(
        <Card style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: `${props.width}`, height: `${props.height}`, margin: '0 10px 10px 10px' }}>
            <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                <Image src={props.avatar_url} style={{height:'100px', width:'100px', margin:'10px 14px 0px 21px' }} thumbnail fluid/>
                <h5>{props.login}</h5>
            </Card.Body>
            <Card.Body style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                {console.log('------------------------>',props.login, props.owner)}
            {props.login === props.owner ? 
                        (<Link 
                            to={{
                                pathname: '/home' }}> View Profile</Link>) : 
                        (<Link to={{
                                pathname: '/getUser',
                                state: {
                                    login: `${props.login}`,
                                    type: 'search'
                                }
                            }} variant="light"> View Profile </Link>)}
            </Card.Body>
        </Card>
    );
}

export default userCard;