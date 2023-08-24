module.exports = (sequelize, DataTypes) => {

    const Diagnosis = sequelize.define("Diagnosis", {

        ptID:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        diagnosis: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        inputBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
 
    return Diagnosis;
}
