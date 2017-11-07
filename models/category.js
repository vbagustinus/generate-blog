'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    category_name: DataTypes.STRING
  });

  Category.associate = (models) =>{
    Category.belongsToMany(models.Post, {through: 'Post_Category'})
    Category.hasMany(models.Post_Category)
  }
  return Category;
};
