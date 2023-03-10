import React from "react";
import { Card } from "react-bootstrap";

const ErrorHandler = (props) => {
    return <React.Fragment>
        <Card>
            <Card.Body>
                <Card.Title>{props.message} {props.statusText}</Card.Title>
                <Card.Text>{props.data}</Card.Text>
                <Card.Link href="/">Back to Home</Card.Link>
            </Card.Body>
        </Card>
    </React.Fragment>
}

export default ErrorHandler;