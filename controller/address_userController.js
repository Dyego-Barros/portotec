const {sequelize} = require('../models/index');
const {DataTypes} = require('sequelize');
const Address_User = require('../models/address_user')(sequelize, DataTypes);

module.exports={
    create_address_user: async(req,res) =>{
        const address_user = {address, number, district, city,state,complement,iduser}=req.body;

        if (address!=undefined || address!= null) {
            await  Address_User.create( address_user);
            res.sendStatus(201);
            
        } else {
            res.sendStatus(400);
            
        }
    },

    list_address: async(req,res)=>{         
        const list = await  Address_User.findAll();
        if (list!= undefined|| list!=null) {
            res.json(list);            
        } else {
            res.sendStatus(400);
            
        }
    },

    list_address_id: async (req,res)=>{
        if (isNaN(req.params.id)) {
            res.sendStatus(400);            
        } else {
            var id = parseInt(req.params.id);
            const search_address = await  Address_User.findByPk(id);
            if(search_address!= undefined){
                res.json(search_address);
            }else{
                res.sendStatus(400);
            }
            
        }
    },

    address_update: async(req,res)=>{
        if (isNaN(req.params.id)) {
            res.sendStatus(400);            
        }else{
            var id = parseInt(req.params.id);
            const update_adrres = {address, number, district, city,state,complement,iduser}=req.body;
            const search_address = await  Address_User.findByPk(id);
            if (search_address!= undefined|| search_address!=null){
                if(update_adrres.address!=''){
                    search_address.address = address;
                }
                if(update_adrres.number!=''){
                    search_address.number= number;

                }
                if(update_adrres.district!=''){
                    search_address.district= district;

                }
                if(update_adrres.city){
                    search_address.city = city;
                }
                if(update_adrres.state!=''){
                    search_address.state = state;

                }
                if(update_adrres.complement!=''){
                    search_address.complement = complement;

                }
                if(update_adrres.identerprise!=''){
                    search_address.identerprise= identerprise;

                }
                try {
                    await  Address_User.update(update_adrres,{where:{id:id}});
                    res.sendStatus(200);
                } catch (error) {
                    if(error){
                        res.sendStatus(400)
                    }
                    
                }
            } else {
                res.sendStatus(400);
            }
        }
    },

    delete_address_user: async (req,res)=>{
        if (isNaN(req.params.id)) {
            res.sendStatus(400);
            
        } else {
            var id = parseInt(req.params.id);
            const search_address= await  Address_User.findByPk(id);
            if (search_address!= undefined|| search_address!=null){
                try {
                    await  Address_User.destroy({where:{id:id}});
                    res.sendStatus(200);                    
                } catch (error) {
                    res.sendStatus(400);
                }
            }else{
                res.sendStatus(400);
            }
        }
    }


}