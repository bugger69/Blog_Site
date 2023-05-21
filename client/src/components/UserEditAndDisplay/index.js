import React, { useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

import SiteNavbar from "../UI/Navbar";

// turn this into a user edit form later

const UserEditDisplay = () => {

  const [userData, setUserData ] = useState({});
  const token = localStorage.getItem("token");

  axios.get("http://localhost:5000/", {
    headers: { "Content-Type": "application/json", "x-access-token": token },
  }).then((res) => {
    console.log(res);
    setUserData(res.data);
  }).catch(e => console.log(e));

  return (
    <React.Fragment>
      <SiteNavbar />
      <Card className="mt-3">
        {userData.user? <Card.Title> Username: {userData.user.username}</Card.Title>: <Card.Title>No user found :P</Card.Title>}
      </Card>
    </React.Fragment>
  );
};

export default UserEditDisplay;
