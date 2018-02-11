module.exports = function(sequelize, DataTypes){
    var User = sequelize.define('User', {
        id : {
            type: DataTypes.BIGINT(11),
            primaryKey:true,
            allowNull: false,
            autoIncrement: true
        },
        first_name : {
            type: DataTypes.STRING,
            allowNull : {
                args : false,
                msg: 'First name cannot be empty'
            },
            validate : {
                len : {
                    args: [1, 255],
                    msg : 'First name must have at least 1 and less than 255 characters'
                }
            }
        },
        last_name : {
            type: DataTypes.STRING,
            allowNull : {
                args : false,
                msg : 'Last name cannot be empty'
            },
            validate : {
                len : {
                    args: [1, 255],
                    msg : 'Last name must have at least 1 and less than 255 characters'
                }
            }
        },
        sex : {
            type: DataTypes.STRING,
            validate : {
                isIn : {
                    args : [[ 'male', 'female', 'unspecified']],
                    msg: 'The value must be one of these : male, female, or unspecify'
                }
            }
        },
        location : {
            type: DataTypes.STRING,
        },
        dob : {
            type: DataTypes.DATE
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

    })

    return User
}