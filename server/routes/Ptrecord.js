const express = require('express');
const router = express.Router();
const { Patientlist } = require('../models');

router.get("/", async (req, res) => {
    const listOfPatients = await Patientlist.findAll();
    res.json(listOfPatients);
});

router.post("/addpatient", async (req, res) => {
    const ptdata = req.body;
    await Patientlist.create(ptdata);
    res.json(ptdata);
});

module.exports = router