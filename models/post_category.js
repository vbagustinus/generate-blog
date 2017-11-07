'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post_Category = sequelize.define('Post_Category', {
    CategoryId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Post_Category;
};