module.exports = function (sequelize, DataTypes) {
  var UserEvent = sequelize.define('UserEvent', {
    eventID: {
      type: DataTypes.BIGINT(11),
      allowNull: {
        args: false,
        msg: 'Event Id cannot be empty'
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

  UserEvent.associate = function (models) {
    UserEvent.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    })
  }

  return UserEvent
}
