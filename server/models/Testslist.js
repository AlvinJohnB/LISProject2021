module.exports = (sequelize, DataTypes) => {

    const Testslist = sequelize.define("Testslist", {
        testcode:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        testname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        section: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {timestamps: false})

    return Testslist;
}