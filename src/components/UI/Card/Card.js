import React from 'react';

import { Card, Button, Image } from 'react-bootstrap';


const card = (props) => {

    let date = new Date(props.created_at)

    return(
        <Card style={{ width: `${props.width}`, height: `${props.height}` }}>
            <Image src={props.avatar_url} style={{height:'300px', width:'300px', margin:'10px 14px 0px 21px' }} thumbnail fluid/>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>{props.login}</Card.Text>
                <Card.Text>{props.bio}</Card.Text>
                <Card.Text><img src="https://img.icons8.com/plasticine/100/000000/place-marker.png" width="20px" height="20px"/>{props.location}</Card.Text>
                <Card.Text><img src="https://img.icons8.com/fluent/48/000000/filled-message.png" width="20px" height="20px"/>{' '}{props.email}</Card.Text>
                <Card.Text>Member Since: {date.toLocaleString('default', { month: 'short' })}' {date.getFullYear()}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default card;