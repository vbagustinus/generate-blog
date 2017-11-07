'use strict';
const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
console.log(hash);

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  });
  User.prototype.getFullName = function () {
    return this.first_name + ' ' + this.last_name
  }

  User.associate = (models) => {
    User.hasMany(models.Post)
  }
  return User;
};
