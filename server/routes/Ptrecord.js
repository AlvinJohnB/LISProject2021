const express = require('express');
const router = express.Router();
const { Patientlist } = require('../models');

router.get("/", async (req, res) => {
    const ptBkData = {
        "lastname": "",
        "firstname": "",
        "branchid": "",
        "id": 0
    }
    const lastPtData = await Patientlist.findOne({
        order: [
            ['id', 'DESC']
        ]
    });
    if(lastPtData == null){
        res.json(ptBkData);
    }
    res.json(lastPtData);
});

router.post("/addpatient", async (req, res) => {
    const ptdata = req.body;
    await Patientlist.create(ptdata);
    res.json(ptdata);
});

router.post("/findpatient", async (req, res) => {
    const data = req.body    
    const result = await Patientlist.findAll({
        where:{
            lastname: data.lastname,
            firstname: data.firstname
        }
    })
    res.json(result);

});

module.exports = router