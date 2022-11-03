const {sequelize} = require('../models/index');
const {DataTypes, QueryTypes} = require('sequelize');
const INSS = require('../models/inss')(sequelize, DataTypes);
const XLSX = require('xlsx');
const fs = require('fs');




module.exports = {
    uploads_file: async(req,res)=>{
        if(isNaN(req.params.id)){
            res.sendStatus(401);

        }else{
            let id = parseInt(req.params.id);
            let name = req.file.filename;
            if(name == undefined || name == null){
                res.sendStatus(400);
            }else{
                var workbook = XLSX.readFile('./inssupload/'+name);
                var shhet_name_list = workbook.SheetNames[0];
                var workshhet = workbook.Sheets[shhet_name_list];
                const data = XLSX.utils.sheet_to_json(workshhet,{raw:false});

                if(data!=null || data !=undefined){
                    for(i=0; i<data.length; i++){
                        var newData={
                            cpf: data[i].cpf,
                            nome:data[i].nome,
                            dtnascimento:data[i].dtnascimento,
                            bancopagto:data[i].bancopagto,
                            salario:data[i].salario,
                            esp:data[i].esp,
                            endereco:data[i].endereco,
                            bairro:data[i].bairro,
                            municipio:data[i].municipio,
                            uf:data[i].uf,
                            cep:data[i].cep,
                            fone1:data[i].fone1,
                            fone2:data[i].fone2,
                            fone3:data[i].fone3,
                            fone4:data[i].fone4,
                            identerprise:id 
                        }
                       // console.log(newData)
                        //console.log(typeof(newData));
                        try {
                         await INSS.create(newData).then(()=>{
                            res.sendStatus(201);
                         })
                         
                        
                        }catch(error){
                         if(error.name === 'SequelizeUniqueConstraintError'){
                            return res.sendStatus(401)
                         }

                        }
                    }
                }
                else{
                   res.sendStatus(400)
                }
            }

        }
    },
 
    get_inss_all:async (req,res)=>{
        if(isNaN(req.params.id)){
            res.sendStatus(401);
        }else{
            let id = parseInt(req.params.id)
            let get_inss_all = await sequelize.query(`SELECT * FROM public."INSSes" WHERE identerprise=${id} ORDER BY id ASC`, {type:QueryTypes.SELECT});
            if(get_inss_all !== undefined || get_inss_all!== null){
                res.json(get_inss_all);
            }
            else{
                res.sendStatus(404)
            }
        }
    },


    get_inss_id: async(req,res)=>{
        if(isNaN(req.params.id)){
            res.sendStatus(401);
        }else{
            let id = parseInt(req.params.id);
            var get_inss = await sequelize.query(`SELECT * FROM public."INSSes" WHERE id=${id}`, {type:QueryTypes.SELECT});          
            if(get_inss!== undefined|| get_inss !==null){
                res.json(get_inss);
            }
            else{
                res.sendStatus(404);
            }
        }
    },
    update_inss: async(req,res)=>{
        if(isNaN(req.params.id)){
            res.sendStatus(401)
        }else{
            let id = parseInt(req.params.id);
            const update = {cpf,nome, dtnascimento,bancopagto, salario, esp, endereco, bairro,municipio,uf,cep,fone1,fone2,fone3,fone4,identerprise}=req.body;
            await INSS.update(update,{where:{id:id}});
            res.sendStatus(200);
           
        }
    },

    delete_inss:async(req,res)=>{
        if(isNaN(req.params.id)){
            res.sendStatus(401)
        }else{
            let id = parseInt(req.params.id);
            let consult_delete = await sequelize.query(`SELECT * FROM public."INSSes" WHERE id=${id}`,{type:QueryTypes.SELECT});
            if(consult_delete.length > 0){
                await sequelize.query(`DELETE FROM public."INSSes" WHERE id=${id}`,{type:QueryTypes.DELETE});
                res.sendStatus(200);

            }else{
                res.sendStatus(400);
            }
        }
    }
}