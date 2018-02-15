module.exports = function(sequelize, DataTypes) {
    var EventReview = sequelize.define("EventReview", {
        id : {
            type: DataTypes.BIGINT(11),
            primaryKey:true,
            allowNull: false,
            autoIncrement: true,
        },
        name : {
            type: DataTypes.STRING,
            allowNull : {
                args : false,
                msg: 'Commentor name cannot be empty'
            },
            validate : {
                len : {
                    args: [1, 255],
                    msg : 'name must have at least 1 and less than 255 characters'
                }
            }
        },
        comment : {
            type: DataTypes.STRING,
        },
        rating : {
            type: DataTypes.INTEGER,
            validate : {
                max : {
                    args : [5],
                    msg : 'Rating must be not greater than 5'
                },
                min : {
                    args : [0],
                    msg : 'Level must be at least 0'
                },
            }
        }
    },
    {
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

    EventReview.associate = function(models){
        EventReview.belongsTo(models.Events,{
            foreignKey: {
                allowNull : true
            }
        });
    }

    return EventReview;
};
