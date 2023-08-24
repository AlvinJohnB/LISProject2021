const express = require('express');
const router = express.Router();
const { Patientlist, Diagnosis } = require('../models');
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

//ADD DIAGNOSIS
router.post("/dx-add", validateToken, async(req, res) => {
    const data = req.body;
    const name = req.user.username
    
    await Diagnosis.create({
        ptID: data.ptID,
        diagnosis: data.diagnosis,
        inputBy: name
    })

    res.send();
})

//Fetch Dx
router.get("/fetch-dx/:ptID", async (req, res) => {
    const ptID = req.params.ptID;
    // res.send(ptID)
    const result = await Diagnosis.findAll({
        where: {
            ptID: ptID
        }
    })
    res.json(result);
})

//DeleteDx
router.get("/dx-delete/:id", validateToken, async (req, res) => {
    const dxID = req.params.id

    await Diagnosis.destroy({
        where: {
            id: dxID
        }
    })

    res.json()
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