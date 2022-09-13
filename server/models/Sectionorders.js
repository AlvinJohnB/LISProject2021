module.exports = (sequelize, DataTypes) => {

    const Sectionorders = sequelize.define("Sectionorders", {

        sectNumber:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        section:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        tests: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "FOR CHECK-IN",
        },
        updatedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pathologist:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        releasedBy:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        order:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    })

    return Sectionorders;
}
