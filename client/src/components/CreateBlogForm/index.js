import axios from "axios";
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import SiteNavbar from "../UI/Navbar";
import ErrorHandler from "../ErrorHandler";

const CreateBlog = (props) => {
  const [title, setTitle] = useState("");
  const [Blog, setBlog] = useState("");
  const [Image, setImage] = useState();
  const [error, setError] = useState(false);

  const token = localStorage.getItem("token");

  if(!token) window.location.href = "/login";

  const onSubmit = async (e) => {
    e.preventDefault();

    // const obj = {title: title, titleImage: Image, content: Blog, token: token};

    const data = new FormData();
    data.append("title", title);
    data.append("titleImage", Image);
    data.append("content", Blog);
    data.append("token", token);

    console.log(Image);

    axios
      .post("http://localhost:5000/blogs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((blog) => {
        console.log(blog);
        window.location.href = "/";
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      });
  };

  if (error !== false) {
    return (
      <Container>
        <SiteNavbar />
        <ErrorHandler
          message={error.response.status}
          statusText={error.response.statusText}
          data={error.response.data.msg}
        />
      </Container>
    );
  }
  // use handleInputChange function
  return (
    <React.Fragment>
      <SiteNavbar />
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label htmlFor="title">Blog Title:</Form.Label>
            <Form.Control
              id="title"
              type="text"
              placeholder=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formImageUpload">
            <Form.Label htmlFor="fileInput">Title Image: </Form.Label>
            <Form.Control id="fileInput" type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label htmlFor="Blog">Content:</Form.Label>
            <Form.Control
              as="textarea"
              id="Blog"
              type="text-box"
              rows="20"
              placeholder=""
              value={Blog}
              onChange={(e) => setBlog(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Post</Button>
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default CreateBlog;
