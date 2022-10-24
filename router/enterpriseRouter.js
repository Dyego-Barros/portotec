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
                //console.log(data);
                next();
            }
        })
    }else{
        res.sendStatus(401);
    }

   
}


//CONTROLLER RESPONSAVEL PELAS ROTAS
const enterpriseController = require('../controller/enterpriseController');
//MIDDLEWARE
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = require('crypto')
            .randomBytes(64)
            .toString('hex');

        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({storage})
//ROTAS DE CRUD EMPRESA
router.get('/list', auth, enterpriseController.list_all);
router.get('/list/:id',  auth,enterpriseController.list_id);
router.post('/create', auth, enterpriseController.create);
router.delete('/delete/:id',  auth,enterpriseController.delete_enterprise);
router.put('/update/:id',  auth,enterpriseController.update_enterprise);
router.post('/upload/file/:id', auth, upload.single("file"), enterpriseController.uploads_file);





module.exports = router;
