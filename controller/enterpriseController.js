const {sequelize} = require('../models/index');
const {DataTypes, QueryTypes} = require('sequelize');
const Enterprise = require('../models/enterprise')(sequelize, DataTypes);
const Client = require('../models/client')(sequelize, DataTypes);
const XLSX = require('xlsx');
const fs = require('fs');



//END-POINTS DE EMPRESAS
module.exports ={

    create: async (req,res)=>{
        const date = new Date().getUTCDate();
        let createdAt =date;
        let updatedAt =date;
        const enterprise = {cnpj, name_fantasy, social_reason, phone, email} = req.body;
        const enterprise2 ={cnpj, name_fantasy, social_reason, phone, email, sip, createdAt, updatedAt}

        if( enterprise2!= null || enterprise2!=undefined || enterprise2!=''){
            try{
                await sequelize.query(`INSERT INTO public."Enterprises" (cnpj,name_fantasy,social_reason,phone,email) VALUES('${enterprise2.cnpj}','${enterprise2.name_fantasy}','${enterprise2.social_reason}','${enterprise2.phone}','${enterprise2.email}')`, {type:QueryTypes.INSERT});
                res.sendStatus(201);

            }catch(error){
                if(error.name ===  'SequelizeUniqueConstraintError' ){
                    res.sendStatus(400);
                }
            }

        }else{
            res.sendStatus(400);
        }

    },

    list_all: async(req,res) =>{
       var teste2 = await sequelize.query(`SELECT * FROM public."Enterprises" ORDER BY id_enterprise DESC`,{type:QueryTypes.SELECT});
       if(teste2 != ''|| teste2!=null|| teste2!=undefined){        
        res.json(teste2);

       }else{
         res.sendStatus(400);
       }
    },

    list_id: async (req,res) =>{

        if(isNaN(req.params.id)){
            res.sendStatus(403);
        }else{
            var id = parseInt(req.params.id);
             var list_id = await sequelize.query(`SELECT * FROM public."Enterprises" INNER JOIN public."Address_Enterprises" ON id_enterprise=identerprise AND id_enterprise=${id} AND identerprise=${id}`,{type: QueryTypes.SELECT});

             if(list_id !=undefined){
                try {
                    res.statusCode = 200;
                    res.json(list_id);

                } catch (error) {
                    res.sendStatus(400);
                }

             }else{
                res.sendStatus(400);
             }
        }

    },

    delete_enterprise: async (req,res) =>{
        if(isNaN(req.params.id)){
            res.sendStatus(400);
        }else{
            var id = parseInt(req.params.id);
            var dele_enterprise =  await sequelize.query(`SELECT * FROM public."Enterprises"  WHERE id_enterprise=${id}`,{type:QueryTypes.SELECT});
            if( dele_enterprise!= undefined || dele_enterprise!=null ){
                try {
                    await sequelize.query(`DELETE FROM public."Address_Enterprises" WHERE identerprise=${id}`,{type:QueryTypes.DELETE});
                    await sequelize.query(`DELETE FROM public."Users" WHERE identerprise=${id}`,{type:QueryTypes.DELETE});
                    await sequelize.query(`DELETE FROM public."Clients" WHERE identerprise=${id}`,{type:QueryTypes.DELETE});
                    await sequelize.query(`DELETE FROM public."Enterprises" WHERE id_enterprise=${id}`,{type:QueryTypes.DELETE});
                    res.sendStatus(200);
                } catch (error) {
                    res.sendStatus(400);
                }

            }else{
                res.sendStatus(400);
            }
        }
    },

    update_enterprise: async(req,res) =>{
        if(isNaN(req.params.id)){
            res.sendStatus(400);
        }
        else{
            var id = parseInt(req.params.id)
           
            var update_enterprise = await sequelize.query(`SELECT * FROM public."Enterprises" WHERE id_enterprise=${id}`,{type:QueryTypes.SELECT});

            if(update_enterprise != undefined){
                const date = new Date().getUTCDate();      
                let updatedAt =date;
                const update =  {cnpj, name_fantasy, social_reason, phone, email,sip,updatedAt} = req.body;
                if(update.cnpj!= ''){
                    update_enterprise.cnpj = cnpj;
                }
                if(update.name_fantasy!= ''){
                    update_enterprise.name_fantasy = name_fantasy;
                }
                if(update.social_reason!= ''){
                    update_enterprise.social_reason = social_reason;
                }
                if(update.phone!= ''){
                    update_enterprise.phone = phone;
                }
                if(update.email!= ''){
                    update_enterprise.email = email;
                }
                

                await Enterprise.update(update,{where:{id_enterprise: id}});
                res.sendStatus(201);
            }else{
                res.sendStatus(400);
            }
        }
    },

    uploads_file: async(req ,res) => {
        if(isNaN(req.params.id)){
            res.sendStatus(400);

        }else{
            var id = parseInt(req.params.id);          
            var nome = req.file.filename;
            if(nome == undefined){
                //console.log(nome)
                res.sendStatus(400);

            }else{
                var workbook = XLSX.readFile('./uploads/'+ nome);
                var shhet_name_list = workbook.SheetNames[0];
                let workshhet = workbook.Sheets[shhet_name_list]
                const data = XLSX.utils.sheet_to_json(workshhet,{raw:false});
               
                if(data!= null|| data!=undefined){
                    for(i=0; i< data.length; i++){
                       var  newData={ 
                            cpf:data[i].CPF,
                            nome:data[i].NOME,
                            tipo:data[i].TIPO,
                            posto:data[i].POSTO,
                            sub_om:data[i].SUB_OM,
                            ordem:data[i].ORDEM,
                            upag:data[i].UPAG,
                            valor:data[i].VALOR,
                            prazo:data[i].PRAZO,                         
                            banco:data[i].BANCO,
                            data_nascimento: data[i].DATA_NASCIMENTO,
                            endereco:data[i].ENDERECO,
                            numero:data[i].NUMERO,
                            complemento:data[i].COMPLEMENTO,
                            bairro:data[i].BAIRRO,
                            cidade:data[i].CIDADE,
                            uf:data[i].UF,
                            cep:data[i].CEP,
                            fixo1: data[i].FIXO1_TEL,
                            fixo2: data[i].FIXO2_TEL,
                            fixo3:data[i].FIXO3_TEL,
                            cel1: data[i].CEL1_TEL,
                            cel2:data[i].CEL2_TEL,
                            cel3:data[i].CEL3_TEL,
                            identerprise:id   
                        }       
                        
                        //console.log(newData)
                      
                        try {
                             await Client.create(newData).then(()=>{
                                 res.sendStatus(201);
                            });                      
                        } catch (error) {
                            if(error.name ===  'SequelizeUniqueConstraintError' ){
                                return res.sendStatus(400);
                            }
                        }                   
                    }
                }else{
                    res.sendStatus(400);
                }

            }
           
        }
       }



}
