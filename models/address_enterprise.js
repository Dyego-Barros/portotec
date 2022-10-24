
module.exports= function(sequelize, DataTypes) {
  const Address_Enterprise= sequelize.define('Address_Enterprise',{
    address: DataTypes.STRING,
    number: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    complement: DataTypes.STRING,
    identerprise:DataTypes.INTEGER

  });

 


   
 
  return Address_Enterprise;

}

  
 
