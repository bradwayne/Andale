module.exports = function (sequelize, DataTypes) {
  var EventDiscussion = sequelize.define('EventDiscussion', {
    id: {
      type: DataTypes.BIGINT(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        msg: 'Message cannot be empty'
      },
      validate: {
        len: {
          args: [255],
          msg: 'Message must be less than 255 characters'
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      
    },
    updatedAt: {
      type: DataTypes.DATE,
      
    }
  },
    {
      // Timestamps
      timestamps: true
    })

  EventDiscussion.associate = function (models) {
    EventDiscussion.belongsTo(models.Events, {
      foreignKey: {
        allowNull: true
      }
    }),
    EventDiscussion.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    })
  }

  return EventDiscussion
}
