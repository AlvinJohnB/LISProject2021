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
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
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