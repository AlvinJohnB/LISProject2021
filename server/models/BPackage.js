module.exports = (sequelize, DataTypes) => {

    const BPackage = sequelize.define("BPackage", {

        branchpackage:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        tests: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        chem: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        hema: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sero: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cm: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {timestamps: false})

    return BPackage;
}