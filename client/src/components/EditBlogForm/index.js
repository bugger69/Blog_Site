import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

import SiteNavbar from "../UI/Navbar";
import ErrorHandler from "../ErrorHandler";

const EditBlog = (props) => {
  const { blogID } = useParams();

  const [title, setTitle] = useState("");
  const [Blog, setBlog] = useState("");
  const [Image, setImage] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/blogs/${blogID}`).then((blog) => {
      setTitle(blog.data.title);
      setBlog(blog.data.content);
    });
  }, [setTitle, setBlog]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("title", title);
    data.append("titleImage", Image);
    data.append("content", Blog);
    data.append("token", token);

    axios
      .put(`http://localhost:5000/blogs/${blogID}`, data, {
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

  console.log(title, Blog);

  if (error !== false) {
    return (
      <Container>
        <SiteNavbar />
        <ErrorHandler
          message={error.response.status}
          statusmsg={error.response.statusText}
          data={error.response.data.msg}
        />
      </Container>
    );
  }

  return (
    <React.Fragment>
      <SiteNavbar />
      <Container>
        <h3 className="mb-2">Edit Blog</h3>
        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label htmlFor="title">Title:</Form.Label>
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
            placeholder=""
            value={Blog}
            onChange={(e) => setBlog(e.target.value)}
          />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default EditBlog;
