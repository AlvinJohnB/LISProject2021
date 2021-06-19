const express = require('express');
const router = express.Router();
const { Orders } = require('../models');
const { Op } = require("sequelize");


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

router.post("/addorder", async (req, res) => {
    const orderdata = req.body;
    await Orders.create(orderdata);
    res.json(orderdata);

});



module.exports = router