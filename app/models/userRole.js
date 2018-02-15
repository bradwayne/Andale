module.exports = function (sequelize, DataTypes) {
  var UserRole = sequelize.define('UserRole', {
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

  UserRole.associate = function (models) {
    UserRole.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    })
  }
  return UserRole
}
