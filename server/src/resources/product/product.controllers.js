const Product = require("./product.model");

const findMany = async (req,res)=>{
    try{
        const docs = await Product.find().lean().exec();
        res.status(200).json({results: docs});
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Internal error'});
    }
}

const createOne = async (req,res)=>{
    try{
        const newProduct = req.body;
        const doc = await Product.create(newProduct);
        res.status(201).json({results: doc})
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Creation failed'})
    }
}

const findOne = async (req, res) =>{
    try{
        const {id} = req.params;
        const doc = await Product.find({_id: id});
        if(!doc){
            return res.status(404).json({error:'Not found'});
        }
        res.status(200).json({results:doc});
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Internal error'});
    }
}

module.exports = {findMany, createOne, findOne};
