module.exports = (sequelize, DataTypes) => {

    const Sectionorderlist = sequelize.define("Sectionorderlist", {}, {timestamps: false} )

    Sectionorderlist.associate = (models) => {

    models.Sectionresults.belongsToMany(models.Sectionorders, {
        constraint: false,
        through: 'Sectionorderlist'
    })
    models.Sectionorders.belongsToMany(models.Sectionresults, {
        constraint: false,
        through: 'Sectionorderlist'
    })
    }

    return Sectionorderlist;
}
