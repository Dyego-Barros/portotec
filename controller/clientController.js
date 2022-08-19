const {sequelize} = require('../models/index');
const {DataTypes, QueryTypes} = require('sequelize');
const  Client  = require("../models/client")(sequelize, DataTypes);


module.exports={
    list_client_enterprise: async(req,res)=>{

        if(isNaN(req.params.id)){
            res.sendStatus(400);

        }else{
            var id = parseInt(req.params.id);
            const client_list = await sequelize.query(`SELECT * FROM public."Clients" WHERE identerprise=${id}`,{type:QueryTypes.SELECT});
            if(client_list != undefined){
                res.json(client_list);

            }else{
                res.sendStatus(400);
            }
        }
    },
    client_create: async (req,res)=>{
        const createClient = {cpf,nome,tipo,posto,sub_om,ordem,upag,valor,prazo,banco,data_nascimento,endereco,numero,complemento,bairro,cidade,uf,cep,fixo1,fixo2,fixo3,cel1,cel2,cel3,identerprise}= req.body;

        if(createClient != undefined || createClient !=null){
            await Client.create(createClient);
            res.sendStatus(200)
        }else{
            res.sendStatus(400)
        }
    },

    list_client_id: async(req,res)=>{
      
        if(isNaN( req.params.id)){
            res.sendStatus(400)

        }else{
            let id = parseInt(req.params.id);
            const clientList_id = await Client.findByPk(id);
            if(clientList_id !=undefined){
                res.json(clientList_id);
            }else{
                res.sendStatus(400)
            }


        }
    },
    client_update: async(req,res)=>{

         if(isNaN(req.params.id)){
            res.sendStatus(400);

         }else{           
            let id = parseInt(req.params.id);
            const client = await Client.findByPk(id);
            if(client!=undefined || client != null){
                const clientUpdate = {cpf,nome,tipo,posto,sub_om,ordem,upag,valor,prazo,banco,data_nascimento,endereco,numero,complemento,bairro,cidade,uf,cep,fixo1,fixo2,fixo3,cel1,cel2,cel3,identerprise} = req.body;
                
                //let identerprise = client.identerprise;
                newClient = clientUpdate;
                await Client.update(newClient,{where:{identerprise:identerprise}})
                res.sendStatus(200);
            }else{
                res.sendStatus(400)
            }
         }
    },

    client_delete: async(req,res)=>{
        if(isNaN(req.params.id)){
            res.sendStatus(400);

        }else{
             let id = parseInt(req.params.id);
             const client = await Client.findByPk(id);
             if(client!=undefined || client!= null){
               try {                
                await Client.destroy({where:{id:client.id}});
                res.sendStatus(200);
               } catch (error) {
                res.json({error:'Error ao deletar Usuário!'})
               }
             }else{
                res.sendStatus(400);

             }

        }
    }
}