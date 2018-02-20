module.exports = function (sequelize, DataTypes) {
  var UserSport = sequelize.define('UserSport', {
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
    UserSport.belongsTo(models.Sport, {
        foreignKey:{
            allowNull: true
        }
    })
  }

  return UserSport
}
