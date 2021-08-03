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
        encodedBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        labNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "PENDING",
        }
    })
    Orders.associate = (models) => {

        Orders.hasMany(models.Sectionorders, {
        onDelete: "cascade",
    })
    }
    return Orders;
}
