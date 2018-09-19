module.exports = function(sequelize, DataTypes){
    var Seller = sequelize.define("Seller", {
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
{
    timestamps: false
})

return Seller;
}