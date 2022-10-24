const DataTypes = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User',{
    id_user: {
      type:DataTypes.INTEGER, 
      primaryKey:true, 
      autoIncrement:true,
       allowNull:false
      },
  
    name: DataTypes.STRING,
  
    cpf: DataTypes.STRING,
  
    email_user: DataTypes.STRING,
  
    phone: DataTypes.STRING,
  
    password: DataTypes.STRING,
  
    level: DataTypes.STRING,
  
    identerprise: DataTypes.INTEGER,
  
   });
     
  

   

    

    
return User;
}




  
