'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        
        
        
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: true,
        unique:true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      posto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sub_om: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ordem: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      upag: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      valor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      prazo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      banco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      data_nascimento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      complemento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      uf: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fixo1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fixo2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fixo3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cel1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cel2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cel3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      identerprise:{
        type: Sequelize.INTEGER,
        references:{
          model: 'Enterprises',
          key: "id_enterprise"
        }

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clients');
  }
};