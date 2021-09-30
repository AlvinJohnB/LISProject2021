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


//Prev Transactions
router.get("/trx/prev/:pID", async (req, res) => {
    const pID = req.params.pID

    const year = new Date().getFullYear()
    const month =  new Date().getMonth()-5

    const orders = await Patientlist.findAll({
        where: {
            branchid: pID
        },
        include: [
            {model: Orders,  order: [
                ['id', 'DESC']
        ],
                where: {
                    createdAt:{[Op.between]: [new Date(year, month, 1, 0, 0, 0, 0), new Date()]
            }}
        }
        ]
    })
    res.json(orders);
})


router.get("/getorders", async (req, res) => {

    const year = new Date().getFullYear()
    const month =  new Date().getMonth()

    const orders = await Orders.findAll(
        {
            where: {
                status: "PENDING",
                createdAt: {
                    [Op.between]: [new Date(year, month, 1, 0, 0, 0, 0), new Date()]
                }
            },
            order: [
                ['id', 'DESC']
            ]
            ,
            include: {model: Patientlist}
        }
    );
    res.json(orders);
})

router.post("/filter", async (req, res) => {
    const labNumber = req.body.labNumber

    const orders = await Orders.findAll(
        {
            where: {
                labNumber: labNumber,
            },
            include: {model: Patientlist}
        }
    );
    res.json(orders);
})

router.get("/getorder/:labNumber", validateToken, async (req, res) => {
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
            where: {
                status: {[Op.not]:["DELETED", "RELEASED"]}
            },
            include: [
                {model: Patientlist},
                {model: Sectionorders,
                where: {
                    section: section,
                    status: ["FOR CHECK-IN", "Sample rejected - For Check-in"]
                }},
               ]
        }
    );
    res.json(orders);
})

router.get("/forcheckin/:section/:labnumber", async (req, res) => {
    const section = req.params.section;
    const labNumber = req.params.labnumber

    const orders = await Orders.findAll(
        {
            where: {
                status: {[Op.not]:["DELETED", "RELEASED"]},
                labNumber: labNumber
            },
            include: [
                {model: Patientlist},
                {model: Sectionorders,
                where: {
                    section: section,
                    status: ["FOR CHECK-IN", "Sample rejected - For Check-in"]
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
        TestslistId: TestslistId.id,
        isQuali: TestslistId.isQuali,
        options: TestslistId.options
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

router.get("/section/:section/:labNumber", async (req, res) => {
    const section = req.params.section;
    const labNumber = req.params.labNumber
    const orders = await Orders.findAll(
        {
            where: {labNumber: labNumber},
            include: [
                {model: Patientlist},
                {model: Sectionorders,
                where: {
                    section: section,
                }},
               ]
        }
    );
    res.json(orders);
})

router.get("/resultform/:labnumber/:section", async (req, res) => {
    const labnumber = req.params.labnumber;
    const section = req.params.section;

    const data = await  Orders.findAll(
        {
            where: {labNumber: labnumber},
            include:[
                {model: Patientlist},
                {model: Sectionorders, where:{section: section}, include:[{model: Sectionresults, include: [{model: Testslist, include:[{model: Referencevalues}]}]}]},
            ]
        }
    )
    res.json(data);
})

//Update Result
router.post("/result/update/:sectionResultID/:result", validateToken, async (req, res) => {
    const sectionResultID = req.params.sectionResultID;
    const result = req.params.result;
    const username = req.user.username;

    await Sectionresults.update({
        result: result,
        releasedBy: username
    }, {
        where: {
            id: sectionResultID
        }
    })

    res.json({msg: "Record Saved"});
})

//Release Rx
router.post("/result/release/:sectionOrderID/:status",validateToken, async (req, res) => {
    const sectionOrderID = req.params.sectionOrderID;
    const status = req.params.status;
    const pathologist = req.body.pathologist
    const username = req.user.username

    await Sectionorders.update({
        status: status,
        pathologist: pathologist,
        releasedBy: username
    }, {
        where: {
            id: sectionOrderID
        }
    })
    res.send();
})

// UndoCheck-In, Delete Order, Archive
router.post("/labno/update", async (req, res) => {
    const labNumber = req.body.labNumber;
    const status = req.body.status;

    await Orders.update({
        status: status,
    }, {
        where: {
            labNumber: labNumber
        }
    })
    res.send();
})

//Check if completed
router.post("/check/:labNumber", async (req, res) => {
    const labNumber = req.params.labNumber;

    let done;
    let secorders;

    const queryOne = await Orders.findOne( {
        where: {
            labNumber: labNumber
        },
        include:[{model: Sectionorders}]
    })

    secorders = queryOne.Sectionorders.length
    // res.json(queryOne.Sectionorders.length);

    const queryTwo = await Orders.findOne({
        where: {
            labNumber: labNumber
        },
        include:[{model: Sectionorders, where:{status: "RELEASED"}}]
    })
    // res.json(queryTwo)

    if(queryTwo == null){
        done = 0
    }else{
        done = queryTwo.Sectionorders.length
    }

    if(done / secorders == 1){
        await Orders.update({
            status: "RELEASED"
        }, {where: {
            labNumber: labNumber
        }})
        res.send();
    }else{
        await Orders.update({
            status: "PENDING"
        }, {where: {
            labNumber: labNumber
        }})
        res.send();
    }
})

//Previous result
router.get("/result/previous/:ptID/:section", async (req, res) => {
    const id = req.params.ptID;
    const section = req.params.section;

    const presult = await Orders.findAll({
        order: [
            ['updatedAt', 'DESC']
        ],
        where:{ forPtId: id },
        limit: 5,
        include:[
            {model: Patientlist},
            {model: Sectionorders, where:{status: "RELEASED", section: section}, include: [{model: Sectionresults, include:[{model: Testslist, include:[{model: Referencevalues}]}]}]}]
    })
    res.json(presult);
})
module.exports = router

//Find order by ID
router.get("/results/findByID/:section/:orderID", async (req, res) => {
    const orderId = req.params.orderID;
    const section = req.params.section;

    const result = await Orders.findOne({
        where:{ id: orderId },
        include:[
            {model: Patientlist},
            {model: Sectionorders, where:{status: "RELEASED", section: section}, include: [{model: Sectionresults, include:[{model: Testslist, include:[{model: Referencevalues}]}]}]}]
    })
    res.json(result);
})