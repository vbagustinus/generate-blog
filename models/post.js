'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    article: DataTypes.TEXT,
    file: DataTypes.STRING,
    date_publish: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    link: DataTypes.STRING
  });

  Post.associate = (models) => {
    Post.belongsToMany(models.Category, {through: 'Post_Category'})
    Post.hasMany(models.Post_Category)
    Post.belongsTo(models.User)
  }
  return Post;
};
