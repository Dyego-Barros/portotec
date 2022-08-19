
//const sequelize = require('../config/db');
const {sequelize} = require('../models/index');
const {DataTypes, QueryTypes} = require('sequelize');
const User = require('../models/user')(sequelize, DataTypes);
const Enterprise = require('../models/enterprise')(sequelize, DataTypes);
const jwt= require('jsonwebtoken');
const models = require('../models');



const JWTSecret="123456789abcd";




//END-POINTS DE USER
module.exports={
//ROTA DE LISTA COMPLETA  DE USUARIO
    list_all:  async (req,res)=>{
        const user = await sequelize.query('SELECT * FROM public."Users"  JOIN  public."Enterprises" ON identerprise = id_enterprise',{type: QueryTypes.SELECT});
       
        if (user != ''){
            
           
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
            if(id != undefined || id != null){
                const user = await sequelize.query(`SELECT * FROM public."Users" WHERE identerprise=${id}`,{type:QueryTypes.SELECT});
                res.json(user);


            }
        }
       
    },
    //ROTA DE CRIAÇÂO DE USUARIO
    create: async(req, res)=>{
        var name = req.body;
        const user = {name, cpf, email, phone, password, level, identerprise}= req.body
        if(user != ''|| user!= undefined|| user!= null){ 
            var consult = await Enterprise.findByPk(identerprise);
            if(consult != undefined){
                try{
                    await User.create(user);
                    res.sendStatus(201);
                }catch(error){
                    if(error.name ===  'SequelizeUniqueConstraintError' ){
                        res.sendStatus(400);
                    }
                } 
            }else{
                res.sendStatus(400);
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
            const user = await User.findByPk(id);
            if(user!=undefined){
                var name = req.body;
                const update_user = {name, cpf,email,phone, password, level,identerprise} = req.body;
                 if(update_user.name!=''){
                    user.name = update_user.name;
                 }
                 if(update_user.cpf!=''){
                    user.cpf = update_user.cpf;
                 }
                 if(update_user.email!=''){
                    user.email = update_user.email;
                 }
                 if(update_user.phone!=''){
                    user.phone = update_user.phone;
                 }
                 if(update_user.password!=''){
                    user.password = update_user.password;
                 }
                 if(update_user.level!=''){
                    user.level = update_user.level;
                 }
                 if(update_user.identerprise!=''){
                    user.identerprise = update_user.identerprise;
                 }
                 console.log(update_user)
                 
               
                 if(update_user != undefined){
                     try {
                        await User.update(update_user,{where:{id_user:id}});
                        res.sendStatus(201);
                     } catch (error) {
                        if(error.name ===  'SequelizeUniqueConstraintError' ){
                            res.sendStatus(400);
                        }
                     }
                 }else{
                    res.sendStatus(400);

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
            let consult = await User.findByPk(id);
            if(consult != undefined || consult != null){
                try {
                 await User.destroy({where:{id_user:id}});
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

        let email = req.body.email;
        let password = req.body.password;
          try{
            if(email !=null && password !=null || email !=undefined && password !=undefined){
                const login = await User.findAll({where:{email:email, password:password}});
                if(login !=''){

                    jwt.sign({id: login.id_user, email: login.email}, JWTSecret,{expiresIn:'8h'}, (error, token)=>{
                        if(error){                           
                            res.json({error: "Credenciais invalidas"})
                        }else{                           
                            res.json({token: token, user:login}); }
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
