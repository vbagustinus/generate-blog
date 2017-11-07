'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post_Category = sequelize.define('Post_Category', {
    CategoryId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  });

  Post_Category.associate = (models) => {
    Post_Category.belongsTo(models.Category)
    Post_Category.belongsTo(models.Post)
  }
  return Post_Category;
};
