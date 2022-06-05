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
        if(JSON.stringify(newProduct)=='{}'){
            return res.status(400).json({error:'Created failed because there are no input data'});
        }
        const doc = await Product.create(newProduct);
        res.status(201).json({results: doc})
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Creation failed'});
    }
}

const findOne = async (req, res) =>{
    const {id} = req.params;
    try{
        const doc = await Product.findOne({_id: id});
        if(!doc){
            return res.status(404).json({error:`Product with ID ${id} not found.`});
        }
        res.status(200).json({results:doc});
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Internal error'});
    }
}

const updateOne = async (req,res)=>{
    const {id} = req.params;
    try{
        const updatedProduct = req.body;
        if(JSON.stringify(updatedProduct)=='{}'){
            return res.status(400).json({error:'Updated failed because there are no input data'});
        }
        const doc = await Product.findOneAndUpdate({_id: id},updatedProduct,{new:true});
        if(!doc){
            return res.status(404).json({error:`Product with ID ${id} not found.`});
        }
        res.status(200).json({results:doc});
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Cannot update'});
    }
}

const deleteOne = async (req,res)=>{
    const {id} = req.params;
    try{
        const doc = await Product.findOneAndDelete({_id: id}); 
        if(!doc){
            return res.status(404).json({error:`Product with ID ${id} not found.`});
        }
        res.status(200).json({results: doc});
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Cannot delete'})
    }
}

module.exports = {findMany, createOne, findOne, updateOne,deleteOne};
