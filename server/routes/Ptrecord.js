const express = require('express');
const router = express.Router();
const { Patientlist } = require('../models');

router.get("/", async (req, res) => {
    const listOfPatients = await Patientlist.findOne({
        order: [
            ['id', 'DESC']
        ]
    });
    res.json(listOfPatients);
});

router.post("/addpatient", async (req, res) => {
    const ptdata = req.body;
    await Patientlist.create(ptdata);
    res.json(ptdata);
});

router.post("/findpatient", async (req, res) => {
    const data = req.body
    const result = await Patientlist.count({
        where:{
            lastname: data.lastname,
            firstname: data.firstname
        }
    })
    res.json(result);
});

module.exports = router