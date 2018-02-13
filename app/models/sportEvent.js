module.exports = function(sequelize, DataTypes) {
    var SportEvent = sequelize.define("SportEvent", {
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

    SportEvent.associate = function(models){
        SportEvent.belongsTo(models.Sport,{
            foreignKey: {
                allowNull : true
            }
        });
    }

    return SportEvent;
};
