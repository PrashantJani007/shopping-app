'use strict';
const {
  Model
} = require('sequelize');

const ACTIVE = 'Active';
const INACTIVE = 'In-Active';
const DELETED = 'Deleted'
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.ENUM([ACTIVE,INACTIVE,DELETED])
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};

module.exports.STATUS = {ACTIVE,INACTIVE,DELETED}