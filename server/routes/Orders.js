const express = require('express');
const router = express.Router();
const { Users, Package, Orders, Sectionorders, Patientlist, Orderlist, Sectionresults, Sectionorderlist, Testslist, Referencevalues } = require('../models');
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
                    createdAt:{[Op.between]: [new Date(year, month, 1, 0, 0, 0, 0), new Date()]},
                    status: {[Op.not]: "DELETED"}}
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
                createdAt: {
                    [Op.between]: [new Date(year, month, 1, 0, 0, 0, 0), new Date()]
                },
                status:{
                    [Op.not]: "DELETED"
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
    const name = req.user.name;
    orderdata.encodedBy = name
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

// RESULT CREATE ON CHECKIN
router.post("/form-create/:sectionID", validateToken , async (req, res) => {
    const secreqID = req.params.sectionID;
    const tests = req.body.tests

    const expTests = tests.split(" ");
    expTests.pop();

    
    const entryLoop = async () => {
        let sectionorder, result

        for(const test of expTests){
            const testsList = await Testslist.findOne({where: {testcode: test}})

            //Check If Package
            if(testsList.isPackage === true){

                // Find in Package Model
                const package = await Package.findOne({ where: {package: testsList.testcode}})

                //Split tests
                const tests = package.tests.split(",");

                // Loop through tests -- Find details on testsList tables
                for(const item of tests){
                    const detail = await Testslist.findOne({where: {testcode: item}})

                    // Create Database entry on every test
                    let data = {
                        test: detail.testcode ,
                        TestslistId: detail.id, 
                        isQuali: detail.isQuali,
                        options: detail.options,
                        sectionOrder: secreqID
                    }

                    await Sectionresults.create(data)
                    
                    await new Promise(resolve => (setTimeout(resolve, 500)))
                }
                
            }else{
                const detail = await Testslist.findOne({where: {testcode: test}})
                
                let data = {
                    test: detail.testcode ,
                    TestslistId: detail.id, 
                    isQuali: detail.isQuali,
                    options: detail.options,
                    sectionOrder: secreqID
                }
                await Sectionresults.create(data)

            }
            await new Promise(resolve => (setTimeout(resolve, 1000)))
        }



        // Make association

        await Sectionorders.findOne({where: {id: secreqID}})
            .then((data)=>{
                sectionorder = data
                return Sectionresults.findAll({where: {sectionOrder: secreqID}})
                    .then((data)=>{
                        result = data
                        sectionorder.addSectionresults(result)
      
                    })
       })

    }

    entryLoop().then(()=>{console.log(`CheckIn Done`)})
    
    
    res.send();
})

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

//Get results
router.get("/results/:orderID/:section", async (req, res) => {
    const orderID = req.params.orderID;
    const section = req.params.section;

    const data = await  Orders.findAll(
        {
            where: {id: orderID},
            include:[
                {model: Patientlist},
                {model: Sectionorders, where:{section: section}, include:[{model: Sectionresults, include: [{model: Testslist, include:[{model: Referencevalues}]}]}]},
            ]
        }
    )
    res.json(data);
})

//Get full results
router.get("/fullresults/:orderID", async (req, res) => {
    const orderID = req.params.orderID;

    const data = await  Orders.findAll(
        {
            where: {labNumber: orderID},
            include:[
                {model: Patientlist},
                {model: Sectionorders, include:[{model: Sectionresults, include: [{model: Testslist, include:[{model: Referencevalues}]}]}]},
            ]
        }
    )
    res.json(data);
})


//Update Result
router.post("/result/update/:sectionResultID", validateToken, async (req, res) => {
    const sectionResultID = req.params.sectionResultID;
    // const result = req.params.result;
    // const gender = req.params.gender;
    const result = req.body.result;
    const gender = req.body.gender;
    const username = req.user.username;
    

    // Find Test
    const sectionRes = await Sectionresults.findOne({where:{id: sectionResultID}})

    //Is Quali or Quanti?
    if(sectionRes.isQuali == true){
        // Get Ref Value
        const ref = await Referencevalues.findOne({where: {test: sectionRes.test}})

        const refLogic = (reference) => {
            if(result == reference){
                Sectionresults.update({
                    flag: "N/A"
                }, {
                    where: {
                        id: sectionResultID
                    }
                })
            }else{
                Sectionresults.update({
                    flag: "Abnormal"
                }, {
                    where: {
                        id: sectionResultID
                    }
                })
            }
        }

         if(gender == "Male"){
                // Check if result is Abnormal
                refLogic(ref.Male)
            }else{
                refLogic(ref.Female)
            }

    }else{


        // Find RefValue
        const RefValue = await Referencevalues.findOne({where: {test:sectionRes.test}}).then((res)=>{
            if(gender == "Male"){
                return res.mref
            }else{
                return res.fref
            }
        })

        let refArray = RefValue.split("-")
        
        if(parseFloat(result) > parseInt(refArray[0]) && parseFloat(result) < parseFloat(refArray[1])){
            await Sectionresults.update({
                flag: "N/A"
            }, {
                where: {
                    id: sectionResultID
                }
            })
        }
        
        // Decreased Logic
        if(parseFloat(result) < parseFloat(refArray[0])){
            await Sectionresults.update({
                flag: "Decreased"
            }, {
                where: {
                    id: sectionResultID
                }
            })
        }
        //Increased Logic
        if(parseFloat(result) > parseFloat(refArray[1])){
            await Sectionresults.update({
                flag: "Increased"
            }, {
                where: {
                    id: sectionResultID
                }
            })
        }


    }

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
    const performedBy = req.body.performedBy
    const name = req.user.name

    await Sectionorders.update({
        status: status,
        pathologist: pathologist,
        releasedBy: name,
        performedBy: performedBy
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

    if(status == "DELETED"){
        await Sectionorders.update({
            status: status,
        }, {
            where: {
                sectNumber: {[Op.like]: `%${labNumber}%` }
            }
        })
    }

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

        if(done / secorders == 1){
            await Orders.update({ status: "RELEASED"}, {where: { labNumber: labNumber }}).then(()=>{
                Orders.update({progress: 100}, {where: {labNumber:labNumber}})
            })
            res.send();
        }else{
            let progress = Math.round((done/secorders)*100)
            console.log(`Progress is, ${progress}`)
            await Orders.update({status: "PENDING" }, {where: { labNumber: labNumber }}).then(()=>{
                Orders.update({progress: progress}, {where: {labNumber:labNumber}})
            })
            res.send();
        }

    }
})

//Previous result
router.get("/result/previous/:ptID", async (req, res) => {
    const id = req.params.ptID;

    const presult = await Orders.findAll({
        order: [
            ['updatedAt', 'DESC']
        ],
        where:{ forPtId: id },
        limit: 5,
        include:[
            {model: Sectionorders, where:{status: "RELEASED"}, include: [{model: Sectionresults}]}]
    })
    res.json(presult);
})

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

module.exports = router