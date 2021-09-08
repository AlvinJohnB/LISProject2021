const express = require('express');
const router = express.Router();
const { Orders, Sectionorders, Patientlist, Orderlist, Sectionresults, Sectionorderlist } = require('../models');
const { Op } = require("sequelize");
const { validateToken } = require('../middlewares/AuthMiddleware');


router.get("/", async (req, res) => {

    const orderBkData = {
        "testRequested": "",
        "reqDr": "",
        "forPtId": "",
        "id": 0
    }

    const lastOrderData = await Orders.findOne({
        order: [
            ['id', 'DESC']
        ]
    });

    if(lastOrderData == null){
        res.json(orderBkData);
    }else{
        res.json(lastOrderData);
    }
});

router.get("/getorders", async (req, res) => {
    const orders = await Orders.findAll(
        {
            where: {
                status: "PENDING"
            },
            include: {model: Patientlist}
        }
    );
    res.json(orders);
})

router.get("/getorder/:labNumber", async (req, res) => {
    const labNumber = req.params.labNumber;
    const orders = await Orders.findAll(
        {
            where: {
                labNumber: labNumber
            },
            include: [
                {model: Sectionorders},
                {model: Patientlist}]
        }
    );
    res.json(orders);
})

router.get("/getorder/id/:orderid/:section", async (req, res) => {
    const orderid = req.params.orderid;
    const section = req.params.section;
    const orders = await Orders.findAll(
        {
            where: {
                id: orderid,
            },
            include: [
                {model: Sectionorders, where:{section: section}},
                {model: Patientlist}]
        }
    );
    res.json(orders);
})

router.get("/forcheckin/:section", async (req, res) => {
    const section = req.params.section;
    const orders = await Orders.findAll(
        {
            include: [
                {model: Patientlist},
                {model: Sectionorders,
                where: {
                    section: section,
                    status: "FOR CHECK-IN"
                }},
               ]
        }
    );
    res.json(orders);
})

router.post("/updatesorder", validateToken, async(req, res) => {
    const status = req.body.status;
    let sectnumber = req.body.sectNumber;
    await Sectionorders.update({status: status}, {
        where: {
            sectNumber: sectnumber
        }
    })
    res.send();
})

router.get("/sectorders", async (req, res) => {
    //const section = req.params.section;
    const sectorders = await Sectionorders.findAll(
        {
            where:{section: "CM"},
            include: [
                {model: Sectionresults}
               ]
        }
    );
    res.json(sectorders);
})


router.post("/addorder", validateToken, async (req, res) => {
    const orderdata = req.body;
    const username = req.user.username;
    orderdata.encodedBy = username;

    await Orders.create(orderdata);
    res.json(orderdata);

});

router.post("/addsord", validateToken, async (req, res) => {
    const sectorderdata = req.body;
    const username = req.user.username;
    sectorderdata.updatedBy = username;

    await Sectionorders.create(sectorderdata);
    res.json(sectorderdata);

});

router.post("/cnxtion", validateToken, async (req, res) => {
    const data = req.body;
    await Orderlist.create(data);
    res.json(data);

});

// RESULTS
router.post("/form/result/create/:secreqID", validateToken, async (req, res) => {
    const secreqID = req.params.secreqID;
    const test = req.body;

    await Sectionresults.create(test);


    const lastRxData = await Sectionresults.findOne({
        order: [
            ['id', 'DESC']
        ]
    });

    if(lastRxData == null){
        await Sectionorderlist.create({
            SectionresultId: 1,
            SectionorderId: secreqID,
        });
    }else{
        await Sectionorderlist.create({
            SectionresultId: lastRxData.id,
            SectionorderId: secreqID,
        });    
        console.log(lastRxData.id)
    }
    res.send();
});

//SectionData
router.get("/section/:section", async (req, res) => {
    const section = req.params.section;
    const orders = await Orders.findAll(
        {
            include: [
                {model: Patientlist},
                {model: Sectionorders,
                where: {
                    section: section,
                    status: "RUNNING"
                }},
               ]
        }
    );
    res.json(orders);
})

router.get("/resultform/", async (req, res) => {
    const section = req.params.section;

    const data = await  Sectionorders.findAll(
        {
            include: [
                {model: Sectionresults, include: [{model: Orders}]},
            ]
        }
    )
    // const orders = await Orders.findAll(
    //     {
    //         include: [
    //             {model: Patientlist},
    //             {model: Sectionorders,
    //             where: {
    //                 section: section,
    //                 status: "RUNNING"
    //             }},
    //            ]
    //     }
    // );
    res.json(data);
})

module.exports = router