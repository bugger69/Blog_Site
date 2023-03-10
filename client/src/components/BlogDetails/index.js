import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import Blog from "../Blog";
import SiteNavbar from "../UI/Navbar";
import ErrorHandler from "../ErrorHandler";
import CommentForm from "../CommentForm";
import Comment from "../Comment";

const BlogDetails = (props) => {
  const { blogID } = useParams();
  const [impBlog, setBlog] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blogs/${blogID}`) // TODO: USE ENVIRONMENT VARIABLES HERE.
      .then((blog) => {
        console.log(blog.data);
        setBlog(blog.data);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      });
  }, [setBlog]);

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
      <Container className="w-40 mx-auto mr-auto mb-3">
        <Blog
          title={impBlog.title}
          ImageURL={impBlog.ImageURL}
          content={impBlog.content}
          _id={blogID}
          username={impBlog.author_username}
          setError={setError}
        />
        <CommentForm blogID={blogID} />
          {impBlog.comments?impBlog.comments.map((comment) => 
            // <li>{comment.content} -{comment.author.username}</li>
            <Comment content={comment.content} author={comment.author.username}></Comment>
          ) : <React.Fragment></React.Fragment>}
      </Container>
    </React.Fragment>
  );
};

export default BlogDetails;
