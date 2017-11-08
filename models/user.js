'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    blog_name: DataTypes.STRING,
    gender: DataTypes.STRING
  });

  User.prototype.getFullName = function () {
    return this.first_name + ' ' + this.last_name
  }

  User.beforeCreate((user, options) => {
    const saltRounds = 10;
    const myPlaintextPassword = user.password;
    return  bcrypt.hash(myPlaintextPassword, saltRounds)
      .then(function(hash) {
        user.password = hash
      });
  });

  User.associate = (models) => {
    User.hasMany(models.Post)
  }
  return User;
};
