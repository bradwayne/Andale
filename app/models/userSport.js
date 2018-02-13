module.exports = function(sequelize, DataTypes) {
    var UserSport = sequelize.define("UserSport", {
        sportId : {
            type: DataTypes.BIGINT(11),
            allowNull : {
                args : false,
                msg: 'Sport Id cannot be empty'
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

    UserSport.associate = function(models){
        UserSport.belongsTo(models.User,{
            foreignKey: {
                allowNull : true
            }
        })
    }

    return UserSport;
};
