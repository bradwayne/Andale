module.exports = function (sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
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
        msg: 'Role name cannot be empty'
      },
      validate: {
        len: {
          args: [1, 255],
          msg: 'Activity name must have at least 1 and less than 255 characters'
        }
      }
    },
    details: {
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

  Role.associate = function (models) {
    Role.hasMany(models.UserRole, {
      onDelete: 'cascade'
    })
  }

  return Role
}
