'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('INSSes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
       
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },   
        dtnascimento:{type: Sequelize.STRING},  
        bancopagto :{type: Sequelize.STRING}, 
        salario:{type: Sequelize.STRING},  
        esp:{type: Sequelize.STRING},      
        endereco:{type: Sequelize.STRING},
        bairro:{type: Sequelize.STRING},
        municipio:{type: Sequelize.STRING}, 
        uf:{type: Sequelize.STRING}, 
        cep:{type: Sequelize.STRING},                
        fone1:{type: Sequelize.STRING}, 
        fone2:{type: Sequelize.STRING}, 
        fone3:{type: Sequelize.STRING}, 
        fone4:{type: Sequelize.STRING},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
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
    await queryInterface.dropTable('INSSes');
  }
};