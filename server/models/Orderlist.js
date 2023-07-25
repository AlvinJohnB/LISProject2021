module.exports = (sequelize, DataTypes) => {
    
    const Orderlist = sequelize.define("Orderlist", {}, {timestamps: false} )

    Orderlist.associate = (models) => {

    models.Patientlist.belongsToMany(models.Orders, {
        through: 'Orderlist',
        constraint: false,
    })
    models.Orders.belongsToMany(models.Patientlist, {
        through: 'Orderlist',
        constraint: false,
    })
    }

    return Orderlist;
}
