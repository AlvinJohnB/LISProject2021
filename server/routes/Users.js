const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const { Op } = require("sequelize");
const { response } = require('express');

const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/AuthMiddleware');

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
            // let msg = {msg: "You logged in!"}
            // res.json(msg);
            const accessToken = sign(
                {username: userSearchRes.username, name: userSearchRes.name, id: userSearchRes.id},
                 "secretKey" );
            res.json(accessToken);

        }else{
            let msg = {msg: "Wrong password/username combination!"}
            res.json(msg);
        }
    }

});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
})


module.exports = router