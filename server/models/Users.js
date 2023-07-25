module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        licenseNo:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "N/A",
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "N/A"
        }
    }, {timestamps: false})

    return Users;
}