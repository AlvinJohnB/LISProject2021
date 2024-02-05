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

router.get("/test/:testcode", async (req, res) => {
    let test = req.params.testcode
    let testdata = await Testslist.findOne({where:{testcode: test}});
    res.json(testdata);

});


module.exports = router