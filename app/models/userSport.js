module.exports = function (sequelize, DataTypes) {
  var UserSport = sequelize.define('UserSport', {
    sportId: {
      type: DataTypes.BIGINT(11),
      allowNull: {
        args: false,
        msg: 'Sport Id cannot be empty'
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
    createdAt: {
      type: DataTypes.DATE,
      
    },
    updatedAt: {
      type: DataTypes.DATE,
      
    }
  }, {
    // Timestamps
    timestamps: true
  })

  UserSport.associate = function (models) {
    UserSport.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    })
  }

  return UserSport
}
