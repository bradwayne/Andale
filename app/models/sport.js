module.exports = function(sequelize, DataTypes) {
    var Sport = sequelize.define("Sport", {
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
        sport_type : { //https://en.wikipedia.org/wiki/Category:Sports_by_type
            type: DataTypes.STRING,
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

    Sport.associate = function(models){
        Sport.hasMany(models.SportEvent, {
            onDelete : "cascade"
        })

    }

    return Sport;
};
