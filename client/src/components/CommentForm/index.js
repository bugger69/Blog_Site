import React, {useState} from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from 'axios';

const CommentForm = (props) => {
    const [comment, setComment] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const obj = {token : token, content: comment};

        axios.post(`http://localhost:5000/blogs/comment/${props.blogID}`, obj)
        .then((comment) => {
          console.log(comment);
          window.location.href = `/blogs/${props.blogID}`;
        })
        .catch((e) => {
          console.log(e);
        });
    }

    return <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label htmlFor="Comment">Comment Here:</Form.Label>
          <Form.Control
            as="textarea"
            id="Comment"
            type="text-box"
            placeholder=""
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          </Form.Group>
          <Button type="submit">Comment</Button>
    </Form>
}

export default CommentForm;