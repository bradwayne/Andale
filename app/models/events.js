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
      allowNull: {
        args: false,
        msg: 'Event name cannot be empty'
      },
      validate: {
        len: {
          args: [1, 255],
          msg: 'Event name must have at least 1 and less than 255 characters'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Event must have a location'
      }
    },
    attendants: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        isInt: {
          args: true,
          msg: 'Attendants must be numeric'
        }
      }
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
      allowNull: {
        args: false,
        msg: 'Host name cannot be empty'
      },
      validate: {
        len: {
          args: [1, 255],
          msg: 'Host name must have at least 1 and less than 255 characters'
        }
      }
    },
    phone_contact: {
      type: DataTypes.BIGINT(11),
      validate: {
        isInt: {
          args: true,
          msg: 'Attendants must be numeric'
        }
      }
    },
    email_contact: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/',
          msg: 'Please enter a valid email address'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [[ 'male', 'female', 'unspecified']],
          msg: 'The value must be one of these : male, female, or unspecify'
        }
      }
    },
    level: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: [5],
          msg: 'Level must be not greater than 5'
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
        isInt: {
          args: true,
          msg: 'Age must be an integer'
        }
      }
    },
    details: {
      type: DataTypes.TEXT
    },
    start_time: {
      type: DataTypes.DATE,
      validate: {
        notNull: {
          args: true,
          msg: 'Start time cannot be empty'
        },
        isAfter: {
          args: DataTypes.NOW,
          msg: 'Date cannot be earlier than today'
        }
      }
    },
    end_time: {
      type: DataTypes.DATE,
      validate: {
        notNull: {
          args: true,
          msg: 'End time cannot be empty'
        }
      }
    }
  }, {
    // Timestamps
    timestamps: false,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  })
  Events.associate = function (models) {
    Events.hasMany(models.EventReview, {
      onDelete: 'cascade'
    })
  }

  return Events
}
