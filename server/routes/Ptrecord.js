const express = require('express');
const router = express.Router();
const { Patientlist } = require('../models');
const { Op } = require("sequelize");
const { validateToken } = require('../middlewares/AuthMiddleware');

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
    }else{
        res.json(lastPtData);
    }
});

router.post("/updatept", validateToken, async(req, res) => {
    const ptdata = req.body;
    let branchid = ptdata.branchid
    console.log(branchid)
    await Patientlist.update(ptdata, {
        where: {
            branchid: branchid
        }
    })
    res.send();
})

router.post("/addpatient", validateToken, async (req, res) => {
    const ptdata = req.body;
    await Patientlist.create(ptdata);
    res.json(ptdata);

});

router.post("/findpatient", async (req, res) => {
    const ptdata = req.body;

    // IF FNAME ONLY
    if(ptdata.lastname === ''){
        const result = await Patientlist.findAll({
            where:{
                firstname:{
                    [Op.substring]: ptdata.firstname
                }
            }
        })
        res.json(result);
    } else
    if(ptdata.firstname === ''){
        const result = await Patientlist.findAll({
            where:{
                lastname:{
                    [Op.substring]: ptdata.lastname
                }
            }
        })
        res.json(result);
    } else
    {
        const result = await Patientlist.findAll({
            where:{
                lastname:{
                    [Op.substring]: ptdata.lastname
                },
                firstname:{
                    [Op.substring]: ptdata.firstname
                }
            }
        })
        res.json(result);
    }
});

router.get("/findpatientById/:branchid", async (req, res) => {
    const branchid = req.params.branchid;
    const result = await Patientlist.findOne({
        where: {
            branchid: branchid
        }
    })
    res.json(result);
})

router.get("/findpatient/:name", async (req, res) => {
    const rawdata = req.params.name;

    let dataArray = rawdata.split(',');

    let ptdata = {
        lastname: dataArray[0],
        firstname: dataArray[1]
    }

    // IF FNAME ONLY
    if(ptdata.lastname === ''){
        const result = await Patientlist.findAll({
            where:{
                firstname:{
                    [Op.substring]: ptdata.firstname
                }
            }
        })
        res.json(result);
    } else
    if(ptdata.firstname === ''){
        const result = await Patientlist.findAll({
            where:{
                lastname:{
                    [Op.substring]: ptdata.lastname
                }
            }
        })
        res.json(result);
    } else
    {
        const result = await Patientlist.findAll({
            where:{
                lastname:{
                    [Op.substring]: ptdata.lastname
                },
                firstname:{
                    [Op.substring]: ptdata.firstname
                }
            }
        })
        res.json(result);
    }
});


module.exports = router