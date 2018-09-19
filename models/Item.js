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

        },
        //path to saved image, should be in /images
        image:{
            type: DataTypes.STRING,
            allowNull: true
        }
        
    },{
        timestamps: false
    });

    Item.associate = function(models){
        Item.hasMany(models.Click, {
            onDelete: "cascade",
            name: "ItemId"
        })
    }



    return Item;
}