module.exports = (sequelize, DataTypes) => {

    const Resultotestlist = sequelize.define("Resultotestlist", {}, {timestamps: false} )

    Resultotestlist.associate = (models) => {

    models.Sectionresults.belongsTo(models.Testslist, {
        constraint: false,
        through: 'Resultotestlist'
    })
    }

    return Resultotestlist;
}
