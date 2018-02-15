module.exports = function (sequelize, DataTypes) {
  var UserReview = sequelize.define('UserReview', {
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
        msg: 'commentor name cannot be empty'
      },
      validate: {
        len: {
          args: [1, 255],
          msg: 'name must have at least 1 and less than 255 characters'
        }
      }
    },
    comment: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: [5],
          msg: 'Rating must be not greater than 5'
        },
        min: {
          args: [0],
          msg: 'Rating must be at least 0'
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

  UserReview.associate = function (models) {
    UserReview.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    })
  }

  return UserReview
}
