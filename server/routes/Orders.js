const express = require('express');
const router = express.Router();
const { Orders, Sectionorders, Patientlist, Orderlist, Sectionresults, Sectionorderlist, Testslist, Referencevalues } = require('../models');
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
    const test = req.body.test;

    //Get TestlistId
    const TestslistId = await Testslist.findOne({
        where: {testcode: test}
    })

    await Sectionresults.create({
        test: test,
        TestslistId: TestslistId.id
    });

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

router.get("/resultform/:labnumber", async (req, res) => {
    const labnumber = req.params.labnumber;

    const data = await  Orders.findAll(
        {
            where: {labNumber: labnumber},
            include:[
                {model: Patientlist},
                {model: Sectionorders, where:{section: "Chemistry"}, include:[{model: Sectionresults, include: [{model: Testslist, include:[{model: Referencevalues}]}]}]},
            ]
        }
    )
    res.json(data);
})

//Update Result
router.post("/result/update/:sectionResultID/:result", async (req, res) => {
    const sectionResultID = req.params.sectionResultID;
    const result = req.params.result;

    await Sectionresults.update({
        result: result
    }, {
        where: {
            id: sectionResultID
        }
    })

    res.json({msg: "Record Saved"});
})

//Release Rx
router.post("/result/release/:sectionOrderID/:status", async (req, res) => {
    const sectionOrderID = req.params.sectionOrderID;
    const status = req.params.status;

    await Sectionorders.update({
        status: status
    }, {
        where: {
            id: sectionOrderID
        }
    })

    res.send();
})

//Previous result
router.get("/result/previous/:ptID/:section", async (req, res) => {
    const id = req.params.ptID;
    const section = req.params.section;

    const presult = await Patientlist.findOne({
        where:{ id: id },
        include:[{ model: Orders, include:[{model: Sectionorders, where:{status: "RELEASED", section: section}, include: [{model: Sectionresults}], limit: 5}] }]
    })
    res.json(presult);
})
module.exports = router