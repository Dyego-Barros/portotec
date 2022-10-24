
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

//MIDDLEWARE
const multer = require('multer');

//DEFINE STORAGE DE MULTER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'inssupload/')
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

//FAZ UPLOAD COM NOVO NOM PARA O STORAGE
const upload = multer({storage})

//Controller responsavel pela rotas
const inssController = require('../controller/inssController');

//Rotas

router.post('/upload/file/:id', auth, upload.single("file"), inssController.uploads_file);
router.get('/enterprise/list/:id',auth, inssController.get_inss_all);
router.get('/list/:id', auth, inssController.get_inss_id);
router.put('/update/:id',auth, inssController.update_inss);
router.delete('/delete/:id',auth, inssController.delete_inss);


module.exports = router;
