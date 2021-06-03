const express = require('express');
const router = express.Router();
const { Testslist } = require('../models');
const { Op } = require("sequelize");


router.get("/", async (req, res) => {
    let testsdata = await Testslist.findAll();
    res.json(testsdata);

});



module.exports = router