const express = require('express');
const app = express();
const multer = require('multer');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


//CONFIGURAÇÔES DE MIDDLEWARE
app.set(bodyParser.urlencoded({extended:false}));
app.set('View engine', 'ejs');
app.set('views', __dirname+ '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());



//CONFIGURAÇÔES DE ROTAS
const defaultRouter = require('./router/defaultRouter');
const enterpriseRouter = require('./router/enterpriseRouter');
const userRouter = require('./router/userRouter');
const address_enterpriseRouter = require('./router/address_enterpriseRouter');
const address_userRouter = require('./router/address_userRouter');
const clientRouter = require('./router/clientRouter');
const inssRouter = require('./router/inssRouter');



app.use('/enterprise', enterpriseRouter);
app.use('/user', userRouter);
app.use('/address_enterprise', address_enterpriseRouter);
app.use('/address_user', address_userRouter);
app.use('/clients', clientRouter);
app.use('/inss', inssRouter);
app.use('/', defaultRouter);


app.listen(port, function(error){
    if(error){
        console.logo(error)
    }else{
        console.log("Servidor Rodando");
    }
})