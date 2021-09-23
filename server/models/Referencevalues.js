module.exports = (sequelize, DataTypes) => {

    const Referencevalues = sequelize.define("Referencevalues", {
        test:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Male:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Female:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {timestamps: false})

    return Referencevalues;
}