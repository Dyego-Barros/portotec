const DataTypes = require('sequelize');

const sequelize = require('./index');

module.exports= function(sequelize,DataTypes){
  const Enterprise = sequelize.define('Enterprise',{
    id_enterprise:{
      type:DataTypes.INTEGER, 
      primaryKey:true, 
      autoIncrement:true, 
      allowNull:false
    }, 
    cnpj: DataTypes.STRING,
  
    name_fantasy: DataTypes.STRING,
  
    social_reason: DataTypes.STRING,
  
    phone: DataTypes.STRING,
  
    email: DataTypes.STRING,
    
    sip: DataTypes.STRING
  
   });  
     
 
 
  return Enterprise;

}


 
