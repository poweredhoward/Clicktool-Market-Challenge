module.exports = function(sequelize, DataTypes){
    var Item = sequelize.define("Item", {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1]
            }
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1]
            }
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false

        }
    },{
        timestamps: false
    });

    return Item;
}