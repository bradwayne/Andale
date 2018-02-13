module.exports = function(sequelize, DataTypes) {
    var UserRole = sequelize.define("UserRole", {
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

    UserRole.associate = function(models){
        UserRole.belongsTo(models.User,{
            foreignKey: {
                allowNull : true
            }
        })
    }
    return UserRole;
};
