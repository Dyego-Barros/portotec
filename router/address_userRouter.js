const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const address_userController = require('../controller/address_userController');

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

router.post('/create', auth, address_userController.create_address_user);
router.get('/list', auth,address_userController.list_address);
router.get('/list/:id', auth,address_userController.list_address_id);
router.put('/update/:id', auth,address_userController.address_update);
router.delete('/delete/:id', auth,address_userController.delete_address_user);


module.exports = router;
