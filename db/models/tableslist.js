'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TablesList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TablesList.belongsTo(models.ContentTypes, {
        foreignKey: 'ContentTypeId',
        onDelete: 'CASCADE',
      });
    }
  }
  TablesList.init({
    tableName: DataTypes.STRING,
    ContentTypeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'TablesList',
  });
  return TablesList;
};
