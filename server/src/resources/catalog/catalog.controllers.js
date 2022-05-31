const Catalog = require("./catalog.model");
const Product = require("../product/product.model");

const findMany = async (req,res)=>{
    try{
        const docs = await Catalog.find().lean().exec();
        res.status(200).json({results: docs});
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Internal error'});
    }
}

const createOne = async (req,res)=>{
    try{
        const newCatalog = req.body;
        const doc = await Catalog.create(newCatalog);
        res.status(201).json({results: doc})
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Creation failed'})
    }
}

const findOne = async (req, res) =>{
    try{
        const {id} = req.params;
        const doc = await Catalog.find({_id: id});
        if(!doc){
            return res.status(404).json({error:'Not found'});
        }
        res.status(200).json({results:doc});
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Internal error'});
    }
}

const updateOne = async (req,res)=>{
try{
    const {id} = req.params;
    const doc = await Catalog.findOneAndUpdate({_id: id},req.body,{new:true});//"new: true" to return the document after update
    if(!doc){
        return res.status(404).json({error:'Not found'});
    }
    res.status(200).json({results:doc});
}catch(e){
    console.log(e);
    res.status(500).json({error:'Cannot update'});
}
}

const deleteOne = async (req,res)=>{
    try{
        const {id} = req.params;
        const doc = await Catalog.findOneAndDelete({_id: id}); 
        if(!doc){
            return res.status(404).json({error:'Not found'});
        }
        res.status(200).json({results:doc});
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Cannot delete'});
    }
}

const findMessagesById = async (req,res)=>{
    try{
        const {catalogid} = req.params;
        const docs = await Product.find({catalog_id: catalogid});
        if(docs === null){
            res.status(400).send({error: `Catalog with ID ${catalogid} not found.`})
        }
        res.status(200).json({results: docs});
    }catch(e){
        console.log(e);
        res.status(500).json( {error : 'Internal error'});
    }
}

const createMessageById = async (req,res)=>{
    try{
        const newCatalog = req.body;
        const {catalogid} = req.params;
        newCatalog.catalog_id = catalogid;
        const doc = await Product.create(newCatalog);
        if(doc === null){
            res.status(400).send({error: `Catalog with ID ${catalogid} not found.`})
        }
        res.status(201).json({results: doc});
    }catch(e){
        console.log(e);
        res.status(500).json( {error : 'Internal error'});
    }
}

module.exports = { findMany, createOne, findOne, updateOne,deleteOne, findMessagesById, createMessageById };