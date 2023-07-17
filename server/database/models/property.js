'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Property.belongsTo(models.User, { foreignKey: 'userId', as: 'owner' });
    }
  }
  Property.init({
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    rent: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'User'
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};