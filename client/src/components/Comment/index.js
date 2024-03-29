import React from 'react';
import { Card } from 'react-bootstrap';

const Comment = (props) => {
    return <Card>
        <Card.Body>
            <Card.Title>{props.content}</Card.Title>
            <Card.Text>-{props.author}</Card.Text>
        </Card.Body>
    </Card>
}

export default Comment;
