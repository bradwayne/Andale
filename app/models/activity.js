module.exports = function(sequelize, DataTypes) {
    var Activity = sequelize.define("Activity", {
        id : {
            type: DataTypes.BIGINT(11),
            primaryKey:true,
            allowNull: false,
            autoIncrement: true
        },
        name : {
            type: DataTypes.STRING,
            allowNull : {
                args : false,
                msg: 'Activty name cannot be empty'
            },
            validate : {
                len : {
                    args: [1, 255],
                    msg : 'Activity name must have at least 1 and less than 255 characters'
                }
            }
        },
        activity_type : { //https://en.wikipedia.org/wiki/Category:Sports_by_type
            type: DataTypes.STRING,
        },
        // Timestamps
        createdAt: {
            type: DataTypes.DATE,
            defaultValue : DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue : DataTypes.NOW
        }
    });

    return Activity;
};
