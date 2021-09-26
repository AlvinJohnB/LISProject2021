module.exports = (sequelize, DataTypes) => {

    const Sectionresults = sequelize.define("Sectionresults", {
        test:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        result:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        isQuali:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        options:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {timestamps: false})

    Sectionresults.associate = (models) => {
        
        Sectionresults.belongsTo(models.Testslist, {
            constraint: false,
        })

        
    }
    return Sectionresults;
}