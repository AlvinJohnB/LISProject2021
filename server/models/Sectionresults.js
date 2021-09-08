module.exports = (sequelize, DataTypes) => {

    const Sectionresults = sequelize.define("Sectionresults", {
        test:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        result:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {timestamps: false})
    return Sectionresults;
}