module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'First name cannot be empty'
      },
      validate: {
        len: {
          args: [1, 255],
          msg: 'First name must have at least 1 and less than 255 characters'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Last name cannot be empty'
      },
      validate: {
        len: {
          args: [1, 255],
          msg: 'Last name must have at least 1 and less than 255 characters'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [[ 'male', 'female', 'unspecified']],
          msg: 'The value must be one of these : male, female, or unspecified'
        }
      }
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        msg: 'User must have a username'
      },
      validate: {
        len: {
          args: [4, 15],
          msg: 'Username must have at least 4 characters and not more than 15 characters'
        }
      }
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        msg: 'Please enter an email-address'
      },
      validate: {
        isEmail: {
            args : true,
            msg: 'Please enter a valid email-address'
        }
      }
    },
    password: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [4, 15],
          msg: 'password must have at least 4 characters and not more than 15 characters'
        }
      }
    },
    location: {
      type: DataTypes.STRING
    },
    hometown: {
      type: DataTypes.STRING
    },
    dob: {
      type: DataTypes.DATE
    },
    photo: {
      type: DataTypes.STRING
    },
    bio: {
      type: DataTypes.TEXT
    },
    createdAt: {
      type: DataTypes.DATE

    },
    updatedAt: {
      type: DataTypes.DATE

    }
  }, {
    // Timestamps
    timestamps: true
  })
  User.associate = function (models) {
    User.hasMany(models.UserEvent, {
      onDelete: 'cascade'
    })
    User.hasMany(models.UserLevel, {
      onDelete: 'cascade'
    })
    User.hasMany(models.UserReview, {
      onDelete: 'cascade'
    })
    User.hasMany(models.UserRole, {
      onDelete: 'cascade'
    })
    User.hasMany(models.UserSport, {
      onDelete: 'cascade'
    })
    User.hasMany(models.Events, {
      onDelete: 'cascade'
    })
    User.hasMany(models.EventDiscussion, {
      onDelete: 'cascade'
    })
  }

  return User
}
