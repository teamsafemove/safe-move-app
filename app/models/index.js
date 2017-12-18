'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'heroku';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};

var heroku = {
  "username": "bcab1c7c8a3362",
  "password": "d821d4a7",
  "database": "heroku_7b72d17e59e2ac7",
  "host": "us-cdbr-iron-east-05.cleardb.net",
  "dialect": "mysql"
}
var sequelize = new Sequelize("heroku_7b72d17e59e2ac7", "bcab1c7c8a3362", "d821d4a7", heroku);


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;