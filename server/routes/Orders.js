const express = require('express');
const router = express.Router();
const { Orders, Sectionorders, Patientlist, Orderlist } = require('../models');
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

router.get("/forcheckin/:section", async (req, res) => {
    const section = req.params.section;
    const orders = await Orders.findAll(
        {
            include: [
                {model: Patientlist},
                {model: Sectionorders,
                where: {
                    section: section
                }},
               ]
        }
    );
    res.json(orders);
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



module.exports = router