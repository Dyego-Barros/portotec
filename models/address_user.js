
const DataTypes = require('sequelize');
const user = require('./user');
module.exports= function(sequelize, DataTypes) {
  const Address_User = sequelize.define('Address_User',{
    address: DataTypes.STRING,
    number: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    complement: DataTypes.STRING,
    iduser: DataTypes.INTEGER

  })
    


  

return Address_User;

}
 
 

