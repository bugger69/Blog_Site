import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

import SiteNavbar from "../UI/Navbar";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        // get all user blogs
        axios
          .get("http://localhost:5000/", {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          })
          .then((res) => {
            console.log(res);
            setUserData(res.data);
          })
          .catch((e) => console.log(e));
      }
    }
  }, [setUserData]);

  console.log(userData.userBlogs);
  return (
    <React.Fragment>
      <SiteNavbar />
      <Card>
        <Card.Title>Dashboard</Card.Title>
        {userData.userBlogs ? (
          userData.userBlogs.map((blog) => {
            return <Card.Link href={`blog/${blog._id}`}>{blog.title}</Card.Link>;
          })
        ) : (
          <Card.Title>Oops! You haven't written anything yet ''</Card.Title>
        )}
      </Card>
    </React.Fragment>
  );
};

export default Dashboard;
