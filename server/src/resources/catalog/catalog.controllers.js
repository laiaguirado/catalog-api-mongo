const Catalog = require("./catalog.model")

const findMany = async (req,res)=>{
    try{
        const docs = await Catalog.find().lean().exec();
        res.status(200).json({results: docs});
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Internal error'});
    }
}


module.exports = { findMany };