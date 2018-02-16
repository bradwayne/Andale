module.exports = function (sequelize, DataTypes) {
  var Sport = sequelize.define('Sport', {
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
        msg: 'Activty name cannot be empty'
      },
      validate: {
        len: {
          args: [1, 255],
          msg: 'Activity name must have at least 1 and less than 255 characters'
        }
      }
    },
    sport_type: { // https://en.wikipedia.org/wiki/Category:Sports_by_type
      type: DataTypes.STRING
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

  Sport.associate = function (models) {
    Sport.hasMany(models.SportEvent, {
      onDelete: 'cascade'
    })
    Sport.hasMany(models.Events, {
        onDelete: 'cascade'
    })
    Sport.hasMany(models.UserSport, {
        onDelete: 'cascade'
    })
  }

  return Sport
}
