import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import AllBlogs from './components/AllBlogs';
import BlogDetails from './components/BlogDetails';
import Register from './components/Register';
import Login from './components/Login';
import CreateBlog from './components/CreateBlogForm';
import EditBlog from './components/EditBlogForm';

function App() {
  let routes = useRoutes([
    {path: "/", element: <Home />},
    {path: "/blogs/new", element: <CreateBlog />},
    {path: "/blogs/new/:blogID", element: <EditBlog />},
    {path: "/blogs/:blogID", element: <BlogDetails />},
    {path: "/blogs", element: <AllBlogs />}, 
    {path: "/register", element: <Register />},
    {path: "/login", element: <Login />}
  ]);

  return (
    routes
  );
}

const AppWrapper = () => {
  return <Router>
    <App />
  </Router>
}

export default AppWrapper;

