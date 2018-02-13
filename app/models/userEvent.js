module.exports = function(sequelize, DataTypes) {
    var UserEvent = sequelize.define("UserEvent", {
        eventID : {
            type: DataTypes.BIGINT(11),
            allowNull : {
                args : false,
                msg: 'Event Id cannot be empty'
            },
        }
        
    },{
        // Timestamps
        timestamps: false,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue : DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue : DataTypes.NOW
        }
    });

    UserEvent.associate = function(models){
        UserEvent.belongsTo(models.User,{
        foreignKey: {
            allowNull : true
        }
    })
    }

    return UserEvent;
};
