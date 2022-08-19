const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWTSecret="123456789abcd";
const address_enterpriseController = require('../controller/address_enterpriseController');


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


router.post('/create', auth, address_enterpriseController.create_address_enterprise);
router.get('/list', auth,address_enterpriseController.list_address);
router.get('/list/:id', auth,address_enterpriseController.list_address_id);
router.put('/update/:id', auth,address_enterpriseController.address_update);
router.delete('/delete/:id', auth,address_enterpriseController.delete_address_enterprise);


module.exports = router;
