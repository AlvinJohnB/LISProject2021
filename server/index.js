const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers
const patientlistRouter = require('./routes/Ptrecord')
app.use("/patient", patientlistRouter);

const testslistRouter = require('./routes/Tests')
app.use("/test", testslistRouter);

db.sequelize.sync().then( () => {
    app.listen(3001, () => {
        console.log("The server is running smoothly on port 3001");
    });
});
