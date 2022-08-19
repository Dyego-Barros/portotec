const express = require('express');
const router = express.Router();
const jwt= require('jsonwebtoken');

const clientController = require('../controller/clientController');

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

router.get('/list/:id', auth, clientController.list_client_enterprise);
router.post('/create', auth, clientController.client_create);
router.get('/list/client/:id', auth, clientController.list_client_id);
router.put('/update/:id', auth, clientController.client_update);
router.delete('/delete/:id', auth, clientController.client_delete);

module.exports = router;