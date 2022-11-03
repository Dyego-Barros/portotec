
//const sequelize = require('../config/db');
const {sequelize} = require('../models/index');
const {DataTypes, QueryTypes} = require('sequelize');
const User = require('../models/user')(sequelize, DataTypes);
//const Enterprise = require('../models/enterprise')(sequelize, DataTypes);
const jwt= require('jsonwebtoken');
//const models = require('../models');
//const { json } = require('body-parser');

const crypto = require('crypto'); 


const JWTSecret="123456789abcd";




//END-POINTS DE USER
module.exports={
//ROTA DE LISTA COMPLETA  DE USUARIO
    list_all:  async (req,res)=>{
        const user = await sequelize.query('SELECT * FROM public."Users" INNER  JOIN  public."Enterprises" ON identerprise=id_enterprise',{type: QueryTypes.SELECT});
       
        if (user != undefined){
            
           
            res.json(user);
           

        }else{
            res.sendStatus(400);
        }
       
    },
    //ROTA QUE LISTA USUARIOS POR EMPRESA
    list_user_id: async(req,res) =>{

        if(isNaN(req.params.id)){
            res.sendStatus(400);

        }else{

            const id = parseInt(req.params.id);
            if(id !== undefined || id !== null){
                const user = await sequelize.query(`SELECT * FROM public."Users" WHERE identerprise=${id}`,{type:QueryTypes.SELECT});

                if(user.length >0){
                   
                        res.json(user);
                        
                   
                       

                }else{
                    res.sendStatus(400);
                    
                }
               


            }
        }
       
    },
    //ROTA DE CRIAÇÂO DE USUARIO
    create: async(req, res)=>{ 
        let name = req.body.name 
        const passwordHash = req.body.password;
        const password = crypto.createHash('md5').update(passwordHash).digest('hex');
        const user = {cpf, email_user, phone,  level, identerprise}= req.body
        if(user!== undefined || user !== null){ 
                try{
                    await sequelize.query(`INSERT INTO public."Users" (name, cpf, email_user, phone, password, level, identerprise) VALUES('${name}', '${user.cpf}', '${user.email_user}','${user.phone}','${password}','${user.level}',${user.identerprise})`,{type:QueryTypes.INSERT});
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
//ROTA DE BUSCA USUARIO POR ID
    list_id: async (req,res)=>{
       if(isNaN(req.params.id)){
       res.sendStatus(400);
       }else{
        var id = req.params.id;
        if(id != undefined){
            var consult = await sequelize.query(`SELECT * FROM public."Users" INNER JOIN public."Address_Users" ON id_user= iduser AND id_user=${id} AND iduser=${id} INNER JOIN public."Enterprises" ON identerprise=id_enterprise`,{type:QueryTypes.SELECT}); 
            if(consult!= undefined|| consult!= null){
                res.json(consult);
               
            }else{
                res.sendStatus(400);
            }        
           
        }else{
            res.sendStatus(400);
        }

       }
    },
//ROTA DE ATUALIZAÇÂO DE USUARIO
    update_user:async (req, res) =>{
        if(isNaN(req.params.id)){
            res.sendStatus(400);

        }else{
            var id = parseInt(req.params.id);
            const user = await sequelize.query(`SELECT * FROM public."Users" WHERE id_user= ${id}`,{type:QueryTypes.SELECT});
            if(user!=undefined){
                var name = req.body;
                const crypto = require('crypto');              
               const passwordHash = req.body.password;
                const update = {name, cpf,email_user,phone, password, level,identerprise} = req.body;
                update.password= crypto.createHash('md5').update(passwordHash).digest('hex');
                 if(update.name !=''){
                    user.name= name;
                 }
                 if(update.cpf !=''){
                  user.cpf = cpf;
                 }
                 if(update.email_user !=''){
                   user.email_user =email_user;
                 }
                 if(update.phone !=''){
                   user.phone = phone;
                 }
                 if(update.password !=''){
                   user.password = password;
                 }
                 if(update.level !=''){
                   user.level = level;
                 }
                 if(update.identerprise !=''){
                    user.identerprise = identerprise;
                 }
               
                console.log(update)
               
                 
                     try {
                        await User.update(update,{where:{id_user: id}});
                        res.sendStatus(201);
                     } catch (error) {
                        if(error.name ===  'SequelizeUniqueConstraintError' ){
                            res.sendStatus(400);
                        }
                     }
               
               
            }else{
                res.sendStatus(400);
            }
            
        }
    },
    //ROTA DE EXCLUSÂO DE USUARIO
    delete_user:async(req,res)=>{
        if(isNaN(req.params.id)){
            res.sendStatus(400);

        }else{
            var id = parseInt(req.params.id);
            let consult = await sequelize.query(`SELECT * FROM public."Users" WHERE id_user=${id}`,{type:QueryTypes.SELECT});
            if(consult != undefined || consult != null){
                try {
                 await sequelize.query(`DELETE FROM public."Address_Users"WHERE iduser=${id}`,{type:QueryTypes.DELETE})
                 await sequelize.query(`DELETE FROM public."Users" WHERE id_user=${id}`,{type:QueryTypes.DELETE});
                    res.sendStatus(200);
                } catch (error) {
                    res.sendStatus(400);
                }
               
            }else{
                res.sendStatus(400);

            }
        }
    },
//ROTA DE LOGIN DE USUARIO E AUTORIZAÇÂO DO TOKEN
    get_user:async(req,res)=>{ 
        let email = req.body.email_user;
        let passwordHash = req.body.password;
        let password =crypto.createHash('md5').update(passwordHash).digest('hex');
          try{
            if(email !==undefined && password !==undefined){
                const login = await sequelize.query(`SELECT * FROM public."Users" WHERE email_user='${email}' AND password='${password}'`,{type:QueryTypes.SELECT});
               
                 if(login.length > 0){                  
                    jwt.sign({id: login.id_user, email: login.email_user}, JWTSecret,{expiresIn:'8h'}, (error, token)=>{
                        if(error){                           
                            res.json({error: "Credenciais invalidas"})
                        }else{                           
                            res.json({token: token, login:login});
                         }
                    });
                   
                }else{
                    res.sendStatus(401);
                }
            }else{
                res.sendStatus(400);
            }
          }catch(error){

            res.sendStatus(400);
          }  
}

}
