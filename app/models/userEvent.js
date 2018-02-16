module.exports = function (sequelize, DataTypes) {
  var UserEvent = sequelize.define('UserEvent', {
    
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
  UserEvent.associate = function ( models){
      UserEvent.belongsTo(models.Events, {
          foreignKey : {
              allowNull : true
          }
      })
  }

  return UserEvent
}
