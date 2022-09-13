const {sequelize} = require('../models/index');
const {DataTypes, QueryTypes} = require('sequelize');
const Address_Enterprise = require('../models/address_enterprise')(sequelize,DataTypes);

module.exports={
    create_address_enterprise: async(req,res) =>{
        const address_enterprise = {address, number, district, city,state,complement,identerprise}=req.body;

        if (address_enterprise!=undefined || address_enterprise!= null) {
            await sequelize.query(`INSERT INTO public."Address_Enterprises" (address, number, district, city,state,complement,identerprise) VALUES('${address_enterprise.address}', '${address_enterprise.number}', '${address_enterprise.district}','${address_enterprise.city}','${address_enterprise.state}','${address_enterprise.complement}', ${address_enterprise.identerprise})`,{type:QueryTypes.INSERT});
            res.sendStatus(201);
            
        } else {
            res.sendStatus(400);
            
        }
    },

    list_address: async(req,res)=>{         
        const list = await sequelize.query(`SELECT * FROM public."Address_Enterprises"`,{type:QueryTypes.SELECT});
        console.log(list);
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
            const search_address = await sequelize.query(`SELECT * FROM public."Address_Enterprises" WHERE id=${id}`,{type:QueryTypes.SELECT});
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
            const update_adrres = {address, number, district, city,state,complement,identerprise}=req.body;
            const search_address = await Address_Enterprise.findByPk(id);
            if (search_address!= undefined|| search_address!=null){
                if(update_adrres.address!=''){
                    search_address.address = update_adrres.address;
                }
                if(update_adrres.number!=''){
                    search_address.number= update_adrres.number;

                }
                if(update_adrres.district!=''){
                    search_address.district= update_adrres.district;

                }
                if(update_adrres.city){
                    search_address.city = update_adrres.city;
                }
                if(update_adrres.state!=''){
                    search_address.state = update_adrres.state;

                }
                if(update_adrres.complement!=''){
                    search_address.complement = update_adrres.complement;

                }
                if(update_adrres.identerprise!=''){
                    search_address.identerprise= update_adrres.identerprise;

                }
                try {
                    await Address_Enterprise.update(update_adrres,{where:{id:id}});
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

    delete_address_enterprise: async (req,res)=>{
        if (isNaN(req.params.id)) {
            res.sendStatus(400);
            
        } else {
            var id = parseInt(req.params.id);
            const search_address= await sequelize.query(`SELECT * FROM public."Address_Enterprises" WHERE id=${id}`,{type:QueryTypes.SELECT});
            if (search_address!= undefined|| search_address!=null){
                try {
                    await Address_Enterprise.destroy({where:{id:id}});
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