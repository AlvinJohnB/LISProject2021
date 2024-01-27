const express = require('express');
const router = express.Router();
const { Testslist, BPackage } = require('../models');
const { Op } = require("sequelize");


router.get("/", async (req, res) => {
    let testsdata = await Testslist.findAll({where:{show: true}});
    res.json(testsdata);

});

router.get("/pkg/:pkgname", async (req, res) => {
    let pkg = req.params.pkgname
    let pkgdata = await BPackage.findOne({where:{branchpackage: pkg}});
    res.json(pkgdata);

});


module.exports = router