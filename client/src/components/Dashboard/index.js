import React, {useEffect} from "react";
import jwt from 'jsonwebtoken';
import {useHistory} from 'react-router-dom';
import SiteNavbar from "../UI/Navbar";

const Dashboard = () => {
    const history = useHistory();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            const user = jwt.decode(token);
            if(!user) {
                localStorage.removeItem('token');
                history.replaceState('/login');
            } else {
                // get all user blogs
            }
        }
    }, [])
    return <React.Fragment>
        <SiteNavbar />
    </React.Fragment>
}

export default Dashboard;