'use strict';
const User = require('../models/user');
const Enterprise = require('../models/enterprise');
const Client = require('../models/client');
const Address_Enterprise = require('../models/address_enterprise');
const Address_User = require('../models/address_user');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};


 const sequelize = new Sequelize(config);
 try {
  sequelize.authenticate();
 console.log('Conexão bem sucedida!');
} catch (error) {
 console.error('Falha na conexão:', error);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
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
