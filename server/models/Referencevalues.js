module.exports = (sequelize, DataTypes) => {

    const Referencevalues = sequelize.define("Referencevalues", {
        test:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Male:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        Female:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        mref:{
            type: DataTypes.STRING,
            allowNull: true
        },
        fref:{
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {timestamps: false})

    return Referencevalues;
}