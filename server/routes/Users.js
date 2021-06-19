const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const { Op } = require("sequelize");
const { response } = require('express');


router.post("/register", async (req, res) => {
    const userdata = req.body;
    await Users.create(userdata);
    res.json(userdata);

});

router.post("/login", async (req, res) => {
    const userdata = req.body;
    const username = userdata.username;
    const password = userdata.password;

    const userSearchRes = await Users.findOne({ where: {username: username} });

    //Check
    if(userSearchRes === null){
        let msg = {msg: "No user found!"};
        res.json(msg);
    }else{
        if(password === userSearchRes.password){
            let msg = {msg: "You logged in!"}
            res.json(msg);
        }else{
            let msg = {msg: "Wrong password/username combination!"}
            res.json(msg);
        }
    }

});



module.exports = router