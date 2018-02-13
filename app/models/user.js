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
        gender : {
            type: DataTypes.STRING,
            validate : {
                isIn : {
                    args : [[ 'male', 'female', 'unspecified']],
                    msg: 'The value must be one of these : male, female, or unspecify'
                }
            }
        },
        username : {
            type: DataTypes.STRING,
            allowNull : {
                args : false,
                msg : 'User must have a username'
            }
        },
        email : {
            type: DataTypes.STRING,
            allowNull : {
                args : false,
                msg : 'Please enter an email-address'
            },
            validate : {
                is : {
                    args : "/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/",
                    msg : 'Please enter a valid email address'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate : {
                is : {
                    args : ["^(?=.*\d).{4,16}$"], //regex from here http://regexlib.com/Search.aspx?k=password&AspxAutoDetectCookieSupport=1
                    msg : 'Password must be between 4 and 8 digits long and include at least one numeric digit'
                }
            }
        },
        location : {
            type: DataTypes.STRING,
        },
        hometown : {
            type: DataTypes.STRING,
        },
        dob : {
            type: DataTypes.DATE
        },
        photo : {
            type: DataTypes.STRING,
        },
        bio : {
            type: DataTypes.TEXT
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
        })
    User.associate = function(models){
        User.hasMany(models.UserEvent,{
            onDelete : "cascade"
        });
        User.hasMany(models.UserLevel,{
            onDelete : "cascade"
        });
        User.hasMany(models.UserReview,{
            onDelete : "cascade"
        });
        User.hasMany(models.UserRole,{
            onDelete : "cascade"
        });
        User.hasMany(models.UserSport,{
            onDelete : "cascade"
        });

    }

    return User
}