const express = require('express');
const app = express();

app.use(express.json());

const db = require('./models');

// Routers
const patientlistRouter = require('./routes/Ptrecord')
app.use("/patient", patientlistRouter);


db.sequelize.sync().then( () => {
    app.listen(3001, () => {
        console.log("The server is running smoothly on port 3001");
    });
});
