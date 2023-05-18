module.exports = (sequelize, DataTypes) => {

    const Patientlist = sequelize.define("Patientlist", {
        branchid:{
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        middlename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
        },
        bday:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        address:{
            type: DataTypes.STRING,
        },
        phone:{
            type: DataTypes.STRING,
        },
        idenno:{
            type: DataTypes.STRING,
        }

    })
    Patientlist.associate = (models) => {

        Patientlist.hasMany(models.Orders, {
        constraint: false,
        onDelete: "cascade",
        foreignKey: "forPtId"
    })
    }
    return Patientlist;
}
