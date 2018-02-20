module.exports = function (sequelize, DataTypes) {
  var Events = sequelize.define('Events', {
    id: {
      type: DataTypes.BIGINT(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Event name must have at least 1 and less than 255 characters'
        }
      }
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    attendants: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    fees: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        isFloat: {
          args: true,
          msg: 'Fees must be numeric'
        }
      }
    },
    host: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Host name must have at least 1 and less than 255 characters'
        }
      }
    },
    phone_contact: {
      type: DataTypes.BIGINT(11),
    },
    email_contact: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email-address'
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
    level: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: [10],
          msg: 'Level must be not greater than 10'
        },
        min: {
          args: [1],
          msg: 'Level must be at least 1'
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
      }
    },
    details: {
      type: DataTypes.TEXT
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    numberAttending: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    geolocation_x: {
      type: DataTypes.TEXT
    },
    geolocation_y: {
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
  Events.associate = function (models) {
    Events.hasMany(models.EventReview, {
      onDelete: 'cascade'
    })
    Events.hasMany(models.EventDiscussion, {
      onDelete: 'cascade'
    })
    Events.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    })
    Events.hasMany(models.SportEvent, {
      onDelete: 'cascade'
    })
    Events.belongsTo(models.Sport, {
      onDelete: 'cascade'
    })
  }

  return Events
}
