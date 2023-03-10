import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

import Blog from "../Blog";
import SiteNavbar from "../UI/Navbar";
import ErrorHandler from "../ErrorHandler";

const AllBlogs = (props) => {
  const [Blogs, setBlogs] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasmore] = useState(true);
  const [error, setError] = useState(false);
  let isLoading = false;

  const fetchData = async (pageNo) => {
    if (isLoading || !hasMore) {
      return;
    }
    isLoading = true;
    await axios
      .get(`http://localhost:5000/blogs/pages?pageNo=${pageNo}`) // TODO: USE ENVIRONMENT VARIABLES HERE.
      .then((res) => {
        if (!res.data || res.data.length === 0) {
          setHasmore(false);
        } else {
          setBlogs((prevState) => {
            const arr = [...prevState, ...res.data];
            return arr;
          });
          isLoading = false;
        }
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        isLoading = false;
      });
  };

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && !isLoading && hasMore) {
      setPageNo((prevValue) => {
        return prevValue + 1;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [Blogs]);

  useEffect(() => {
    if (hasMore) {
      fetchData(pageNo);
    }
  }, [pageNo, hasMore]);

  if(error !== false) {
    return <Container>
      <SiteNavbar />
      <ErrorHandler message={error.response.status} statusmsg={error.response.statusText} data={error.response.data.msg} />
    </Container>
  }

  return (
    <React.Fragment>
      <SiteNavbar />
      <Container>
        {Blogs.map((blog) => (
          
            <Blog key={blog._id} title={blog.title} ImageURL={blog.ImageURL} _id={blog._id} username={blog.author.username} />
          
        ))}
        {isLoading ? <h6>Loading...</h6> : <React.Fragment></React.Fragment>}
        {!hasMore ? (
          <h6>Looks like that's all we had..</h6>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Container>
    </React.Fragment>
  );
};

export default AllBlogs;
