const DataTypes = require('sequelize');

module.exports = function (sequelize, DataTypes){
 
  const INSS =sequelize.define('INSS',{

    cpf: DataTypes.STRING,
    nome: DataTypes.STRING,  
    dtnascimento:DataTypes.STRING,  
     bancopagto:DataTypes.STRING, 
     salario:DataTypes.STRING, 
     esp:DataTypes.STRING,
    endereco:DataTypes.STRING,
    bairro:DataTypes.STRING,
    municipio:DataTypes.STRING, 
    uf:DataTypes.STRING, 
    cep:DataTypes.STRING, 
    fone1:DataTypes.STRING, 
    fone2:DataTypes.STRING, 
    fone3:DataTypes.STRING, 
    fone4:DataTypes.STRING, 
    identerprise:DataTypes.INTEGER
  });

  return INSS;
}