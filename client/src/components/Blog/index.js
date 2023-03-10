import React, { useParams } from "react";
import axios from "axios";
import { Card, Button, Container } from "react-bootstrap";

const Blog = (props) => {
  // TODO: REFACTOR

  const token = localStorage.getItem("token");
  // console.log(token);
  // const { blogID } = useParams();

  const onDelete = (e) => {
    e.preventDefault();
    console.log(props._id);
    axios
      .delete(`http://localhost:5000/blogs/${props._id}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        console.log(res);
        window.location.href = "/blogs";
      })
      .catch((e) => {
        console.log(e);
        props.setError(e);
      });
  };

  // console.log(props.username);
  

  const base64Url = token ? token.split('.')[1] : "";
  const base64 = token? base64Url.replace(/-/g, '+').replace(/_/g, '/') : "";
  const decodedData = token? JSON.parse(atob(base64)) : "";
  const username =token? decodedData.username: "";

  // console.log(username);
  // console.log(localStorage.getItem("token"));

  return (
    <Card>
      <Card.Img
        style={{ maxHeight: "500px" }}
        variant="top"
        src={props.ImageURL}
      />
      <Card.Body className={props.content ? "" : "d-inline-flex w-100"}>
        {props.content ? (
          <Card.Title>{props.title}</Card.Title>
        ) : (
          <React.Fragment>
            <a href={`blogs/${props._id}`} className="">
              <h1 className="">{props.title}</h1>
            </a>
            <p
              style={{ display: "inline-block" }}
              className="d-inline-block mt-auto mb-auto ms-auto !important"
            >
              -{props.username}
            </p>
          </React.Fragment>
        )}
        {props.content ? (
          <Card.Subtitle>-{props.username}</Card.Subtitle>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        {props.content ? (
          <Card.Text>{props.content}</Card.Text>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Card.Body>
      {/* {props.content && token? (
        <Card.Footer>
          <Card.Link href={`new/${props._id}`}>Edit Blog</Card.Link>
          <DeleteBlog />
        </Card.Footer>
      ) : (
        <React.Fragment></React.Fragment>
      )} */}
      {props.content &&
      token &&
      props.username === username ? (
        <Card.Footer>
          <Card.Link href={`new/${props._id}`}>Edit Blog</Card.Link>
          <Button variant="danger" type="submit" onClick={onDelete}>
            Delete
          </Button>
        </Card.Footer>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </Card>
  );
};

export default Blog;
