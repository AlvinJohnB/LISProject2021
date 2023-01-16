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
        ptType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalCost: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hemaCost: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cmCost: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        chemCost: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        seroCost: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDiscounted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "PENDING",
        },progress:{
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue: 0
        }
    })
    Orders.associate = (models) => {
        Orders.hasMany(models.Sectionorders, {
        onDelete: "cascade",
        foreignKey: "forOrderID"
    })
    }
    return Orders;
}
