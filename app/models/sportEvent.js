module.exports = function (sequelize, DataTypes) {
  var SportEvent = sequelize.define('SportEvent', {
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

  SportEvent.associate = function (models) {
    SportEvent.belongsTo(models.Sport, {
      foreignKey: {
        allowNull: true
      }
    })
    SportEvent.belongsTo(models.Events, {
      foreignKey: {
        allowNull: true
      }
    })
  }

  return SportEvent
}
