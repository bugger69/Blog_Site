const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

// get

// router.get();

// register

router.post("/register", async (req, res) => {
    try {
        if(!req.body.username || !req.body.password || !req.body.email) {
            throw new Error("Enter all data");
        }
        const oldUser = await User.findOne({email: req.body.email});
        if (oldUser) {
            throw new Error("User already exists");
        }

        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: encryptedPassword
        }); 
        res.status(201).json({status:'success', user: 'registered'});
    } catch (e) {
        console.log(e);
        res.status(400).json({status: 'error', error: 'An Error Occured'});
    }
});

//login

router.post("/login", async (req, res) => {
    try {
        const obj = {};
        if(req.body.email) {
            obj.email = req.body.email;
        } else if (req.body.username) {
            obj.username = req.body.username;
        } else {
            throw new Error("No Username or email");
        }
        const user = await User.findOne(obj);
        if(user && await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({
                username: user.username,
                email: req.body.email,
                uid: user._id
            }, process.env.JWT_SECRET || 'secret123', {expiresIn: '2h'})
            res.json({status: "ok", token: token, username: User.username});
        } else {
            throw new Error("No user found with matching email and password.");
        }
    } catch (e) {
        console.log(e);
        res.status(401).json({status: 'error', user: false});
    }
});

// update

router.put("/user/:uid", isLoggedIn, async (req, res, next) => {
    try {
        if(req.params.uid !== req.user.uid) {
            throw new Error("Users do not match");
        }
        const obj = {};
        if(req.body.email) {
            obj.email = req.body.email;
        }
        if(req.body.username) {
            obj.username = req.body.username;
        }
        if(req.body.password) {
            const encryptedPassword = await bcrypt.hash(req.body.password, 10);
            obj.password = encryptedPassword;
        }
        await User.findByIdAndUpdate(req.params.uid , obj);
        res.status(200).json({msg: "user updated"});
    } catch (e) {
        console.log(e);
        res.status(401).json({status: 'error', msg : 'unable to update or users do not match'})
    }
} );

// delete

// router.delete();

module.exports = router;