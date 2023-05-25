import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

import SiteNavbar from "../UI/Navbar";

// turn this into a user edit form later

const getDateFromString = str => { // fix this asap
  // const [date,time] = str.split(" ");
  // // reformat string into YYYY-MM-DDTHH:mm:ss.sssZ
  // str = `${date}T${time}.000Z`
  return new Date(str);
};

const UserEditDisplay = () => {
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
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
  }, [setUserData]);

  if(userData.user)console.log(userData.user.date_of_joining, getDateFromString(userData.user.date_of_joining).getDate())

  return (
    <React.Fragment>
      <SiteNavbar />
      <Card className="mt-3 mx-3">
        {userData.user ? (
          <Card.Text className="mx-2">
            Username: {userData.user.username}
          </Card.Text>
        ) : (
          <Card.Text>No user found :P</Card.Text>
        )}
        {userData.user ? <Card.Text className="mx-2" >Date of Joining: {getDateFromString(userData.user.date_of_joining).getDate()}</Card.Text>: <React.Fragment></React.Fragment>}
        {userData.user ? <Card.Text className="mx-2" >Email: {userData.user.email}</Card.Text>: <React.Fragment></React.Fragment>}
        {userData.user ? <Card.Footer><Button>Dashboard</Button></Card.Footer>: <React.Fragment></React.Fragment>}
      </Card>
    </React.Fragment>
  );
};

export default UserEditDisplay;
