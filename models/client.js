// const DataTypes = require('sequelize');

// const enterprise= require('./enterprise');
// const db = require('./index');

module.exports = function(sequelize, DataTypes) {
  const Client = sequelize.define('Client',{
    cpf: {
      type: DataTypes.STRING,
      unique:true
    },
    nome: DataTypes.STRING,
    tipo: DataTypes.STRING,
    posto: DataTypes.STRING,
    sub_om: DataTypes.STRING,
    ordem: DataTypes.STRING,
    upag: DataTypes.STRING,
    valor: DataTypes.STRING,
    prazo: DataTypes.STRING,
    banco: DataTypes.STRING,
    data_nascimento: DataTypes.STRING,
    endereco: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    uf: DataTypes.STRING,
    cep: DataTypes.STRING,
    fixo1: DataTypes.STRING,
    fixo2: DataTypes.STRING,
    fixo3: DataTypes.STRING,
    cel1: DataTypes.STRING,
    cel2: DataTypes.STRING,
    cel3: DataTypes.STRING,
    identerprise:DataTypes.INTEGER
 
  })
   
 
 
 
  
 
 
 return Client;

}

 



