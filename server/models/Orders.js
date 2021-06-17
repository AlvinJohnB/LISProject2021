module.exports = (sequelize, DataTypes) => {

    const Orders = sequelize.define("Orders", {
        reqDr:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        testsRequested: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        labNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    return Orders;
}