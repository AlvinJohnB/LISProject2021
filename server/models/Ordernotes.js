module.exports = (sequelize, DataTypes) => {

    const Ordernotes = sequelize.define("Ordernotes", {

        orderID:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        inputBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
 
    return Ordernotes;
}
