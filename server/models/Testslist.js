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
        isPackage: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        isQuali: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        },
        show: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: true,
        },
        options:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cost: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {timestamps: false})

    Testslist.associate = (models) => {

        Testslist.hasOne(models.Referencevalues, {
        constraint: false,
        onDelete: "cascade",
    })
    }

    return Testslist;
}