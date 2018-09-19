module.exports = function(sequelize, DataTypes){
    var Click = sequelize.define("Click", {
        ip: {
            type: DataTypes.STRING
        },
        browser: {
            type: DataTypes.STRING
        },
        os: {
            type: DataTypes.STRING
        }
        
    },{
        timestamps: true
    });

    Click.associate = function(models){
        Click.belongsTo(models.Item, {
            foreignKey: {
                alloewNull: false
            }
        });
    };

    return Click;
}