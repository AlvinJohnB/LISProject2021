module.exports = (sequelize, DataTypes) => {

    const Sectionresults = sequelize.define("Sectionresults", {
        test:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        result:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: " ",
        },
        isQuali:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        options:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        flag:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "N/A",
        },
        sectionOrder:{
            type:DataTypes.INTEGER,
            allowNull: true
        }
    }, {timestamps: false})

    Sectionresults.associate = (models) => {
        
        Sectionresults.belongsTo(models.Testslist, {
            constraint: false,
        })


    }
    return Sectionresults;
}