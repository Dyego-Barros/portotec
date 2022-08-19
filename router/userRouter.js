const express = require('express');
const router = express.Router();
const jwt= require('jsonwebtoken');


const JWTSecret="123456789abcd";

function auth(req,res,next){

    const authToken = req.headers['authorization'];
   

    if(authToken != undefined){

        const bearer = authToken.split(' ');
        let token = bearer[1];

        jwt.verify(token, JWTSecret,(error, data)=>{
            if(error){
                res.status(401);
            }else{
                console.log(data);
                next();

            }
        })

    }else{
        res.sendStatus(401);
    }

   
}

//CONTROLLER RESPONSAVEL PELAS ROTAS
const userController = require('../controller/userController');
//ROTAS DE CRUD USUARIO
router.get('/list', auth, userController.list_all);
router.post('/create', auth, userController.create);
router.get('/list/:id', auth, userController.list_id);
router.get('/list/enterprise/:id', auth, userController.list_user_id);
router.put('/update/:id',  auth,userController.update_user);
router.delete('/delete/:id', auth, userController.delete_user);
router.post('/login', userController.get_user)


module.exports = router;