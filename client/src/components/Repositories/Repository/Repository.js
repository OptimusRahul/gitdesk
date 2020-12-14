import React from 'react';

import { Card, Button } from 'react-bootstrap';

function calculateDateDifference(oldDate){
    const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const prevDate = new Date(oldDate);
    const diffDays = Math.round(Math.abs((currentDate - prevDate) / oneDay));
    return diffDays;
}

const repository = (props) => {
    return(
        <Card style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: `${props.width}`, height: `${props.height}`, margin: '0 10px 10px 10px' }}>
            <Card.Body style={{ flexDirection: 'column' }}>
                <h5>{props.name}</h5>
                {props.lang && props.lang.length ? props.lang[0] : 'No'}{' '} Updated {calculateDateDifference(props.updated_at)} days ago
            </Card.Body>
            <Card.Body style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                {/*props.type !== 'owner' ? <Button variant="light" style={{margin: '5px'}} onClick={() => props.loadForkURL(props.fork_url)}><img src="https://img.icons8.com/fluent/48/000000/code-fork.png" alt='fork' width="20px" height="20px" /></Button> : null*/}
                <Button title='google-chrome' variant="light" style={{margin: '5px'}} onClick={() => props.openChrome(props.url)}><img src="https://img.icons8.com/fluent/50/000000/chrome.png" alt='chrome' width="20px" height="20px" /></Button>                 
                <Button title='VS Code' variant="light"onClick={() => props.openVSCode(props.clone_url)}> <img src="https://img.icons8.com/fluent/48/000000/visual-studio-code-2019.png" alt='vscode' width="20px" height="20px" /> </Button>
            </Card.Body>    
        </Card>
    );
};

export default repository;