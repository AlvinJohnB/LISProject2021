module.exports = (sequelize, DataTypes) => {

    const Package = sequelize.define("Package", {

        package:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        tests: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {timestamps: false})

    return Package;
}